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
    <div className={cn("border-2 p-2 pr-4 pb-4 flex flex-col gap-y-3")}>
      {LEGEND.map(([k, legend]) => (
        <div className={cn("flex items-end gap-x-0 gap-y-4")}>
          <div className={cn("w-9 text-right")}>
            <MapLegendIcon icon={k} className={cn("m-auto")} />
          </div>
          <div>&nbsp;=&nbsp;</div>
          <div>{legend}</div>
        </div>
      ))}
    </div>
  );
}
