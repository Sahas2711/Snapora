import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

const variants = {
  primary:
    "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
  secondary:
    "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
  danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`font-semibold py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
