import test from "node:test";
import assert from "node:assert/strict";

import { createCloudinaryUploadSignature } from "./cloudinary.ts";

test("createCloudinaryUploadSignature signs sorted Cloudinary params", () => {
  process.env.CLOUDINARY_API_SECRET = "secret123";

  const signature = createCloudinaryUploadSignature({
    timestamp: 1717488000,
    folder: "snapora/vlogs",
  });

  assert.equal(signature, "648fb768aa5212b04d20229195eac594c5e8e93b");
});
