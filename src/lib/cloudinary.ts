import crypto from "node:crypto";

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

export function getCloudinaryConfig() {
  return {
    cloudName:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??
      process.env.CLOUDINARY_CLOUD_NAME ??
      "",
    apiKey: process.env.CLOUDINARY_API_KEY ?? "",
    apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
  };
}

export function createCloudinaryUploadSignature(params: Record<string, string | number>) {
  const { apiSecret } = getCloudinaryConfig();

  if (!apiSecret) {
    throw new Error("CLOUDINARY_API_SECRET is not configured");
  }

  const payload = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return crypto.createHash("sha1").update(`${payload}${apiSecret}`).digest("hex");
}

export function buildCloudinarySignaturePayload() {
  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??
    process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = requireEnv("CLOUDINARY_API_KEY");
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "snapora/vlogs";
  const paramsToSign = { folder, timestamp };

  if (!cloudName) {
    throw new Error("Cloudinary cloud name is not configured");
  }

  return {
    cloudName,
    apiKey,
    timestamp,
    folder,
    signature: createCloudinaryUploadSignature(paramsToSign),
  };
}
