import { buildCloudinarySignaturePayload } from "@/lib/cloudinary";
import { handleApiError } from "@/lib/utils/api-handler";
import { successResponse } from "@/lib/utils/api-response";

export async function GET() {
  const path = "/api/cloudinary/signature";

  try {
    return successResponse(buildCloudinarySignaturePayload());
  } catch (error) {
    return handleApiError(error, { method: "GET", path });
  }
}
