import { useState } from "react";
import { FarmMap } from "~/components/farm-map/farm-map";
import { mergeMapData } from "~/components/farm-map/util";
import { Page, PageHeaderButton } from "~/components/page";

import data from "~/data/data";

export default function () {
  const [isEditing, setEditing] = useState(false);

  return (
    <Page
      title="My Subscription"
      controls={[
        <PageHeaderButton onClick={() => setEditing((prev) => !prev)}>
          {isEditing ? "Save" : "Edit"}
        </PageHeaderButton>,
      ]}
    >
      <FarmMap
        allocation={mergeMapData(data.allocations.total, data.allocations.user)}
      />
    </Page>
  );
}
