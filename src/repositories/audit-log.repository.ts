import type { AuditAction, Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

type CreateAuditLogInput = {
  action: AuditAction;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Prisma.InputJsonValue;
};

export const auditLogRepository = {
  create(input: CreateAuditLogInput) {
    return prisma.auditLog.create({
      data: {
        action: input.action,
        userId: input.userId,
        ipAddress: input.ipAddress,
        userAgent: input.userAgent,
        metadata: input.metadata,
      },
    });
  },
};
