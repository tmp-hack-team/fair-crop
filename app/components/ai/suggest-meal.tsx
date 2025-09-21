import { useFetcher } from "react-router";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import type { SuggestMealRequest, action } from "~/routes/api.suggest-meal";
import { useCallback, useEffect } from "react";
import { DataCard } from "../ui/info";
import { TypographyList } from "../ui/typography";
import { IconBasket } from "@tabler/icons-react";
import { PackageOpenIcon } from "lucide-react";
import { Spinner } from "components/ui/shadcn-io/spinner";
import { Button } from "../ui/button";

export function SuggestMealDialog({ data }: { data: SuggestMealRequest }) {
  let fetcher = useFetcher<typeof action>();
  const isLoading = !fetcher.data || fetcher.state !== "idle";

  const fetchSuggestions = useCallback(
    () =>
      fetcher.submit(data, {
        action: "/api/suggest-meal",
        method: "post",
        encType: "application/json",
      }),
    []
  );

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <>
      <DialogHeader>
        <DialogTitle>Recipe recommendations</DialogTitle>
        <DialogDescription asChild>
          <div className="flex flex-col gap-y-4 py-2 max-h-[80vh] overflow-scroll">
            {isLoading ? (
              <span className="flex flex-row gap-x-2">
                <Spinner variant="pinwheel" /> Generating recipes...
              </span>
            ) : (
              fetcher.data!.recipes.map((recipe) => {
                return (
                  <DataCard
                    title={recipe.title}
                    classNameContent="text-foreground flex flex-col text-left items-start gap-y-4"
                  >
                    <div>
                      <b>Ingredients</b>
                      <TypographyList>
                        {recipe.ingredients.map((ing) => (
                          <li className="flex flex-row">
                            {ing.name}{" "}
                            {ing.fromCSA && (
                              <div className="font-bold text-xs pl-1 text-green-700">
                                CSA
                              </div>
                            )}
                            &nbsp;-&nbsp;
                            {ing.quantity}
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
              })
            )}
          </div>
        </DialogDescription>
      </DialogHeader>
      {!isLoading && (
        <DialogFooter>
          <Button onClick={fetchSuggestions}>Generate More</Button>
        </DialogFooter>
      )}
    </>
  );
}
