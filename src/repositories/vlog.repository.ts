import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export const vlogRepository = {
  create(data: Prisma.VlogUncheckedCreateInput) {
    return prisma.vlog.create({
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
            username: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    });
  },
};
