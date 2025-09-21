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

  const systemPrompt = `
  You are an agent that is responsible for answering to any question about FairCrop, a Community-supported Agriculture (CSA) subscription platform.

  You should be patient, and don't try to be funny. Write in a professional tone.
  
  DON'T PRETEND TO BE A HUMAN. DON'T BE OVERLY FRIENDLY. YOU ARE A TOOL. YOU DO NOT HAVE A NAME.`;

  console.log(JSON.stringify(history, null, 2));

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 2000,
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
    const responseBody = JSON.parse(decodedResponseBody);

    console.log(JSON.stringify(responseBody, null, 2));

    return responseBody.content[0];
  } catch (error) {
    console.error("Error calling Bedrock:", error);

    return JSON.stringify(error);
  }
}
