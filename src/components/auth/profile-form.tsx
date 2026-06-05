"use client";

import { useActionState, useState, useRef } from "react";

import { updateProfileAction, type ActionState } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ProfileFormProps = {
  defaultValues: {
    name: string;
    username?: string | null;
    image?: string | null;
  };
};

const initialState: ActionState = {};

type SignatureResponse = {
  status: "success";
  data: { cloudName: string; apiKey: string; timestamp: number; folder: string; signature: string };
};

async function uploadAvatar(file: File): Promise<string> {
  const sigRes = await fetch("/api/cloudinary/signature", { method: "GET", credentials: "include" });
  const sigPayload = (await sigRes.json()) as SignatureResponse | { message?: string };

  if (!sigRes.ok || !("data" in sigPayload)) {
    throw new Error((sigPayload as { message?: string }).message ?? "Signature failed");
  }

  const { cloudName, apiKey, timestamp, folder, signature } = sigPayload.data;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", apiKey);
  fd.append("timestamp", String(timestamp));
  fd.append("folder", folder);
  fd.append("signature", signature);

  const upRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: fd,
  });
  const upPayload = (await upRes.json()) as { secure_url?: string; error?: { message?: string } };

  if (!upRes.ok || !upPayload.secure_url) {
    throw new Error(upPayload.error?.message ?? "Upload failed");
  }
  return upPayload.secure_url;
}

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(updateProfileAction, initialState);
  const [imageUrl, setImageUrl] = useState(defaultValues.image ?? "");
  const [imagePreview, setImagePreview] = useState(defaultValues.image ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const initials = defaultValues.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setUploadError("");
    setUploading(true);

    try {
      const url = await uploadAvatar(file);
      setImageUrl(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
      setImagePreview(defaultValues.image ?? "");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-4">
      {/* Avatar upload */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors bg-gray-50 flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Change profile photo"
        >
          {imagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imagePreview} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-base font-bold text-gray-400">{initials}</span>
          )}
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          )}
        </button>

        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        {/* Hidden field for the URL */}
        <input type="hidden" name="image" value={imageUrl} />

        <div>
          <p className="text-sm font-medium text-gray-700">Profile photo</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {uploading ? "Uploading…" : imageUrl ? "Click to change" : "Click to upload"}
          </p>
          {uploadError ? <p className="text-xs text-red-500 mt-0.5">{uploadError}</p> : null}
        </div>
      </div>

      <div>
        <Label htmlFor="name">Display name</Label>
        <Input id="name" name="name" type="text" defaultValue={defaultValues.name} required />
      </div>

      <div>
        <Label htmlFor="username">Username <span className="text-gray-400 font-normal">(optional)</span></Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">@</span>
          <Input id="username" name="username" type="text" defaultValue={defaultValues.username ?? ""} placeholder="yourhandle" className="pl-7" />
        </div>
      </div>

      {state.error ? <p className="text-red-600 text-sm">{state.error}</p> : null}
      {state.success ? <p className="text-emerald-600 text-sm">{state.success}</p> : null}

      <Button type="submit" disabled={pending || uploading} className="w-full">
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
