import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Snapora
          </Link>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
