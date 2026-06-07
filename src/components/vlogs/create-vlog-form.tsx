"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FieldErrors = Partial<Record<"title" | "description" | "imageUrl", string[]>>;

type SignatureResponse = {
  status: "success";
  data: { cloudName: string; apiKey: string; timestamp: number; folder: string; signature: string };
};

type CreateVlogResponse = {
  status: "success";
  data: { vlog: { id: string } };
};

const MAX_VIDEO_MB = 5;

async function uploadToCloudinary(file: File, resourceType: "image" | "video"): Promise<string> {
  const sigRes = await fetch("/api/cloudinary/signature", { method: "GET", credentials: "include" });
  const sigPayload = (await sigRes.json()) as SignatureResponse | { message?: string };

  if (!sigRes.ok || !("data" in sigPayload)) {
    throw new Error((sigPayload as { message?: string }).message ?? "Unable to prepare upload");
  }

  const { cloudName, apiKey, timestamp, folder, signature } = sigPayload.data;
  const fd = new FormData();
  fd.append("file", file);
  fd.append("api_key", apiKey);
  fd.append("timestamp", String(timestamp));
  fd.append("folder", folder);
  fd.append("signature", signature);

  const upRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
    method: "POST",
    body: fd,
  });
  const upPayload = (await upRes.json()) as { secure_url?: string; error?: { message?: string } };

  if (!upRes.ok || !upPayload.secure_url) {
    throw new Error(upPayload.error?.message ?? "Upload failed");
  }
  return upPayload.secure_url;
}

export function CreateVlogForm() {
  const router = useRouter();
  const [isSubmitting, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Cover image
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageUploading, setImageUploading] = useState(false);

  // Video clip
  const [videoUrl, setVideoUrl] = useState("");
  const [videoName, setVideoName] = useState("");
  const [videoUploading, setVideoUploading] = useState(false);
  const [videoError, setVideoError] = useState("");

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(undefined);
    setImageUploading(true);
    try {
      const url = await uploadToCloudinary(file, "image");
      setImageUrl(url);
      setImagePreview(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Image upload failed");
    } finally {
      setImageUploading(false);
    }
  }

  async function handleVideoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const mb = file.size / (1024 * 1024);
    if (mb > MAX_VIDEO_MB) {
      setVideoError(`Video must be under ${MAX_VIDEO_MB} MB (yours is ${mb.toFixed(1)} MB)`);
      e.target.value = "";
      return;
    }

    setVideoError("");
    setVideoName(file.name);
    setVideoUploading(true);

    try {
      const url = await uploadToCloudinary(file, "video");
      setVideoUrl(url);
    } catch (err) {
      setVideoError(err instanceof Error ? err.message : "Video upload failed");
      setVideoName("");
    } finally {
      setVideoUploading(false);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(undefined);
    setSuccess(undefined);
    setFieldErrors({});

    startTransition(async () => {
      const res = await fetch("/api/vlogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description, imageUrl, videoUrl: videoUrl || null }),
      });

      const payload = (await res.json()) as CreateVlogResponse | { message?: string; errors?: FieldErrors };

      if (!res.ok || !("data" in payload)) {
        const ep = payload as { message?: string; errors?: FieldErrors };
        setError(ep.message ?? "Unable to create vlog");
        setFieldErrors(ep.errors ?? {});
        return;
      }

      setSuccess("Story published! Redirecting to Discover…");
    });
  }

  // Navigate to Discover after successful publish
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/vlogs");
        router.refresh();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const busy = isSubmitting || imageUploading || videoUploading;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your story a compelling title"
          required
          error={fieldErrors.title?.[0]}
        />
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="What is this story about? A short paragraph works best."
          error={fieldErrors.description?.[0]}
        />
        <p className="mt-1 text-xs text-gray-400">{description.length} / 500 chars</p>
      </div>

      {/* Cover image */}
      <div>
        <Label htmlFor="cover">
          Cover image <span className="text-red-500">*</span>
        </Label>

        {imagePreview ? (
          <div className="mt-2 mb-3 relative rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imagePreview} alt="Cover preview" className="w-full h-52 object-cover" />
            <button
              type="button"
              onClick={() => { setImageUrl(""); setImagePreview(""); }}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs transition-colors"
              aria-label="Remove cover image"
            >
              ✕
            </button>
          </div>
        ) : (
          <label
            htmlFor="cover"
            className="mt-2 flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl h-40 cursor-pointer transition-colors bg-gray-50"
          >
            {imageUploading ? (
              <>
                <svg className="w-6 h-6 text-blue-400 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span className="text-sm text-gray-500">Uploading…</span>
              </>
            ) : (
              <>
                <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <span className="text-sm text-gray-500">Click to upload cover image</span>
                <span className="text-xs text-gray-400">JPG, PNG, WebP</span>
              </>
            )}
          </label>
        )}

        <Input
          id="cover"
          name="cover"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={imageUploading}
          className="hidden"
        />
        {fieldErrors.imageUrl?.[0] ? <p className="text-red-600 text-sm mt-1">{fieldErrors.imageUrl[0]}</p> : null}
      </div>

      {/* Video clip */}
      <div>
        <Label htmlFor="video">
          Video clip{" "}
          <span className="text-gray-400 font-normal text-xs">(optional · max {MAX_VIDEO_MB} MB)</span>
        </Label>

        <label
          htmlFor="video"
          className={`mt-2 flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition-colors ${
            videoUploading
              ? "border-blue-200 bg-blue-50"
              : videoUrl
              ? "border-emerald-200 bg-emerald-50"
              : "border-gray-200 bg-gray-50 hover:border-blue-300"
          }`}
        >
          {videoUploading ? (
            <>
              <svg className="w-5 h-5 text-blue-400 animate-spin shrink-0" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <span className="text-sm text-gray-600">Uploading video…</span>
            </>
          ) : videoUrl ? (
            <>
              <svg className="w-5 h-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-emerald-700 truncate flex-1">{videoName}</span>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setVideoUrl(""); setVideoName(""); }}
                className="text-xs text-gray-400 hover:text-red-500 shrink-0"
              >
                Remove
              </button>
            </>
          ) : (
            <>
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
              </svg>
              <span className="text-sm text-gray-500">Choose a short video clip</span>
            </>
          )}
        </label>

        <Input
          id="video"
          name="video"
          type="file"
          accept="video/*"
          onChange={handleVideoChange}
          disabled={videoUploading}
          className="hidden"
        />
        {videoError ? <p className="text-red-600 text-sm mt-1">{videoError}</p> : null}
      </div>

      {/* Global feedback */}
      {error ? (
        <p className="text-red-600 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>
      ) : null}
      {success ? (
        <p className="text-emerald-600 text-sm bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">{success}</p>
      ) : null}

      <Button type="submit" className="w-full" disabled={busy || !imageUrl}>
        {isSubmitting ? "Publishing…" : busy ? "Uploading…" : "Publish story"}
      </Button>
      {!imageUrl && !imageUploading ? (
        <p className="text-xs text-center text-gray-400">Upload a cover image to enable publishing</p>
      ) : null}
    </form>
  );
}
