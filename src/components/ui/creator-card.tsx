import Link from "next/link";
import { cn } from "@/lib/utils";

type CreatorCardProps = {
  id: string;
  name: string;
  username?: string | null;
  image?: string | null;
  storyCount: number;
  className?: string;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function CreatorCard({ id, name, username, image, storyCount, className }: CreatorCardProps) {
  return (
    <Link
      href={`/users/${id}`}
      className={cn(
        "group flex items-center gap-4 p-4 rounded-xl border border-border bg-card",
        "hover:shadow-md hover:border-primary/20 hover:-translate-y-0.5",
        "transition-all duration-200",
        className,
      )}
    >
      {/* Avatar */}
      <div className="shrink-0">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-border group-hover:ring-primary/30 transition-all"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-500 text-primary-foreground flex items-center justify-center font-semibold text-sm ring-2 ring-border group-hover:ring-primary/30 transition-all">
            {getInitials(name)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
          {name}
        </p>
        {username && (
          <p className="text-sm text-muted-foreground truncate">@{username}</p>
        )}
      </div>

      {/* Stat */}
      <div className="text-right shrink-0">
        <p className="font-bold text-foreground">{storyCount}</p>
        <p className="text-xs text-muted-foreground">{storyCount === 1 ? "story" : "stories"}</p>
      </div>
    </Link>
  );
}
