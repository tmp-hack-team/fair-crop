import type { ReactNode } from "react";

export function TypographyP({ children }: { children: ReactNode }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

export function TypographyBlockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}

export function TypographyList({ children }: { children: ReactNode }) {
  return <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>;
}

export function TypographyLead({ children }: { children: ReactNode }) {
  return <p className="text-xl">{children}</p>;
}
