import type { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";

const publicVlogInclude = {
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
} satisfies Prisma.VlogInclude;

export const vlogRepository = {
  create(data: Prisma.VlogUncheckedCreateInput) {
    return prisma.vlog.create({
      data,
      include: publicVlogInclude,
    });
  },

  findMany() {
    return prisma.vlog.findMany({
      where: {
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: publicVlogInclude,
    });
  },

  findManyByUserId(userId: string) {
    return prisma.vlog.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: publicVlogInclude,
    });
  },

  findById(id: string) {
    return prisma.vlog.findFirst({
      where: {
        id,
        deletedAt: null,
      },
      include: publicVlogInclude,
    });
  },

  incrementViewCount(id: string) {
    return prisma.vlog.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
      select: {
        viewCount: true,
      },
    });
  },

  update(id: string, data: Prisma.VlogUpdateInput) {
    return prisma.vlog.update({
      where: { id },
      data,
      include: publicVlogInclude,
    });
  },

  softDelete(id: string) {
    return prisma.vlog.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
      },
    });
  },
};
