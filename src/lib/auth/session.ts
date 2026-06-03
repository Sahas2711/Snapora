import { auth } from "@/auth";
import { AuthenticationError } from "@/lib/errors/auth.error";

export async function requireAuth() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new AuthenticationError();
  }

  return session;
}
