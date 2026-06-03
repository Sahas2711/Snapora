"use client";

import { useActionState } from "react";

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

export function ProfileForm({ defaultValues }: ProfileFormProps) {
  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4 w-full max-w-md">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          defaultValue={defaultValues.name}
          required
        />
      </div>

      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          type="text"
          defaultValue={defaultValues.username ?? ""}
          placeholder="optional"
        />
      </div>

      <div>
        <Label htmlFor="image">Profile image URL</Label>
        <Input
          id="image"
          name="image"
          type="url"
          defaultValue={defaultValues.image ?? ""}
          placeholder="https://..."
        />
      </div>

      {state.error ? (
        <p className="text-red-600 text-sm">{state.error}</p>
      ) : null}

      {state.success ? (
        <p className="text-emerald-600 text-sm">{state.success}</p>
      ) : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save changes"}
      </Button>
    </form>
  );
}
