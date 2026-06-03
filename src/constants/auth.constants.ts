/** bcrypt cost factor — 12 is a production-safe default */
export const BCRYPT_SALT_ROUNDS = 12;

/** Lock account after this many consecutive failed login attempts */
export const MAX_FAILED_LOGIN_ATTEMPTS = 5;

/** Duration to lock an account after exceeding failed attempts (15 minutes) */
export const ACCOUNT_LOCK_DURATION_MS = 15 * 60 * 1000;

/** JWT session lifetime — 30 days (seconds) */
export const SESSION_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

/** Rate limit: auth endpoints — 10 requests per minute per IP */
export const AUTH_RATE_LIMIT = {
  limit: 10,
  windowMs: 60 * 1000,
} as const;

/** Verification token expiry (24 hours) */
export const EMAIL_VERIFICATION_EXPIRY_HOURS = 24;

/** Password reset token expiry (1 hour) */
export const PASSWORD_RESET_EXPIRY_HOURS = 1;

/** Minimum password length aligned with OpenAPI spec */
export const MIN_PASSWORD_LENGTH = 8;
