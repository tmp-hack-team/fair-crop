import type { ProductInfo } from "~/data/crops";
import type { Route } from "./+types/api.suggest-meal";
import { initBedrockClient } from "~/lib/bedrock";
import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

export type SuggestMealRequest = {
  availableIngredients: Array<
    {
      name: string;
    } & ProductInfo
  >;
};

export async function action({ request, context }: Route.LoaderArgs): Promise<{
  recipes: Array<{
    title: string;
    servings: number;
    ingredients: Array<{
      name: string;
      quantity: string;
      fromCSA: boolean;
    }>;
    steps: Array<{
      text: string;
    }>;
  }>;
}> {
  const MODEL_ID = "us.anthropic.claude-3-haiku-20240307-v1:0";
  const bedrock = initBedrockClient();

  const requestData = (await request.json()) as SuggestMealRequest;
  const ingredients = requestData.availableIngredients
    .map((ing) => ing.name)
    .join(", ");

  const tools = [
    {
      name: "generate_recipes",
      description: "Generate recipes based on available ingredients",
      input_schema: {
        type: "object",
        properties: {
          recipes: {
            type: "array",
            description:
              "List of recipes that can be made with the available ingredients",
            items: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Title of the recipe",
                },
                servings: {
                  type: "integer",
                  description: "Number of servings the recipe makes",
                },
                ingredients: {
                  type: "array",
                  description: "List of ingredients with quantities",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        description: "Name of the ingredient",
                      },
                      quantity: {
                        type: "string",
                        description: "Quantity of the ingredient needed",
                      },
                      fromCSA: {
                        type: "boolean",
                        description:
                          "True if this ingredient is sourced from the CSA basket",
                      },
                    },
                    required: ["name", "quantity", "fromCSA"],
                  },
                },
                steps: {
                  type: "array",
                  description: "Step-by-step cooking instructions",
                  items: {
                    type: "object",
                    properties: {
                      text: {
                        type: "string",
                        description: "Text describing the cooking step",
                      },
                    },
                    required: ["text"],
                  },
                },
              },
              required: ["title", "servings", "ingredients", "steps"],
            },
          },
        },
        required: ["recipes"],
      },
    },
  ];

  const prompt = `Given these ingredients: ${ingredients}, suggest at least 2 recipes that can be made with them. You can add some very common ingredients like pasta, rice, potatoes, etc.`;

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 2000,
    tools: tools,
    tool_choice: { type: "tool", name: "generate_recipes" },
    messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
  };

  try {
    const apiResponse = await bedrock.send(
      new InvokeModelCommand({
        contentType: "application/json",
        body: JSON.stringify(payload),
        modelId: MODEL_ID,
      })
    );

    const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
    const responseBody = JSON.parse(decodedResponseBody);

    const toolUseBlock = responseBody.content.find(
      (block) => block.type === "tool_use"
    );

    console.log(JSON.stringify(toolUseBlock, null, 2));

    if (toolUseBlock && toolUseBlock.input && toolUseBlock.input.recipes) {
      return { recipes: toolUseBlock.input.recipes };
    }
    throw new Error("Failed to get recipes from tool use response");
  } catch (error) {
    console.error("Error calling Bedrock:", error);

    return {
      recipes: [
        {
          title: "Chicken soup",
          servings: 2,
          ingredients: [
            { name: "Chicken", quantity: "1", fromCSA: true },
            { name: "Water", quantity: "5L", fromCSA: false },
            { name: "Salt", quantity: "to taste", fromCSA: false },
          ],
          steps: [
            { text: "Fill pan with water and place chicken" },
            { text: "Salt to taste" },
            { text: "Let water boil and cook for 30 minutes" },
          ],
        },
      ],
    };
  }
}
