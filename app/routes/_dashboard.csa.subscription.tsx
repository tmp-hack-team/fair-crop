import { IconSparkles } from "@tabler/icons-react";
import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { SuggestMealDialog } from "~/components/ai/suggest-meal";
import { FarmMap } from "~/components/farm-map/farm-map";
import { FarmMapLegend } from "~/components/farm-map/farm-map-legend";
import { mergeMapData } from "~/components/farm-map/util";
import { Page, PageHeaderButton } from "~/components/page";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { IconAI } from "~/components/ui/icon";
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

import products from "~/data/products";
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
    <Page title="Your Subscription">
      <div
        className={cn("overflow-auto shrink-0 flex flex-col w-full gap-y-4")}
      >
        <FarmMapLegend allocation={mergedAllocation} />

        <TypographyH2>Monthly Schedule</TypographyH2>
        {months.map((month, i) => (
          <MonthCard month={month} defaultCollapsed={i !== 0} />
        ))}
      </div>
    </Page>
  );
}

function getMonthName(month: number) {
  return MONTH_NAMES[month - 1];
}

function MonthCard({
  month,
  defaultCollapsed,
}: {
  month: number;
  defaultCollapsed?: boolean;
}) {
  const monthCrops = Object.entries(products).filter(([k, v]) => {
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

  const availableIngredients = monthCrops.map(([k, v]) => {
    return {
      name: k,
      ...v,
    };
  });

  return (
    <DataCard
      title={getMonthName(month)}
      collapsible
      defaultCollapsed={defaultCollapsed}
    >
      <div className="pt-2 flex flex-col">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full mb-4">
              Suggest Meals <IconAI />
            </Button>
          </DialogTrigger>
          <DialogContent className="min-h-[40vh]">
            <SuggestMealDialog
              data={{
                availableIngredients,
              }}
            />
          </DialogContent>
        </Dialog>

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
