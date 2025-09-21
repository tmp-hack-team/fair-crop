import type { ComponentProps } from "react";
import { Link as RemixLink } from "react-router";
import { cn } from "~/lib/utils";

export function Link(props: ComponentProps<typeof RemixLink>) {
  return <RemixLink {...props} className={cn(props.className, "underline")} />;
}
