import test from "node:test";
import assert from "node:assert/strict";

import { createVlogSchema } from "./vlog.schemas.ts";

test("createVlogSchema accepts required fields and normalizes empty description", () => {
  const parsed = createVlogSchema.parse({
    title: "Morning routine",
    description: "   ",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  });

  assert.equal(parsed.description, undefined);
});

test("createVlogSchema rejects missing title", () => {
  const result = createVlogSchema.safeParse({
    title: "",
    imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
  });

  assert.equal(result.success, false);
});
