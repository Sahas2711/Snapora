import type { ZodError } from "zod";

import { AppError } from "@/lib/errors/app.error";

export class ValidationError extends AppError {
  readonly fieldErrors: Record<string, string[]>;

  constructor(error: ZodError) {
    const fieldErrors = error.flatten().fieldErrors as Record<string, string[]>;
    const firstMessage =
      Object.values(fieldErrors).flat()[0] ?? "Validation failed";

    super(firstMessage, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
    this.fieldErrors = fieldErrors;
  }
}
