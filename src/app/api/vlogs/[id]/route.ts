import { handleApiError } from "@/lib/utils/api-handler";
import { successResponse } from "@/lib/utils/api-response";
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
