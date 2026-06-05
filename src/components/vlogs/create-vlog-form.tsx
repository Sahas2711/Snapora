"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldErrors = Partial<Record<"title" | "description" | "imageUrl", string[]>>;

type SignatureResponse = {
  status: "success";
  data: {
    cloudName: string;
    apiKey: string;
    timestamp: number;
    folder: string;
    signature: string;
  };
};

type CreateVlogResponse = {
  status: "success";
  data: {
    vlog: {
      id: string;
    };
  };
};

async function uploadCoverImage(file: File) {
  const signatureResponse = await fetch("/api/cloudinary/signature", {
    method: "GET",
    credentials: "include",
  });

  const signaturePayload = (await signatureResponse.json()) as SignatureResponse | { message?: string };

  if (!signatureResponse.ok || !("data" in signaturePayload)) {
    throw new Error(
      (signaturePayload as { message?: string }).message ?? "Unable to prepare upload",
    );
  }

  const { cloudName, apiKey, timestamp, folder, signature } = signaturePayload.data;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("folder", folder);
  formData.append("signature", signature);

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const uploadPayload = (await uploadResponse.json()) as { secure_url?: string; error?: { message?: string } };

  if (!uploadResponse.ok || !uploadPayload.secure_url) {
    throw new Error(uploadPayload.error?.message ?? "Image upload failed");
  }

  return uploadPayload.secure_url;
}

export function CreateVlogForm() {
  const router = useRouter();
  const [isSubmitting, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState<string>();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError(undefined);
    setSuccess(undefined);
    setIsUploading(true);

    try {
      const uploadedUrl = await uploadCoverImage(file);
      setImageUrl(uploadedUrl);
      setImagePreview(uploadedUrl);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Image upload failed");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);
    setSuccess(undefined);
    setFieldErrors({});

    startTransition(async () => {
      const response = await fetch("/api/vlogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      });

      const payload = (await response.json()) as
        | CreateVlogResponse
        | { message?: string; errors?: FieldErrors };

      if (!response.ok || !("data" in payload)) {
        const errPayload = payload as { message?: string; errors?: FieldErrors };
        setError(errPayload.message ?? "Unable to create vlog");
        setFieldErrors(errPayload.errors ?? {});
        return;
      }

      setSuccess("Vlog created successfully");
      router.push("/profile");
      router.refresh();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="My first city walk vlog"
          required
          error={fieldErrors.title?.[0]}
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={5}
          placeholder="Tell viewers what this vlog is about"
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            fieldErrors.description?.[0] ? "border-red-500" : "border-gray-300"
          }`}
        />
        {fieldErrors.description?.[0] ? (
          <p className="text-red-600 text-sm mt-1">{fieldErrors.description[0]}</p>
        ) : null}
      </div>

      <div>
        <Label htmlFor="cover">Cover image</Label>
        <Input
          id="cover"
          name="cover"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          disabled={isUploading}
        />
        <p className="text-sm text-gray-500 mt-2">
          {isUploading ? "Uploading to Cloudinary..." : imageUrl ? "Cover image uploaded." : "Upload an image to generate the Cloudinary URL."}
        </p>
        {fieldErrors.imageUrl?.[0] ? (
          <p className="text-red-600 text-sm mt-1">{fieldErrors.imageUrl[0]}</p>
        ) : null}
      </div>

      {imagePreview ? (
        <div className="rounded-xl border border-gray-200 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imagePreview} alt="Cover preview" className="w-full h-64 object-cover" />
        </div>
      ) : null}

      {error ? <p className="text-red-600 text-sm">{error}</p> : null}
      {success ? <p className="text-emerald-600 text-sm">{success}</p> : null}

      <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting || isUploading}>
        {isSubmitting ? "Publishing..." : "Publish vlog"}
      </Button>
    </form>
  );
}
