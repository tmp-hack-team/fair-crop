import { initBedrockClient } from "~/lib/bedrock";
import type { Route } from "./+types/hello";

import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FairCrop" },
    {
      name: "description",
      content:
        "FairCrop is an integrated system to manage agricultural co-production facilities.",
    },
  ];
}

const MODEL_ID = "anthropic.claude-3-haiku-20240307-v1:0";

export async function loader({ context }: Route.LoaderArgs) {
  const bedrock = initBedrockClient();

  const payload = {
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 1000,
    messages: [{ role: "user", content: [{ type: "text", text: "aaaa" }] }],
  };

  const apiResponse = await bedrock.send(
    new InvokeModelCommand({
      contentType: "application/json",
      body: JSON.stringify(payload),
      modelId: MODEL_ID,
    })
  );

  const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
  const responseBody = JSON.parse(decodedResponseBody);
  const responses = responseBody.content;

  return {
    responses,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      Hello world.
      <pre>{JSON.stringify(loaderData, null, 2)}</pre>
    </div>
  );
}
