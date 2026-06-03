import type { NextRequest } from "next/server";

import { enforceAuthRateLimit, handleApiError } from "@/lib/utils/api-handler";
import { successResponse } from "@/lib/utils/api-response";
import { getRequestContext } from "@/lib/utils/request";
import { parseBody } from "@/lib/validators/parse-body";
import { registerSchema } from "@/lib/validators/auth.schemas";
import { authService } from "@/services/auth.service";

export async function POST(request: NextRequest) {
  const path = "/api/auth/register";

  try {
    const rateLimited = await enforceAuthRateLimit(request, path);
    if (rateLimited) return rateLimited;

    const body = parseBody(registerSchema, await request.json());
    const result = await authService.register(body, getRequestContext(request));

    return successResponse({ user: result.user }, 201);
  } catch (error) {
    return handleApiError(error, { method: "POST", path });
  }
}
