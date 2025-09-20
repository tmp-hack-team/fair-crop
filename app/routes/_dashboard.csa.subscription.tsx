import { useState } from "react";
import { FarmMap } from "~/components/farm-map/farm-map";
import { FarmMapLegend } from "~/components/farm-map/farm-map-legend";
import { mergeMapData } from "~/components/farm-map/util";
import { Page, PageHeaderButton } from "~/components/page";
import { DataCard, InfoCard } from "~/components/ui/info";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { TypographyH2, TypographyH3 } from "~/components/ui/typography";

import crops from "~/data/crops";
import data from "~/data/data";
import { cn } from "~/lib/utils";

const CURR_MONTH = 9;
const N_MONTHS = 3;

const MONTH_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function () {
  const [isEditing, setEditing] = useState(false);

  const mergedAllocation = mergeMapData(
    data.allocations.total,
    data.allocations.user
  );

  const months = [
    ...MONTH_NUMBERS.slice(CURR_MONTH - 1),
    ...MONTH_NUMBERS.slice(0, CURR_MONTH - 1),
  ].slice(0, N_MONTHS);

  return (
    <Page
      title="Subscription & Schedule"
      /*controls={[
        <PageHeaderButton onClick={() => setEditing((prev) => !prev)}>
          {isEditing ? "Save" : "Edit"}
        </PageHeaderButton>,
      ]}*/
    >
      <div className={cn("overflow-auto shrink-0 flex flex-col w-fit gap-y-4")}>
        {/* <InfoCard className={cn("mx-1 mb-4")}>
          <p>
            This schematic is a representation of the production allocated for
            the current season by all CSA subscribers.
          </p>
          <p>
            The resources currently allocated by your subscription are
            highlighted in pulsing blue.
          </p>
        </InfoCard>

        <FarmMap allocation={mergedAllocation} /> */}

        <FarmMapLegend allocation={mergedAllocation} />
        {months.map((month) => (
          <MonthCard month={month} />
        ))}
      </div>
    </Page>
  );
}

function getMonthName(month: number) {
  return MONTH_NAMES[month - 1];
}

function MonthCard({ month }: { month: number }) {
  const monthCrops = Object.entries(crops).filter(([k, v]) => {
    if (!v.seasonal) return true;
    if (v.seasonal) {
      const userZoneCrop = v.zones[data.user.zone];

      if (userZoneCrop.start > userZoneCrop.end) {
        return month >= userZoneCrop.start || month <= userZoneCrop.end;
      } else {
        return userZoneCrop.start <= month && userZoneCrop.end >= month;
      }
    }
  });

  const vegetables = monthCrops.filter(([k, v]) => v.type === "vegetable");
  const fruits = monthCrops.filter(([k, v]) => v.type === "fruit");
  const others = monthCrops.filter(
    ([k, v]) => v.type !== "fruit" && v.type !== "vegetable"
  );

  return (
    <DataCard title={getMonthName(month)}>
      <div className="gap-y-4 flex flex-col">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead rowSpan={3} className="w-[100px]">
                Product
              </TableHead>
              <TableHead colSpan={8}>Nutrition (per 100g)</TableHead>
            </TableRow>
            <TableRow>
              <TableHead rowSpan={2}> Energy</TableHead>
              <TableHead colSpan={2}>Fat</TableHead>
              <TableHead colSpan={2}>Carbohydrate</TableHead>
              <TableHead rowSpan={2}>Protein</TableHead>
              <TableHead rowSpan={2}>Sodium</TableHead>
              <TableHead rowSpan={2}>Fiber</TableHead>
            </TableRow>
            <TableRow>
              <TableHead>Total</TableHead>
              <TableHead>Saturated</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Sugars</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(
              [
                ["Vegetables", vegetables],
                ["Fruit", fruits],
                ["Others", others],
              ] as const
            ).map(([label, arr]) => {
              return arr.map(([name, p]) => (
                <TableRow>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell>{p.nutrition.energyKcal} kcal</TableCell>
                  <TableCell>{p.nutrition.fat.totalGrams} g</TableCell>
                  <TableCell>{p.nutrition.fat.saturatesGrams} g</TableCell>
                  <TableCell>{p.nutrition.carbohydrate.totalGrams} g</TableCell>
                  <TableCell>
                    {p.nutrition.carbohydrate.sugarsGrams} g
                  </TableCell>
                  <TableCell>{p.nutrition.proteinGrams} g</TableCell>
                  <TableCell>{p.nutrition.sodiumMilligrams} mg</TableCell>
                  <TableCell>{p.nutrition.fiberGrams} g</TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </div>
    </DataCard>
  );
}
