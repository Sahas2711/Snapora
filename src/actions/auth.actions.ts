"use server";

import { AuthError } from "next-auth";

import { signIn, signOut } from "@/auth";
import { parseBody } from "@/lib/validators/parse-body";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "@/lib/validators/auth.schemas";
import { ValidationError } from "@/lib/errors/validation.error";
import { authService } from "@/services/auth.service";

export type ActionState = {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string[]>;
  actionUrl?: string;
};

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const input = parseBody(loginSchema, {
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const result = await signIn("credentials", {
      ...input,
      redirect: false,
    });

    if (result?.error) {
      return { error: "Invalid email or password" };
    }

    return { success: "Logged in" };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message, fieldErrors: error.fieldErrors };
    }

    if (error instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    throw error;  }
}

export async function registerAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const input = parseBody(registerSchema, {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const result = await authService.register(input, {});

    // Save avatar if one was uploaded during registration
    const avatarUrl = formData.get("avatarUrl");
    if (avatarUrl && typeof avatarUrl === "string" && avatarUrl.startsWith("http")) {
      await authService.updateProfile(result.user.id, { image: avatarUrl });
    }

    return {
      success: "Account created. Click the link below to verify your email.",
      actionUrl: result.verifyUrl,
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { error: error.message, fieldErrors: error.fieldErrors };
    }

    if (error instanceof Error) {
      return { error: error.message };
    }

    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" });
}

export async function forgotPasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const input = parseBody(forgotPasswordSchema, {
      email: formData.get("email"),
    });

    const result = await authService.requestPasswordReset(input);

    return {
      success: result.message,
      ...("resetUrl" in result && result.resetUrl
        ? { actionUrl: result.resetUrl }
        : {}),
    };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    throw error;
  }
}

export async function resetPasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const input = parseBody(resetPasswordSchema, {
      email: formData.get("email"),
      token: formData.get("token"),
      password: formData.get("password"),
    });

    await authService.resetPassword(input);

    return { success: "Password reset successfully. You can now sign in." };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    throw error;
  }
}

export async function updateProfileAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const { auth } = await import("@/auth");
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Not authenticated" };
    }

    const input = parseBody(updateProfileSchema, {
      name: formData.get("name") || undefined,
      username: formData.get("username") || null,
      image: formData.get("image") || null,
    });

    await authService.updateProfile(session.user.id, input);

    return { success: "Profile updated successfully" };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    throw error;
  }
}

export async function verifyEmailAction(
  email: string,
  token: string,
): Promise<ActionState> {
  try {
    await authService.verifyEmail(email, token);
    return { success: "Email verified! You can now sign in." };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    throw error;
  }
}
