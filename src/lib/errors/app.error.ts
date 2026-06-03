export class AppError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status: number,
    readonly isOperational = true,
  ) {
    super(message);
    this.name = "AppError";
  }
}
