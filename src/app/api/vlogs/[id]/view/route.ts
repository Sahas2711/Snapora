import { handleApiError } from "@/lib/utils/api-handler";
import { successResponse } from "@/lib/utils/api-response";
import { vlogService } from "@/services/vlog.service";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const path = "/api/vlogs/[id]/view";

  try {
    const { id } = await context.params;
    const result = await vlogService.incrementViewCount(id);

    return successResponse(result);
  } catch (error) {
    return handleApiError(error, { method: "POST", path });
  }
}
