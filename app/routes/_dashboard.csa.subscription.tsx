import { useState } from "react";
import { FarmMap } from "~/components/farm-map/farm-map";
import { Page, PageHeaderButton } from "~/components/page";

import data from "~/data/allocation.json";

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
      <FarmMap allocation={data.allocation} />
    </Page>
  );
}
