# FAIRCROP

![FAIRCROP](./public/assets/logo.svg)

## Overview

This repository contains our team's (`a temporary team name`) entry to the  2025 xgeek's [geekathon](https://geekathon.dev/) - focusing on sustainable **food production powered by AI**.

FAIRCROP is a platform designed to connect local farmers directly with consumers, addressing the challenges in the agricultural supply chain. Our solution aims to reduce food waste, ensure fair compensation for farmers, and provide consumers with fresh, locally-sourced produce.

The platform allows consumers to subscribe to regular deliveries of seasonal produce baskets from nearby farms, creating a predictable market for farmers while giving consumers access to fresh, local food. By eliminating middlemen and reducing transportation distances, FAIRCROP helps decrease food waste and carbon emissions while supporting local agricultural communities.

## Live Demo

A live deployment of FAIRCROP is available at:

https://faircrop.pt

The application is currently running on an AWS EC2 instance.

## Quick Start

### Requirements

- docker (compose);
- API key for AWS Bedrock access to the `anthropic.claude-3-5-haiku-20241022-v1:0` and `us.anthropic.claude-3-haiku-20240307-v1:0` models;

### Deployment

First, set your API key on [app/lib/secrets.server.ts](app/lib/secrets.server.ts).

Then, build and run FAIRCROP using the provided compose file:

```bash
docker compose up --build -d
```
This deploys FAIRCROP on HTTP (port 80). Domain name and SSL certificate not included ;).

## Development

For local development:

1. Install [mise](https://mise.jdx.dev/getting-started.html);
2. Install tools: `mise install`;
3. Install dependencies: `pnpm install`;
4. Run development server: `pnpm dev`;

Your application will be available at `http://localhost:5173`.

For remote development, we provide the [deploy.sh](scripts/deploy.sh) we used for the competition. This script copies the necessary files to a remote server and runs the application using Docker. Change `$HOST` accordingly and set up SSH authentication server-side if required.

## Roadmap

* Status updates on crops ("good"/"bad" crop forecasts);
* Customers can request new produce:
* Backoffice for farmers;
    * Custom crops;
    * Crop allocation and management;
* Recommendation engine for customers picking up produce;
    * Ideal travel times and paths;
    * Possible ridesharing between customers;