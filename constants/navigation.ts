import { LayoutDashboard, FolderKanban, FileText, Settings, Star, CreditCard, User, Calendar } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon?: any;
  disabled?: boolean;
}

export const dashboardNavigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Content",
    href: "/content",
    icon: FileText,
  },
  {
    title: "Schedule",
    href: "/schedule",
    icon: Calendar,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const marketingNavigation: NavItem[] = [
  {
    title: "Features",
    href: "/#features",
    icon: Star,
  },
  {
    title: "Testimonials",
    href: "/#testimonials",
    icon: Star,
  },
];
