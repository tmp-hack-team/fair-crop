import { useFetcher } from "react-router";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import type { SuggestMealRequest, action } from "~/routes/api.suggest-meal";
import { useEffect } from "react";
import { DataCard } from "../ui/info";
import { TypographyList } from "../ui/typography";

export function SuggestMealDialog({ data }: { data: SuggestMealRequest }) {
  let fetcher = useFetcher<typeof action>();
  const isLoading = !fetcher.data;

  useEffect(() => {
    fetcher.submit(data, {
      action: "/api/suggest-meal",
      method: "post",
      encType: "application/json",
    });
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Recipe recommendations</DialogTitle>
        <DialogDescription asChild>
          <div className="flex flex-col gap-y-4 py-2 ">
            {isLoading
              ? "Loading..."
              : fetcher.data!.recipes.map((recipe) => {
                  return (
                    <DataCard
                      title={recipe.title}
                      classNameContent="text-foreground flex flex-col text-left items-start gap-y-4"
                    >
                      <div>
                        <b>Ingredients</b>
                        <TypographyList>
                          {recipe.ingredients.map((ing) => (
                            <li
                              className={
                                ing.homegrown
                                  ? "text-blue-600 font-semibold"
                                  : ""
                              }
                            >
                              {ing.quantity} {ing.name}
                            </li>
                          ))}
                        </TypographyList>
                      </div>

                      <div>
                        <b>Steps</b>
                        <TypographyList>
                          {recipe.steps.map((step) => (
                            <li>{step.text}</li>
                          ))}
                        </TypographyList>
                      </div>
                    </DataCard>
                  );
                })}
          </div>
        </DialogDescription>
      </DialogHeader>
    </>
  );
}
