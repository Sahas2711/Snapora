import { z } from "zod";

export const createVlogSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(120, "Title is too long"),
  description: z
    .string()
    .trim()
    .max(1000, "Description is too long")
    .optional()
    .transform((value) => (value && value.length > 0 ? value : undefined)),
  imageUrl: z.url("Image URL must be a valid URL"),
  videoUrl: z.url("Video URL must be a valid URL").optional().nullable(),
});

export type CreateVlogInput = z.infer<typeof createVlogSchema>;

export const updateVlogSchema = z
  .object({
    title: z.string().trim().min(1, "Title is required").max(120, "Title is too long").optional(),
    description: z
      .string()
      .trim()
      .max(1000, "Description is too long")
      .optional()
      .transform((value) => (value && value.length > 0 ? value : undefined)),
    imageUrl: z.url("Image URL must be a valid URL").optional(),
  })
  .refine(
    (value) =>
      value.title !== undefined ||
      value.description !== undefined ||
      value.imageUrl !== undefined,
    {
      message: "At least one field is required",
    },
  );

export type UpdateVlogInput = z.infer<typeof updateVlogSchema>;
