import NextAuth from "next-auth";

import { authConfig } from "@/auth/auth.config";
import { credentialsProvider } from "@/auth/providers";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [credentialsProvider],
});
