import { useState } from "react";
import { FarmMap, MapLegendIcon } from "~/components/farm-map/farm-map";
import { FarmMapLegend } from "~/components/farm-map/farm-map-legend";
import { Page, PageHeaderButton } from "~/components/page";

import data from "~/data/allocation.json";

export default function () {
  const [isEditing, setEditing] = useState(false);

  return (
    <Page title="Current Allocation">
      <p>
        This schematic is a representation of the production allocated for the
        current season by all CSA subscribers.
      </p>
      <p>
        The resources currently allocated by your subscription are highlighted
        in pulsing blue.
      </p>
      <FarmMap allocation={data.allocation} />

      <FarmMapLegend />
    </Page>
  );
}
