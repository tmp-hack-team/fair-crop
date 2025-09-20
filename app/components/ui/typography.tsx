import type { ReactNode } from "react";
import { cn } from "~/lib/utils";

export function TypographyP({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6")}>{children}</p>
  );
}

export function TypographyBlockquote({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic")}>
      {children}
    </blockquote>
  );
}

export function TypographyLead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("text-xl")}>{children}</p>;
}

export function TypographyH1({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance"
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyH2({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "scroll-m-20 border-b pb-1 text-xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyH3({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-1 text-xl font-medium tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function TypographyList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ul className={cn("ml-6 list-disc [&>li]:mt-1", className)}>{children}</ul>
  );
}
