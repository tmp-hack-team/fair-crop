import { useState } from "react";
import { FarmMap, MapLegendIcon } from "~/components/farm-map/farm-map";
import { FarmMapLegend } from "~/components/farm-map/farm-map-legend";
import { mergeMapData } from "~/components/farm-map/util";
import { Page, PageHeaderButton } from "~/components/page";
import { InfoCard } from "~/components/ui/info";

import data from "~/data/data";
import { cn } from "~/lib/utils";

export default function () {
  const [isEditing, setEditing] = useState(false);

  const mergedAllocation = mergeMapData(
    data.allocations.total,
    data.allocations.user
  );

  return (
    <Page title="Current Allocation">
      <div className={cn("overflow-auto shrink-0 flex flex-col w-min")}>
        <InfoCard className={cn("mx-1 mb-4")}>
          <p>
            This schematic is a representation of the production allocated for
            the current season by all CSA subscribers.
          </p>
          <p>
            The resources currently allocated by your subscription are
            highlighted in pulsing blue.
          </p>
        </InfoCard>

        <FarmMap allocation={mergedAllocation} />

        <FarmMapLegend
          className={cn("px-1 mt-4")}
          allocation={mergedAllocation}
        />
      </div>
    </Page>
  );
}
