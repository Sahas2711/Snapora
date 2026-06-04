import { handlePrismaError } from "@/lib/errors/database.error";
import type { CreateVlogInput } from "@/lib/validators/vlog.schemas";
import { vlogRepository } from "@/repositories/vlog.repository";
import type { PublicVlog } from "@/types/vlog.types";

export function toPublicVlog(vlog: Awaited<ReturnType<typeof vlogRepository.create>>): PublicVlog {
  return {
    id: vlog.id,
    title: vlog.title,
    description: vlog.description,
    imageUrl: vlog.imageUrl,
    viewCount: vlog.viewCount,
    likeCount: vlog._count.likes,
    createdAt: vlog.createdAt,
    updatedAt: vlog.updatedAt,
    user: {
      id: vlog.user.id,
      name: vlog.user.name,
      image: vlog.user.image,
      username: vlog.user.username,
    },
  };
}

export const vlogService = {
  async createVlog(userId: string, input: CreateVlogInput) {
    try {
      const vlog = await vlogRepository.create({
        userId,
        title: input.title.trim(),
        description: input.description ?? null,
        imageUrl: input.imageUrl,
      });

      return toPublicVlog(vlog);
    } catch (error) {
      throw handlePrismaError(error, "createVlog");
    }
  },
};
