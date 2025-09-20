import type { ReactNode } from "react";
import { ChartAreaInteractive } from "./chart-area-interactive";
import { DataTable } from "./data-table";
import { SectionCards } from "./section-cards";
import { SiteHeader } from "./site-header";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { Outlet } from "react-router";
import React from "react";
import { TypographyLead, TypographyP } from "./ui/typography";

export function Page({
  children,
  title,
  controls,
}: {
  children: ReactNode;
  title: ReactNode;
  controls?: Array<ReactNode>;
}) {
  return (
    <>
      <header className="flex h-18 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b-1 border-sidebar-border bg-header">
        <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          {title}
          <div className="ml-auto flex items-center gap-2">
            {controls?.map((c, i) => (
              <React.Fragment key={i}>{c}</React.Fragment>
            ))}
          </div>
        </div>
      </header>
      <div className="flex flex-1 flex-col items-start gap-4 p-4 pt-4 text-sm">
        {children}
      </div>
    </>
  );
}

export function PageHeaderButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button size="sm" variant="default" onClick={onClick}>
      {children}
    </Button>
  );
}
