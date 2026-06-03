import type { NextRequest } from "next/server";
import { z } from "zod";

import { handleApiError } from "@/lib/utils/api-handler";
import { successResponse } from "@/lib/utils/api-response";
import { parseBody } from "@/lib/validators/parse-body";
import { authService } from "@/services/auth.service";

const verifyEmailSchema = z.object({
  email: z.string().trim().email(),
  token: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const path = "/api/auth/verify-email";

  try {
    const body = parseBody(verifyEmailSchema, await request.json());
    const user = await authService.verifyEmail(body.email, body.token);

    return successResponse({ user }, 200, "Email verified successfully");
  } catch (error) {
    return handleApiError(error, { method: "POST", path });
  }
}
