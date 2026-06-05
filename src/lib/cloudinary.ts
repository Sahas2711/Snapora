import crypto from "node:crypto";

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

/**
 * Extract just the cloud name from either a plain name ("dsbqaryi7")
 * or a full CLOUDINARY_URL string ("cloudinary://key:secret@cloudname"
 * or "CLOUDINARY_URL=cloudinary://key:secret@cloudname").
 */
function extractCloudName(raw: string): string {
  // Strip leading "CLOUDINARY_URL=" prefix if present
  const stripped = raw.replace(/^CLOUDINARY_URL=/i, "").trim();
  // If it's a cloudinary:// URL, extract the hostname (cloud name)
  if (stripped.startsWith("cloudinary://")) {
    try {
      const url = new URL(stripped);
      return url.hostname;
    } catch {
      // fall through to return as-is
    }
  }
  return stripped;
}

export function getCloudinaryConfig() {
  const rawCloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??
    process.env.CLOUDINARY_CLOUD_NAME ??
    "";
  return {
    cloudName: extractCloudName(rawCloudName),
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
  const rawCloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ??
    process.env.CLOUDINARY_CLOUD_NAME;

  if (!rawCloudName) {
    throw new Error("Cloudinary cloud name is not configured");
  }

  const cloudName = extractCloudName(rawCloudName);
  const apiKey = requireEnv("CLOUDINARY_API_KEY");
  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "snapora/vlogs";
  const paramsToSign = { folder, timestamp };

  return {
    cloudName,
    apiKey,
    timestamp,
    folder,
    signature: createCloudinaryUploadSignature(paramsToSign),
  };
}
