import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type EmptyStateProps = {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
  size?: "sm" | "md" | "lg";
};

export function EmptyState({ icon, title, description, action, className, size = "md" }: EmptyStateProps) {
  const iconSizes = { sm: "w-10 h-10", md: "w-14 h-14", lg: "w-20 h-20" };
  const titleSizes = { sm: "text-lg", md: "text-xl", lg: "text-2xl" };
  const gapSizes = { sm: "gap-4", md: "gap-6", lg: "gap-8" };
  const paddingSizes = { sm: "py-12", md: "py-20", lg: "py-28" };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center px-6",
        paddingSizes[size],
        className,
      )}
    >
      {icon ? (
        <div
          className={cn(
            "rounded-2xl bg-muted border border-border flex items-center justify-center mb-2",
            iconSizes[size],
          )}
        >
          <div className="text-muted-foreground [&_svg]:w-5 [&_svg]:h-5">{icon}</div>
        </div>
      ) : null}
      <div className={cn("flex flex-col items-center", gapSizes[size])}>
        <div className="space-y-2 max-w-sm">
          <h3 className={cn("font-semibold text-foreground tracking-tight", titleSizes[size])}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        </div>
        {action && (
          action.href ? (
            <Link href={action.href}>
              <Button className="shadow-md">{action.label}</Button>
            </Link>
          ) : (
            <Button onClick={action.onClick} className="shadow-md">{action.label}</Button>
          )
        )}
      </div>
    </div>
  );
}
