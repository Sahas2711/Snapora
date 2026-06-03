import type { NextRequest } from "next/server";

import { requireAuth } from "@/lib/auth/session";
import { handleApiError } from "@/lib/utils/api-handler";
import { successResponse } from "@/lib/utils/api-response";
import { parseBody } from "@/lib/validators/parse-body";
import { updateProfileSchema } from "@/lib/validators/auth.schemas";
import { authService } from "@/services/auth.service";

export async function GET() {
  const path = "/api/profile";

  try {
    const session = await requireAuth();
    const profile = await authService.getProfile(session.user.id);

    return successResponse(profile);
  } catch (error) {
    return handleApiError(error, { method: "GET", path });
  }
}

export async function PUT(request: NextRequest) {
  const path = "/api/profile";

  try {
    const session = await requireAuth();
    const body = parseBody(updateProfileSchema, await request.json());
    const user = await authService.updateProfile(session.user.id, body);

    return successResponse({ user });
  } catch (error) {
    return handleApiError(error, { method: "PUT", path });
  }
}
