import { prisma } from "@/lib/prisma";

export const likeRepository = {
  findByUserAndVlog(userId: string, vlogId: string) {
    return prisma.like.findUnique({
      where: {
        userId_vlogId: {
          userId,
          vlogId,
        },
      },
    });
  },

  create(userId: string, vlogId: string) {
    return prisma.like.create({
      data: {
        userId,
        vlogId,
      },
    });
  },

  delete(id: string) {
    return prisma.like.delete({
      where: { id },
    });
  },

  countByVlog(vlogId: string) {
    return prisma.like.count({
      where: {
        vlogId,
      },
    });
  },
};
