import { NotFoundError } from "@/lib/errors/auth.error";
import { handlePrismaError } from "@/lib/errors/database.error";
import type { CreateVlogInput } from "@/lib/validators/vlog.schemas";
import { vlogRepository } from "@/repositories/vlog.repository";
import type { PublicVlog } from "@/types/vlog.types";

type VlogRecord =
  | Awaited<ReturnType<typeof vlogRepository.create>>
  | Awaited<ReturnType<typeof vlogRepository.findById>>;

export function toPublicVlog(vlog: NonNullable<VlogRecord>): PublicVlog {
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

  async getAllVlogs() {
    try {
      const vlogs = await vlogRepository.findMany();
      return vlogs.map((vlog) => toPublicVlog(vlog));
    } catch (error) {
      throw handlePrismaError(error, "getAllVlogs");
    }
  },

  async getVlogById(id: string) {
    try {
      const vlog = await vlogRepository.findById(id);

      if (!vlog) {
        throw new NotFoundError("Vlog not found");
      }

      return toPublicVlog(vlog);
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      throw handlePrismaError(error, "getVlogById");
    }
  },

  async incrementViewCount(id: string) {
    const vlog = await vlogRepository.findById(id);

    if (!vlog) {
      throw new NotFoundError("Vlog not found");
    }

    try {
      return await vlogRepository.incrementViewCount(id);
    } catch (error) {
      throw handlePrismaError(error, "incrementViewCount");
    }
  },
};
