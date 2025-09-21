import { useEffect, useState } from "react";
import { FarmMap, MapLegendIcon } from "~/components/farm-map/farm-map";
import { FarmMapLegend } from "~/components/farm-map/farm-map-legend";
import { mergeMapData } from "~/components/farm-map/util";
import { Page, PageHeaderButton } from "~/components/page";
import { InfoCard } from "~/components/ui/info";

import data from "~/data/data";
import type { Subscription } from "~/lib/types";
import { cn } from "~/lib/utils";

export default function () {
  const [isEditing, setEditing] = useState(false);

  const [subscription, setSubscription] = useState<null | Subscription>(null);

  useEffect(() => {
    const sub = localStorage.getItem("subscription");
    if (sub !== null) {
      setSubscription(JSON.parse(sub));
    }
  }, []);

  const mergedProduction = mergeMapData(
    data.productions.total,
    subscription ? subscription.baskets : {}
  );

  return (
    <Page title="Current Production">
      <div className={cn("overflow-auto shrink-0 flex flex-col w-min")}>
        <InfoCard className={cn("mx-1 mb-4")}>
          <p>
            This schematic is a representation of the production allocated for
            the current season by all CSA subscribers.
          </p>
          <p>
            The resources currently allocated by other subscribers are
            highlighted <span className="bg-green-200">green</span>.
          </p>
          <p>
            The resources currently allocated by your subscription are
            highlighted in <span className="bg-blue-200">pulsing blue</span>.
          </p>
          <p>The remaining resources are currently unalocated.</p>
        </InfoCard>

        <FarmMap production={mergedProduction} />

        <FarmMapLegend
          className={cn("px-1 mt-4 w-full mb-4")}
          production={mergedProduction}
        />
      </div>
    </Page>
  );
}
