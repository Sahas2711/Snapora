"use client";

import Link from "next/link";
import { useActionState, useState, useRef } from "react";

import { registerAction, type ActionState } from "@/actions/auth.actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: ActionState = {};

type SignatureResponse = {
  status: "success";
  data: { cloudName: string; apiKey: string; timestamp: number; folder: string; signature: string };
};

async function uploadAvatarToCloudinary(file: File): Promise<string> {
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

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(registerAction, initialState);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [avatarError, setAvatarError] = useState<string>("");
  const [consentAccepted, setConsentAccepted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview immediately
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarError("");
    setAvatarUploading(true);

    try {
      const url = await uploadAvatarToCloudinary(file);
      setAvatarUrl(url);
    } catch (err) {
      setAvatarError(err instanceof Error ? err.message : "Upload failed");
      setAvatarPreview("");
    } finally {
      setAvatarUploading(false);
    }
  }

  return (
    <form action={formAction} className="space-y-4 w-full max-w-md">
      {/* Profile image picker */}
      <div className="flex flex-col items-center gap-3 pb-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-dashed border-border hover:border-primary transition-colors bg-muted flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Upload profile photo"
        >
          {avatarPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
          ) : (
            <span className="flex flex-col items-center gap-1">
              <svg className="w-6 h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </span>
          )}
          {avatarUploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <svg className="w-5 h-5 text-white animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            </div>
          )}
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
          aria-label="Profile photo file input"
        />

        {/* Hidden field carries the uploaded URL */}
        <input type="hidden" name="avatarUrl" value={avatarUrl} />

        <p className="text-xs text-muted-foreground">
          {avatarUploading ? "Uploading…" : avatarUrl ? "Photo uploaded ✓" : "Add a profile photo (optional)"}
        </p>
        {avatarError ? <p className="text-xs text-destructive">{avatarError}</p> : null}
      </div>

      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" type="text" autoComplete="name" required placeholder="Jane Doe" error={state.fieldErrors?.name?.[0]} />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" error={state.fieldErrors?.email?.[0]} />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" autoComplete="new-password" required placeholder="Min. 8 chars, upper, lower, number" error={state.fieldErrors?.password?.[0]} />
      </div>

      {state.error ? <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-3 py-2">{state.error}</p> : null}

      {state.success ? (
        <div className="rounded-lg bg-success/10 border border-success/20 p-4 space-y-3">
          <p className="text-sm font-medium text-success">{state.success}</p>
          {state.actionUrl ? (
            <a href={state.actionUrl} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-primary hover:bg-primary/90 px-4 py-2 rounded-lg transition-colors shadow-sm">
              Verify email now
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          ) : null}
        </div>
      ) : null}

      {/* Consent checkbox */}
      <div className="flex items-start gap-3 pt-1">
        <Checkbox
          id="consent"
          checked={consentAccepted}
          onCheckedChange={(checked) => setConsentAccepted(checked === true)}
          className="mt-0.5"
          aria-required="true"
        />
        <label htmlFor="consent" className="text-sm text-muted-foreground leading-relaxed cursor-pointer select-none">
          I agree to the{" "}
          <Link href="/terms" className="text-primary font-medium hover:underline">
            Terms of Service
          </Link>{" "}
          and confirm that my content will follow the{" "}
          <Link href="/guidelines" className="text-primary font-medium hover:underline">
            Community Guidelines
          </Link>.
        </label>
      </div>

      {/* Hidden field to pass consent acceptance to server action */}
      <input type="hidden" name="consentAccepted" value={consentAccepted ? "true" : ""} />

      <Button type="submit" className="w-full" disabled={pending || avatarUploading || !consentAccepted}>
        {pending ? "Creating account…" : "Create account"}
      </Button>

      <p className="text-sm text-muted-foreground text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-primary font-medium hover:underline">Sign in</Link>
      </p>
    </form>
  );
}
