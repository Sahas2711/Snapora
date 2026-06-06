import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-foreground">Create an account</h1>
        <p className="text-sm text-muted-foreground mt-1.5">
          Join the creator community on Snapora
        </p>
      </div>

      <div className="rounded-xl border border-border/60 bg-card shadow-sm p-6">
        <RegisterForm />
      </div>
    </div>
  );
}