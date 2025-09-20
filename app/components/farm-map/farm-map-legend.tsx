import { cn } from "~/lib/utils";
import { MapLegendIcon } from "./farm-map";

const LEGEND = [
  ["cow", "Dairy basket"],
  ["chicken", "Poultry basket"],
  ["fruit", "Seasonal fruit basket"],
  ["greens", "Seasonal greens basket"],
  ["veggies", "Seasonal vegetables basket"],
];

export function FarmMapLegend({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col w-full", className)}>
      <div
        className={cn(
          "border-1 border-b-0 border-border text-table-header-fg bg-table-header p-2 font-semibold"
        )}
      >
        Legend (weekly delivery)
      </div>
      <div className={cn("border-1 border-border bg-accent flex flex-col")}>
        {LEGEND.map(([k, legend]) => (
          <div
            className={cn(
              "flex items-center gap-x-2 gap-y-4 h-10 border-border border-b-1 pl-1"
            )}
          >
            <div className={cn("w-11 text-right")}>
              <MapLegendIcon icon={k} className={cn("m-auto")} />
            </div>
            <div>{legend}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
