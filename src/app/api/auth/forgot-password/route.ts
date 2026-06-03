import type { NextRequest } from "next/server";

import { enforceAuthRateLimit, handleApiError } from "@/lib/utils/api-handler";
import { successResponse } from "@/lib/utils/api-response";
import { parseBody } from "@/lib/validators/parse-body";
import { forgotPasswordSchema } from "@/lib/validators/auth.schemas";
import { authService } from "@/services/auth.service";

export async function POST(request: NextRequest) {
  const path = "/api/auth/forgot-password";

  try {
    const rateLimited = await enforceAuthRateLimit(request, path);
    if (rateLimited) return rateLimited;

    const body = parseBody(forgotPasswordSchema, await request.json());
    const result = await authService.requestPasswordReset(body);

    return successResponse(result);
  } catch (error) {
    return handleApiError(error, { method: "POST", path });
  }
}
