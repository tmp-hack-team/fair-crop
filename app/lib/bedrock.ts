import secrets from "~/lib/secrets.server";
import { BedrockRuntimeClient } from "@aws-sdk/client-bedrock-runtime";

const REGION = "us-east-1";

export function initBedrockClient() {
    const client = new BedrockRuntimeClient({
        region: REGION,
        token: { token: secrets.BEDROCK_API_KEY },
        authSchemePreference: ["httpBearerAuth"],
    });
    return client;
}
