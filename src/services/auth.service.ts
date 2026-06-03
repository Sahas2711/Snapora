import {
  AuditAction,
  UserStatus,
  VerificationTokenType,
} from "@prisma/client";
import { CredentialsSignin } from "next-auth";

import {
  ACCOUNT_LOCK_DURATION_MS,
  EMAIL_VERIFICATION_EXPIRY_HOURS,
  MAX_FAILED_LOGIN_ATTEMPTS,
  PASSWORD_RESET_EXPIRY_HOURS,
} from "@/constants/auth.constants";
import { ConflictError, NotFoundError } from "@/lib/errors/auth.error";
import { handlePrismaError } from "@/lib/errors/database.error";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import {
  logAccountLocked,
  logEmailVerificationSent,
  logLoginFailure,
  logLoginSuccess,
  logPasswordResetRequest,
  logRegistration,
} from "@/lib/logger/auth.logger";
import type {
  ForgotPasswordInput,
  RegisterInput,
  ResetPasswordInput,
  UpdateProfileInput,
} from "@/lib/validators/auth.schemas";
import { auditLogRepository } from "@/repositories/audit-log.repository";
import { userRepository } from "@/repositories/user.repository";
import { verificationTokenRepository } from "@/repositories/verification-token.repository";
import { toPublicUser, type PublicUser } from "@/types/user.types";

type AuthContext = {
  ipAddress?: string;
  userAgent?: string;
};

export class AuthServiceError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "AuthServiceError";
  }
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function buildAppUrl(path: string) {
  const base =
    process.env.AUTH_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";
  return `${base.replace(/\/$/, "")}${path}`;
}

function assertCanLogin(status: UserStatus) {
  if (status === UserStatus.SUSPENDED) {
    throw new CredentialsSignin("Account suspended");
  }

  if (status === UserStatus.INACTIVE) {
    throw new CredentialsSignin("Account inactive");
  }

  if (status === UserStatus.PENDING_VERIFICATION) {
    throw new CredentialsSignin("Email verification required");
  }
}

export const authService = {
  async register(
    input: RegisterInput,
    context: AuthContext = {},
  ): Promise<{ user: PublicUser; verifyUrl?: string }> {
    const email = normalizeEmail(input.email);
    const existing = await userRepository.findByEmail(email);

    if (existing) {
      throw new ConflictError("Email already in use");
    }

    const passwordHash = await hashPassword(input.password);

    try {
      const user = await userRepository.create({
        name: input.name.trim(),
        email,
        password: passwordHash,
        status: UserStatus.PENDING_VERIFICATION,
      });

      const verification = await verificationTokenRepository.create(
        email,
        VerificationTokenType.EMAIL_VERIFICATION,
        EMAIL_VERIFICATION_EXPIRY_HOURS,
      );

      const verifyUrl = buildAppUrl(
        `/verify-email?email=${encodeURIComponent(email)}&token=${verification.token}`,
      );

      logEmailVerificationSent(email);
      logRegistration(user.id, email);

      await auditLogRepository.create({
        action: AuditAction.REGISTER,
        userId: user.id,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        metadata: {
          email,
          verifyUrl: process.env.NODE_ENV === "development" ? verifyUrl : undefined,
        },
      });

      return {
        user: toPublicUser(user),
        verifyUrl: process.env.NODE_ENV === "development" ? verifyUrl : undefined,
      };
    } catch (error) {
      throw handlePrismaError(error, "register");
    }
  },

  async validateCredentials(
    email: string,
    password: string,
    context: AuthContext = {},
  ) {
    const normalizedEmail = normalizeEmail(email);
    const user = await userRepository.findByEmail(normalizedEmail);

    if (!user) {
      logLoginFailure(normalizedEmail, "user_not_found");
      await auditLogRepository.create({
        action: AuditAction.LOGIN_FAILURE,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        metadata: { email: normalizedEmail, reason: "user_not_found" },
      });
      throw new CredentialsSignin("Invalid email or password");
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      logLoginFailure(normalizedEmail, "account_locked");
      await auditLogRepository.create({
        action: AuditAction.LOGIN_FAILURE,
        userId: user.id,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        metadata: { reason: "account_locked" },
      });
      throw new CredentialsSignin("Account temporarily locked");
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      const nextAttempts = user.failedLoginAttempts + 1;

      if (nextAttempts >= MAX_FAILED_LOGIN_ATTEMPTS) {
        const lockedUntil = new Date(Date.now() + ACCOUNT_LOCK_DURATION_MS);
        await userRepository.lockAccount(user.id, lockedUntil);
        logAccountLocked(user.id);

        await auditLogRepository.create({
          action: AuditAction.ACCOUNT_LOCKED,
          userId: user.id,
          ipAddress: context.ipAddress,
          userAgent: context.userAgent,
          metadata: { lockedUntil: lockedUntil.toISOString() },
        });
      } else {
        await userRepository.recordFailedLogin(user.id, nextAttempts);
      }

      logLoginFailure(normalizedEmail, "invalid_password");
      await auditLogRepository.create({
        action: AuditAction.LOGIN_FAILURE,
        userId: user.id,
        ipAddress: context.ipAddress,
        userAgent: context.userAgent,
        metadata: { reason: "invalid_password" },
      });

      throw new CredentialsSignin("Invalid email or password");
    }

    assertCanLogin(user.status);
    await userRepository.resetLoginAttempts(user.id);

    logLoginSuccess(user.id, user.email);
    await auditLogRepository.create({
      action: AuditAction.LOGIN_SUCCESS,
      userId: user.id,
      ipAddress: context.ipAddress,
      userAgent: context.userAgent,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      image: user.image,
    };
  },

  async verifyEmail(email: string, token: string) {
    const normalizedEmail = normalizeEmail(email);
    const record = await verificationTokenRepository.findValid(
      normalizedEmail,
      token,
      VerificationTokenType.EMAIL_VERIFICATION,
    );

    if (!record) {
      throw new AuthServiceError("Invalid or expired verification token", "INVALID_TOKEN", 400);
    }

    const user = await userRepository.findByEmail(normalizedEmail);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await userRepository.update(user.id, {
      status: UserStatus.ACTIVE,
      emailVerified: new Date(),
    });

    await verificationTokenRepository.delete(normalizedEmail, token);

    await auditLogRepository.create({
      action: AuditAction.EMAIL_VERIFICATION,
      userId: user.id,
      metadata: { email: normalizedEmail },
    });

    return toPublicUser(user);
  },

  async requestPasswordReset(input: ForgotPasswordInput) {
    const email = normalizeEmail(input.email);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      logPasswordResetRequest(email);
      return { message: "If that email exists, a reset link has been sent." };
    }

    const reset = await verificationTokenRepository.create(
      email,
      VerificationTokenType.PASSWORD_RESET,
      PASSWORD_RESET_EXPIRY_HOURS,
    );

    const resetUrl = buildAppUrl(
      `/reset-password?email=${encodeURIComponent(email)}&token=${reset.token}`,
    );

    logPasswordResetRequest(email);

    await auditLogRepository.create({
      action: AuditAction.PASSWORD_RESET_REQUEST,
      userId: user.id,
      metadata: { resetUrl: process.env.NODE_ENV === "development" ? resetUrl : undefined },
    });

    return {
      message: "If that email exists, a reset link has been sent.",
      ...(process.env.NODE_ENV === "development" ? { resetUrl } : {}),
    };
  },

  async resetPassword(input: ResetPasswordInput) {
    const email = normalizeEmail(input.email);
    const record = await verificationTokenRepository.findValid(
      email,
      input.token,
      VerificationTokenType.PASSWORD_RESET,
    );

    if (!record) {
      throw new AuthServiceError("Invalid or expired reset token", "INVALID_TOKEN", 400);
    }

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const passwordHash = await hashPassword(input.password);

    await userRepository.update(user.id, {
      password: passwordHash,
      failedLoginAttempts: 0,
      lockedUntil: null,
    });

    await verificationTokenRepository.delete(email, input.token);

    await auditLogRepository.create({
      action: AuditAction.PASSWORD_RESET_COMPLETE,
      userId: user.id,
    });

    return { message: "Password reset successfully" };
  },

  async updateProfile(userId: string, input: UpdateProfileInput) {
    const user = await userRepository.findById(userId);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    if (input.username) {
      const existing = await userRepository.findByUsername(input.username);
      if (existing && existing.id !== userId) {
        throw new ConflictError("Username already in use");
      }
    }

    try {
      const updated = await userRepository.update(userId, {
        ...(input.name !== undefined ? { name: input.name } : {}),
        ...(input.username !== undefined ? { username: input.username } : {}),
        ...(input.image !== undefined ? { image: input.image } : {}),
      });

      await auditLogRepository.create({
        action: AuditAction.PROFILE_UPDATE,
        userId,
      });

      return toPublicUser(updated);
    } catch (error) {
      throw handlePrismaError(error, "updateProfile");
    }
  },

  async getProfile(userId: string) {
    const profile = await userRepository.findProfileById(userId);

    if (!profile) {
      throw new NotFoundError("User not found");
    }

    return {
      user: {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        image: profile.image,
        username: profile.username,
        vlogs: profile.vlogs.map((vlog) => ({
          id: vlog.id,
          title: vlog.title,
          description: vlog.description,
          imageUrl: vlog.imageUrl,
          viewCount: vlog.viewCount,
          likeCount: vlog._count.likes,
          createdAt: vlog.createdAt,
          updatedAt: vlog.updatedAt,
        })),
      },
    };
  },
};
