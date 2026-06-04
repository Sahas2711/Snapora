import type { NextRequest } from "next/server";

import { requireAuth } from "@/lib/auth/session";
import { handleApiError } from "@/lib/utils/api-handler";
import { successResponse } from "@/lib/utils/api-response";
import { parseBody } from "@/lib/validators/parse-body";
import { createVlogSchema } from "@/lib/validators/vlog.schemas";
import { vlogService } from "@/services/vlog.service";

export async function POST(request: NextRequest) {
  const path = "/api/vlogs";

  try {
    const session = await requireAuth();
    const body = parseBody(createVlogSchema, await request.json());
    const vlog = await vlogService.createVlog(session.user.id, body);

    return successResponse({ vlog }, 201);
  } catch (error) {
    return handleApiError(error, { method: "POST", path });
  }
}
