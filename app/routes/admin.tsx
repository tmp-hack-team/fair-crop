import type { Route } from "./+types/admin";

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

export async function loader({ context }: Route.LoaderArgs) {
  return {};
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <div>Hello world.</div>;
}
