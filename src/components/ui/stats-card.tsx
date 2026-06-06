import { cn } from "@/lib/utils";

type StatsCardProps = {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  trend?: { value: string; positive: boolean };
  className?: string;
  variant?: "default" | "primary" | "ghost";
};

export function StatsCard({ value, label, icon, trend, className, variant = "default" }: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl p-5 transition-all duration-200",
        variant === "default" && "bg-card border border-border shadow-sm hover:shadow-md",
        variant === "primary" && "bg-primary text-primary-foreground shadow-md",
        variant === "ghost" && "bg-transparent",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className={cn(
            "text-2xl sm:text-3xl font-bold tracking-tight",
            variant === "primary" ? "text-primary-foreground" : "text-foreground",
          )}>
            {value}
          </p>
          <p className={cn(
            "text-sm",
            variant === "primary" ? "text-primary-foreground/70" : "text-muted-foreground",
          )}>
            {label}
          </p>
        </div>
        {icon && (
          <div className={cn(
            "shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
            variant === "primary"
              ? "bg-primary-foreground/10 text-primary-foreground"
              : "bg-muted text-muted-foreground",
          )}>
            {icon}
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-3 flex items-center gap-1 text-xs font-medium">
          <span className={trend.positive ? "text-success" : "text-destructive"}>
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
          <span className="text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
}
