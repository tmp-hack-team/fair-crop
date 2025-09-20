import type { ProductInfo } from "~/data/crops";
import type { Route } from "./+types/api.suggest-meal";

export type SuggestMealRequest = {
  availableIngredients: Array<
    {
      name: string;
    } & ProductInfo
  >;
};

export async function action({ context }: Route.LoaderArgs): Promise<{
  recipes: Array<{
    title: string;
    servings: number;
    ingredients: Array<{
      name: string;
      quantity: string;
    }>;
    steps: Array<{
      text: string;
    }>;
  }>;
}> {
  // artificial wait
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    recipes: [
      {
        title: "Pumpkin Rice",
        servings: 2,
        ingredients: [
          {
            name: "Rice",
            quantity: "100g",
          },
          {
            name: "Pumpkin",
            quantity: "100g",
          },
        ],
        steps: [
          {
            text: "Mix",
          },
          {
            text: "???",
          },
          {
            text: "Profit.",
          },
        ],
      },
      {
        title: "Something Pasta",
        servings: 2,
        ingredients: [
          {
            name: "Pasta",
            quantity: "100g",
          },
          {
            name: "Something",
            quantity: "100g",
          },
        ],
        steps: [
          {
            text: "Mix",
          },
          {
            text: "???",
          },
          {
            text: "Profit.",
          },
        ],
      },
    ],
  };
}
