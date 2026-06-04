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
});

export type CreateVlogInput = z.infer<typeof createVlogSchema>;
