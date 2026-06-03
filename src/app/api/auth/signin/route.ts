import { AuthError } from "next-auth";
import type { NextRequest } from "next/server";

import { signIn } from "@/auth";
import { enforceAuthRateLimit, handleApiError } from "@/lib/utils/api-handler";
import { successResponse } from "@/lib/utils/api-response";
import { logSessionCreated } from "@/lib/logger/auth.logger";
import { parseBody } from "@/lib/validators/parse-body";
import { loginSchema } from "@/lib/validators/auth.schemas";
import { userRepository } from "@/repositories/user.repository";
import { toPublicUser } from "@/types/user.types";

export async function POST(request: NextRequest) {
  const path = "/api/auth/signin";

  try {
    const rateLimited = await enforceAuthRateLimit(request, path);
    if (rateLimited) return rateLimited;

    const body = parseBody(loginSchema, await request.json());

    const result = await signIn("credentials", {
      email: body.email,
      password: body.password,
      redirect: false,
    });

    if (result?.error) {
      return handleApiError(new AuthError("CredentialsSignin"), {
        method: "POST",
        path,
      });
    }

    const user = await userRepository.findByEmail(body.email);

    if (!user) {
      return handleApiError(new AuthError("CredentialsSignin"), {
        method: "POST",
        path,
      });
    }

    logSessionCreated(user.id);

    return successResponse({ user: toPublicUser(user) });
  } catch (error) {
    return handleApiError(error, { method: "POST", path });
  }
}
