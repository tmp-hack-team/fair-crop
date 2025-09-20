import { useState } from "react";
import { FarmMap, MapLegendIcon } from "~/components/farm-map/farm-map";
import { FarmMapLegend } from "~/components/farm-map/farm-map-legend";
import { mergeMapData } from "~/components/farm-map/util";
import { Page, PageHeaderButton } from "~/components/page";
import { InfoCard } from "~/components/ui/info";

import data from "~/data/data";

export default function () {
  const [isEditing, setEditing] = useState(false);

  return (
    <Page title="Current Allocation">
      <FarmMap
        allocation={mergeMapData(data.allocations.total, data.allocations.user)}
        withInfo
        withLegend
      />
    </Page>
  );
}
