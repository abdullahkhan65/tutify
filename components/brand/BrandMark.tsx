import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  compact?: boolean;
  iconClassName?: string;
  textClassName?: string;
  urduClassName?: string;
}

export function BrandMark({
  className,
  compact = false,
  iconClassName,
  textClassName,
  urduClassName,
}: BrandMarkProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400 text-black shadow-lg glow-amber",
          compact && "h-8 w-8",
          iconClassName
        )}
      >
        <span className={cn("text-lg font-black", compact && "text-base")}>ت</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={cn("text-xl font-black tracking-tight", compact && "text-lg", textClassName)}>Taleem</span>
        <span
          className={cn(
            "font-urdu-logo text-sm leading-none text-amber-400 opacity-80",
            compact && "text-xs",
            urduClassName
          )}
        >
          تعلیم
        </span>
      </div>
    </div>
  );
}
