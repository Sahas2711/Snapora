import type { Prisma, User } from "@prisma/client";

import { prisma } from "@/lib/prisma";

const activeUserFilter = {
  deletedAt: null,
} satisfies Prisma.UserWhereInput;

export const userRepository = {
  findByEmail(email: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        email: email.toLowerCase(),
        ...activeUserFilter,
      },
    });
  },

  findByUsername(username: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        username,
        ...activeUserFilter,
      },
    });
  },

  findById(id: string): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        id,
        ...activeUserFilter,
      },
    });
  },

  create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data });
  },

  async recordFailedLogin(userId: string, failedAttempts: number) {
    return prisma.user.update({
      where: { id: userId },
      data: { failedLoginAttempts: failedAttempts },
    });
  },

  async lockAccount(userId: string, lockedUntil: Date) {
    return prisma.user.update({
      where: { id: userId },
      data: { lockedUntil, failedLoginAttempts: 0 },
    });
  },

  async resetLoginAttempts(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });
  },

  update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  },

  findProfileById(id: string) {
    return prisma.user.findFirst({
      where: { id, deletedAt: null },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        username: true,
        role: true,
        status: true,
        createdAt: true,
        vlogs: {
          where: { deletedAt: null },
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            videoUrl: true,
            viewCount: true,
            createdAt: true,
            updatedAt: true,
            _count: { select: { likes: true } },
          },
        },
      },
    });
  },
};
