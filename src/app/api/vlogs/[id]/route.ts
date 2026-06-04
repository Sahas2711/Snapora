import { requireAuth } from "@/lib/auth/session";
import { handleApiError } from "@/lib/utils/api-handler";
import { successResponse } from "@/lib/utils/api-response";
import { parseBody } from "@/lib/validators/parse-body";
import { updateVlogSchema } from "@/lib/validators/vlog.schemas";
import { vlogService } from "@/services/vlog.service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const path = "/api/vlogs/[id]";

  try {
    const { id } = await context.params;
    const vlog = await vlogService.getVlogById(id);

    return successResponse({ vlog });
  } catch (error) {
    return handleApiError(error, { method: "GET", path });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  const path = "/api/vlogs/[id]";

  try {
    const session = await requireAuth();
    const { id } = await context.params;
    const body = parseBody(updateVlogSchema, await request.json());
    const vlog = await vlogService.updateVlog(id, session.user.id, body);

    return successResponse({ vlog });
  } catch (error) {
    return handleApiError(error, { method: "PUT", path });
  }
}
