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

export function DataCard({
  title,
  children,
  className,
  classNameContent,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  classNameContent?: string;
}) {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div
        className={cn(
          "border-1 border-b-0 border-border text-table-header-fg bg-table-header p-2 font-semibold"
        )}
      >
        {title}
      </div>
      <div
        className={cn(
          "border-1 border-border bg-infocard flex-col items-center p-2",
          classNameContent
        )}
      >
        {children}
      </div>
    </div>
  );
}
