import type { ZodType } from "zod";

import { ValidationError } from "@/lib/errors/validation.error";

export function parseBody<T>(schema: ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);

  if (!result.success) {
    throw new ValidationError(result.error);
  }

  return result.data;
}
