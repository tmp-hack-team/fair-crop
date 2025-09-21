import type { Route } from "./+types/api.suggest-meal";
import { initBedrockClient } from "~/lib/bedrock";
import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { BASKET_TYPES, type BasketType } from "~/lib/types";

export type SubscribeBotRequest = {
  history: Array<any>;
};

export async function action({
  request,
  context,
}: Route.LoaderArgs): Promise<{}> {
  const MODEL_ID = "us.anthropic.claude-3-haiku-20240307-v1:0";
  const bedrock = initBedrockClient();

  const { history } = (await request.json()) as SubscribeBotRequest;

  const tools = [
    {
      name: "text_message",
      description: "Send a message to the client",
      input_schema: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
        },
        required: ["message"],
      },
    },
    {
      name: "offer",
      description:
        "Send an offer to the client, with an accompanying message explaining the reasoning for the proposal",
      input_schema: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          offer: {
            type: "object",
            properties: Object.fromEntries(
              Object.entries(BASKET_TYPES).map(([basketType, meta]) => {
                return [
                  basketType,
                  {
                    type: "number",
                    description:
                      "The number of weekly baskets of this type to propose to the client",
                  },
                ];
              })
            ),
          },
        },
        required: ["message", "offer"],
      },
    },
  ];

  const systemPrompt = `
You are an agent that is helping a client to sign up to FairCrop, a Community-support Agriculture (CSA) subscription platform. You will guide the client to select a plan which will consist of any number of weekly baskets of each type (specified in the schema of the tools available to you). The amount of produce in these baskets will vary with production, but will be usually very competitive with comparable offers in the market. You shouldn't influence the client to commit to more than he might consume, and you should make sure to inform them they can change their subscription at any time. You shouldn't drag the conversation for too long, but you also shouldn't mark the offer as accepted unless you're completely certain the client has agreed with it.

The user has already picked a local farm to subscribe to, so we just need to find the right plan for them. Make sure to make a good first question, for example about how many people will consume the contents in their household, how often they cook, what kind of food they eat, their eating restrictions (vegan? lactose intolerant?), etc. Make your best judgment on the best approach.

**You should inform the user in your first message of the available basket types.**

You don't have much information about the contents of the baskets, so feel free to extrapolate from the information you have available to you, in a believable way given the context.

DON'T PRETEND TO BE A HUMAN. DON'T BE OVERLY FRIENDLY. YOU ARE A TOOL. YOU DO NOT HAVE A NAME.

**You should inform the user in your first message of the available basket types.**
`;

  console.log(JSON.stringify(history, null, 2));

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 2000,
    tools,
    tool_choice: { type: "any" },
    system: systemPrompt,
    messages: history,
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
    const responseBody = JSON.parse(decodedResponseBody) as {
      content: Array<
        {
          type: "tool_use";
        } & (
          | { name: "text_message"; input: { message: string } }
          | {
              name: "offer";
              input: {
                message: string;
                offer: {
                  [key in BasketType]: number;
                };
              };
            }
          | {
              type: "offer_accepted";
            }
        )
      >;
    };

    console.log({ responseBody });

    const toolUseBlock = responseBody.content.find(
      (block) => block.type === "tool_use"
    );

    console.log("!!!!!!!", toolUseBlock);

    if (!toolUseBlock) {
      throw new Error("Failed to get recipes from tool use response");
    }

    return toolUseBlock;
  } catch (error) {
    console.error("Error calling Bedrock:", error);

    return JSON.stringify(error);
  }
}
