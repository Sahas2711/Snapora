import Credentials from "next-auth/providers/credentials";

import { getRequestContext } from "@/lib/utils/request";

export const credentialsProvider = Credentials({
  id: "credentials",
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials, request) {
    const email = credentials?.email;
    const password = credentials?.password;

    if (typeof email !== "string" || typeof password !== "string") {
      return null;
    }

    const { authService } = await import("@/services/auth.service");

    return authService.validateCredentials(
      email,
      password,
      getRequestContext(request),
    );
  },
});
