import { requireAuth } from "@/lib/auth/session";
import { handleApiError } from "@/lib/utils/api-handler";
import { successResponse } from "@/lib/utils/api-response";
import { vlogService } from "@/services/vlog.service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const path = "/api/vlogs/[id]/like";

  try {
    const session = await requireAuth();
    const { id } = await context.params;
    const result = await vlogService.likeVlog(id, session.user.id);

    return successResponse(result, 201);
  } catch (error) {
    return handleApiError(error, { method: "POST", path });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const path = "/api/vlogs/[id]/like";

  try {
    const session = await requireAuth();
    const { id } = await context.params;
    const result = await vlogService.unlikeVlog(id, session.user.id);

    return successResponse(result);
  } catch (error) {
    return handleApiError(error, { method: "DELETE", path });
  }
}
