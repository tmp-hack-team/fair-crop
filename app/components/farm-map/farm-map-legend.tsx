import { cn } from "~/lib/utils";
import { MapLegendIcon } from "./farm-map";

const LEGEND = [
  ["cow", "Dairy basket"],
  ["chicken", "Egg basket"],
  ["fruit", "Seasonal fruit basket"],
  ["greens", "Seasonal greens basket"],
  ["veggies", "Seasonal vegetables basket"],
];

export function FarmMapLegend({
  className,
  allocation,
}: {
  className?: string;
  allocation: {
    [k: string]: {
      total: number;
      user?: number;
    };
  };
}) {
  return (
    <div className={cn("flex flex-col w-fit", className)}>
      <div
        className={cn(
          "border-1 border-b-0 border-border text-table-header-fg bg-table-header p-2 font-semibold"
        )}
      >
        Summary
      </div>
      <div
        className={cn(
          "border-1 border-border bg-infocard grid gap-x-2 grid-cols-[auto_auto_auto_1fr] items-center"
        )}
      >
        {LEGEND.map(([k, legend]) => (
          <>
            <div className={cn("w-11 text-right h-10 flex")}>
              <MapLegendIcon icon={k} className={cn("m-auto")} />
            </div>
            <div>{legend}</div>
            <div className="italic pl-4">
              Your subscription: {allocation[k].user}/wk
            </div>
            <div className="italic pl-4 pr-4">
              Total production: {allocation[k].total}/wk
            </div>
          </>
        ))}
      </div>
    </div>
  );
}
