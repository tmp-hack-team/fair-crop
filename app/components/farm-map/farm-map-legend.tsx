import { cn } from "~/lib/utils";
import { MapLegendIcon } from "./farm-map";

const LEGEND = [
  ["cow", "1 weekly dairy basket"],
  ["chicken", "1 weekly poultry basket"],
  ["fruit", "1 weekly seasonal fruit basket"],
  ["greens", "1 weekly seasonal greens basket"],
  ["veggies", "1 weekly seasonal vegetables basket"],
];

export function FarmMapLegend() {
  return (
    <div>
      <div
        className={cn(
          "border-1 border-b-0 border-border text-table-header-fg bg-table-header p-2 font-semibold"
        )}
      >
        Legend
      </div>
      <div
        className={cn(
          "border-1 border-border bg-accent p-2 pr-4 pb-4 flex flex-col gap-y-3"
        )}
      >
        {LEGEND.map(([k, legend]) => (
          <div className={cn("flex items-end gap-x-2 gap-y-4 h-8")}>
            <div className={cn("w-9 text-right")}>
              <MapLegendIcon icon={k} className={cn("m-auto")} />
            </div>
            <div>{legend}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
