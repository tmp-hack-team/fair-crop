import { redirect } from "react-router";
import type { Route } from "./+types/hello";

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
  throw redirect("/csa/about");
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <div>Hello world.</div>;
}
