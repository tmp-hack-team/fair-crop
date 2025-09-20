import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

export function InfoCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-y-3 border-1 border-info-border bg-info p-2 italic",
        className
      )}
    >
      {children}
    </div>
  );
}
