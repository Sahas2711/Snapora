import { Prisma } from "@prisma/client";

import { AppError } from "@/lib/errors/app.error";
import { logDatabaseError } from "@/lib/logger/api.logger";

export class DatabaseError extends AppError {
  constructor(message = "Database operation failed") {
    super(message, "DATABASE_ERROR", 500, false);
    this.name = "DatabaseError";
  }
}

export function handlePrismaError(error: unknown, operation: string): AppError {
  logDatabaseError(operation, error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return new AppError("A record with this value already exists", "CONFLICT", 409);
    }

    if (error.code === "P2025") {
      return new AppError("Record not found", "NOT_FOUND", 404);
    }
  }

  return new DatabaseError();
}
