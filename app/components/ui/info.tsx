import {
  IconCross,
  IconSquareMinus,
  IconSquareMinusFilled,
  IconSquareX,
} from "@tabler/icons-react";
import { SquareMinusIcon, SquarePlusIcon } from "lucide-react";
import { useState, type ReactNode } from "react";
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
  collapsible,
  defaultCollapsed,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  classNameContent?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}) {
  const [isCollapsed, setCollapsed] = useState(!!defaultCollapsed);

  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div
        className={cn(
          "border-1 border-b-0 border-border text-table-header-fg bg-table-header p-2 font-semibold flex justify-between"
        )}
      >
        <span>{title}</span>

        {collapsible && (
          <div
            className="cursor-pointer"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {isCollapsed ? <SquarePlusIcon /> : <SquareMinusIcon />}
          </div>
        )}
      </div>
      <div
        className={cn(
          "border-1 border-border bg-infocard flex-col items-center p-2 overflow-hidden transition-all duration-500",
          classNameContent
        )}
        style={{
          maxHeight: isCollapsed ? 0 : "1000px",
        }}
      >
        {children}
      </div>
    </div>
  );
}
