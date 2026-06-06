import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  containerSize?: "sm" | "md" | "lg" | "xl" | "full";
  variant?: "default" | "muted" | "gradient";
};

export function Section({
  className,
  title,
  subtitle,
  action,
  containerSize = "lg",
  variant = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-16 sm:py-24",
        variant === "muted" && "bg-muted/50",
        variant === "gradient" && "bg-gradient-to-b from-primary/5 via-transparent to-transparent",
        className,
      )}
      {...props}
    >
      <Container size={containerSize}>
        {(title || subtitle || action) && (
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div className="space-y-2 max-w-2xl">
              {title && (
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
              )}
            </div>
            {action && <div className="shrink-0">{action}</div>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
