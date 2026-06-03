import { baseLogger } from "@/lib/logger/index";

export const authLogger = baseLogger.child({ module: "auth" });

export function logLoginSuccess(userId: string, email: string) {
  authLogger.info({ userId, email }, "Login successful");
}

export function logLoginFailure(email: string, reason: string) {
  authLogger.warn({ email, reason }, "Login failed");
}

export function logRegistration(userId: string, email: string) {
  authLogger.info({ userId, email }, "User registered");
}

export function logSessionCreated(userId: string) {
  authLogger.info({ userId }, "Session created");
}

export function logSessionExpired(userId: string) {
  authLogger.info({ userId }, "Session expired");
}

export function logUnauthorizedAccess(path: string, ip?: string) {
  authLogger.warn({ path, ip }, "Unauthorized access attempt");
}

export function logAccountLocked(userId: string) {
  authLogger.warn({ userId }, "Account locked");
}

export function logPasswordResetRequest(email: string) {
  authLogger.info({ email }, "Password reset requested");
}

export function logEmailVerificationSent(email: string) {
  authLogger.info({ email }, "Email verification token created");
}
