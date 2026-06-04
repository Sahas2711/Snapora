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

type UpdateVlogResponse = {
  status: "success";
  data: {
    vlog: {
      id: string;
    };
  };
};

type EditVlogFormProps = {
  vlogId: string;
  defaultValues: {
    title: string;
    description: string | null;
    imageUrl: string;
  };
};

async function uploadCoverImage(file: File) {
  const signatureResponse = await fetch("/api/cloudinary/signature", {
    method: "GET",
    credentials: "include",
  });

  const signaturePayload = (await signatureResponse.json()) as SignatureResponse | { message?: string };

  if (!signatureResponse.ok || !("data" in signaturePayload)) {
    throw new Error(signaturePayload.message ?? "Unable to prepare upload");
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

export function EditVlogForm({ vlogId, defaultValues }: EditVlogFormProps) {
  const router = useRouter();
  const [isSubmitting, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();
  const [title, setTitle] = useState(defaultValues.title);
  const [description, setDescription] = useState(defaultValues.description ?? "");
  const [imageUrl, setImageUrl] = useState(defaultValues.imageUrl);
  const [imagePreview, setImagePreview] = useState(defaultValues.imageUrl);
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
      const response = await fetch(`/api/vlogs/${vlogId}`, {
        method: "PUT",
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
        | UpdateVlogResponse
        | { message?: string; errors?: FieldErrors };

      if (!response.ok || !("data" in payload)) {
        setError(payload.message ?? "Unable to update vlog");
        setFieldErrors(payload.errors ?? {});
        return;
      }

      setSuccess("Vlog updated successfully");
      router.push(`/vlogs/${payload.data.vlog.id}`);
      router.refresh();
    });
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Delete this vlog? This will remove it from public views.",
    );

    if (!confirmed) {
      return;
    }

    setError(undefined);
    setSuccess(undefined);

    startDeleteTransition(async () => {
      const response = await fetch(`/api/vlogs/${vlogId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setError(payload.message ?? "Unable to delete vlog");
        return;
      }

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
          {isUploading ? "Uploading to Cloudinary..." : "Upload a new image only if you want to replace the current cover."}
        </p>
        {fieldErrors.imageUrl?.[0] ? (
          <p className="text-red-600 text-sm mt-1">{fieldErrors.imageUrl[0]}</p>
        ) : null}
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imagePreview} alt="Cover preview" className="w-full h-64 object-cover" />
      </div>

      {error ? <p className="text-red-600 text-sm">{error}</p> : null}
      {success ? <p className="text-emerald-600 text-sm">{success}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting || isUploading || isDeleting}>
          {isSubmitting ? "Saving..." : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="danger"
          className="w-full sm:w-auto"
          disabled={isSubmitting || isUploading || isDeleting}
          onClick={handleDelete}
        >
          {isDeleting ? "Deleting..." : "Delete vlog"}
        </Button>
      </div>
    </form>
  );
}
