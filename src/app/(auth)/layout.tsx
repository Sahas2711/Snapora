import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-7">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 tracking-tight"
          >
            Snapora
          </Link>
          <p className="mt-1.5 text-xs text-gray-400 tracking-wide">
            Share your story with the world
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-7 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
