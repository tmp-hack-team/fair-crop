import { useState } from "react";
import { FarmMap } from "~/components/farm-map/farm-map";
import { Page, PageHeaderButton } from "~/components/page";

import allocation from "~/data/allocations.json";

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
      <FarmMap allocation={allocation} />
    </Page>
  );
}
