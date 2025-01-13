import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Network,
  Contact,
  HandCoins,
  CalendarDays,
  Blocks,
  BadgeHelp,
  ChartColumnBig,
} from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavProjects } from "./nav-projects";
import supabase from "@/helpers/SupabaseAuth";
import { useEffect, useState } from "react";

// SIDEBAR LINKS
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Referrals",
      url: "#",
      icon: Network,
      isActive: true,
      items: [
        {
          title: "Campaigns",
          url: "referrals/campaigns",
        },
        {
          title: "Pending referrals",
          url: "referrals/pending",
        },
        {
          title: "Archived referrals",
          url: "referrals/archived",
        },
      ],
    },
    {
      title: "Clients",
      url: "clients",
      icon: Contact,
    },
    {
      title: "Rewards",
      url: "rewards",
      icon: HandCoins,
    },
    {
      title: "Appointments",
      url: "appointments",
      icon: CalendarDays,
    },
    {
      title: "Integrations",
      url: "integrations",
      icon: Blocks,
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartColumnBig,
      items: [
        {
          title: "Referral reports",
          url: "analytics/referrals",
        },
        {
          title: "Client reports",
          url: "analytics/clients",
        },
      ],
    },
    {
      title: "Support",
      url: "#",
      icon: BadgeHelp,
      items: [
        {
          title: "Contact",
          url: "support/contact",
        },
        {
          title: "FAQ",
          url: "support/faq",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Personal Care & Wellness",
      url: "#",
      icon: BadgeHelp,
    },
    {
      name: "Home & Lifestyle Services",
      url: "#",
      icon: BadgeHelp,
    },
    {
      name: "Education",
      url: "#",
      icon: BadgeHelp,
    },
    {
      name: "Professional Services",
      url: "#",
      icon: BadgeHelp,
    },
    {
      name: "Niche Businesses",
      url: "#",
      icon: BadgeHelp,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
      } else if (data?.user) {
        setUser({
          name: data.user.user_metadata?.full_name || data.user.email || "User",
          email: data.user.email || "",
        });
      }
    };

    fetchUser();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: user.name,
            email: user.email,
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
