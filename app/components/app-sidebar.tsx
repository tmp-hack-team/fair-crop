"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  Gauge,
  Carrot,
  LandPlot,
  HandCoins,
  MessageCircleQuestionIcon,
  MessageCircleQuestionMark,
  CalendarPlus2,
  Calendar,
  CalendarCheck,
  CalendarCog,
  Sparkles,
} from "lucide-react";

import { NavMain } from "~/components/nav-main";
import { NavProjects } from "~/components/nav-projects";
import { NavUser } from "~/components/nav-user";
import { TeamSwitcher } from "~/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
  SidebarSeparator,
} from "~/components/ui/sidebar";
import { cn } from "~/lib/utils";
import { Link } from "react-router";

// This is sample data.
const data = {
  user: {
    name: "José F.",
    email: "josefelg@gmail.com",
    avatar: "/avatars/jose.png",
  },
  navMain: [
    {
      title: "Production",
      items: [
        {
          title: "About CSA",
          url: "/",
          icon: MessageCircleQuestionMark,
        },
        {
          title: "Current Allocation",
          url: "/allocation",
          icon: LandPlot,
        },
      ],
    },
    {
      title: "Subscription",
      items: [
        {
          title: "Manage Subscription",
          url: "/subscription",
          icon: CalendarCog,
        },
      ],
    },
    {
      title: "More",
      items: [
        {
          title: "AI Support",
          url: "/qa",
          icon: Sparkles,
        },
      ],
    },
    /*{
      title: "Administration",
      items: [{ title: "Dashboard", url: "/dashboard", icon: Gauge }],
    },*/
    /*{
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },*/
  ],
  /*projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],*/
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link to={"/"}>
          <img src="/assets/logo.svg" className={cn("w-full p-4")} />
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <NavMain groups={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
