"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function RegisterPage() {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const prohibitedItems = [
    "Pornographic content", "Hate speech", "Harassment",
    "Violent content", "Illegal content", "Copyright-infringing content", "Spam or scams"
  ];

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md border-border/40 shadow-xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription>Join the creator community on Snapora</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {/* Form fields for name, email, password would go here */}
          
          <div className="p-3 rounded-lg bg-muted/50 border border-border text-xs space-y-2">
            <p className="font-semibold text-foreground underline underline-offset-2">Community Guidelines</p>
            <p className="text-muted-foreground leading-relaxed">
              By joining Snapora, you explicitly agree not to upload:
            </p>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-1 list-disc list-inside text-muted-foreground">
              {prohibitedItems.map((item) => (
                <li key={item} className="truncate">{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex items-start space-x-3 pt-2">
            <Checkbox 
              id="terms" 
              checked={isAgreed} 
              onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
              className="mt-1"
            />
            <label htmlFor="terms" className="text-sm font-medium leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and 
              confirm that my content will follow the <Link href="/guidelines" className="text-primary hover:underline">Community Guidelines</Link>.
            </label>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full shadow-md" 
            disabled={!isAgreed || isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}