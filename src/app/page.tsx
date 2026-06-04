import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  return (
    <div className="flex flex-col flex-1 items-center justify-center px-6 py-24">
      <div className="text-center max-w-2xl space-y-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-600">
          Snapora
        </h1>
        <p className="text-lg text-gray-600">
          Share your story with the world. Create vlogs, connect with creators,
          and discover inspiring content.
        </p>

        {session?.user ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/create-vlog">
              <Button>Create vlog</Button>
            </Link>
            <Link href="/vlogs">
              <Button variant="secondary">Browse vlogs</Button>
            </Link>
            <Link href="/profile">
              <Button variant="secondary">View profile</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button>Get started</Button>
            </Link>
            <Link href="/vlogs">
              <Button variant="secondary">Browse vlogs</Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary">Sign in</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
