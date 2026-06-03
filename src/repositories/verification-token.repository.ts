import { VerificationTokenType } from "@prisma/client";
import { randomBytes } from "crypto";

import { prisma } from "@/lib/prisma";

const TOKEN_BYTES = 32;

export const verificationTokenRepository = {
  async create(
    identifier: string,
    type: VerificationTokenType,
    expiresInHours: number,
  ) {
    const token = randomBytes(TOKEN_BYTES).toString("hex");
    const expires = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

    await prisma.verificationToken.deleteMany({
      where: { identifier, type },
    });

    return prisma.verificationToken.create({
      data: {
        identifier: identifier.toLowerCase(),
        token,
        type,
        expires,
      },
    });
  },

  findValid(identifier: string, token: string, type: VerificationTokenType) {
    return prisma.verificationToken.findFirst({
      where: {
        identifier: identifier.toLowerCase(),
        token,
        type,
        expires: { gt: new Date() },
      },
    });
  },

  delete(identifier: string, token: string) {
    return prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: identifier.toLowerCase(),
          token,
        },
      },
    });
  },
};
