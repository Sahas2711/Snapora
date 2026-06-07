import { AuditAction } from "@prisma/client";

import { auth, signOut } from "@/auth";
import { handleApiError } from "@/lib/utils/api-handler";
import { successResponse } from "@/lib/utils/api-response";
import { auditLogRepository } from "@/repositories/audit-log.repository";

export async function POST() {
  const path = "/api/auth/signout";

  try {
    const session = await auth();

    if (session?.user?.id) {
      await auditLogRepository.create({
        action: AuditAction.LOGOUT,
        userId: session.user.id,
      });
    }

    await signOut({ redirect: false });

    return successResponse(null, 200, "Logged out");
  } catch (error) {
    return handleApiError(error, { method: "POST", path });
  }
}
