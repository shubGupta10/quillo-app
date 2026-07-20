"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardNavigation } from "@/constants/navigation";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function NavItems() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarMenu className="gap-1">
      {dashboardNavigation.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              isActive={isActive}
              tooltip={item.title}
              render={<Link href={item.href} prefetch={true} onClick={() => setOpenMobile(false)} />}
              className={isActive ? "text-primary font-medium" : ""}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export function NavUserFooter({ user }: { user: { name?: string | null; email?: string | null; image?: string | null } }) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  const initials = user.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div className="flex items-center justify-between gap-2 px-2 py-2">
      <div className="flex items-center gap-2 min-w-0">
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
          {initials}
        </div>
        <span className="truncate text-sm font-medium text-sidebar-foreground">
          {user.name || "User"}
        </span>
      </div>
      <button
        onClick={handleLogout}
        className="shrink-0 rounded-md p-1.5 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        title="Log out"
      >
        <LogOut className="h-4 w-4" />
      </button>
    </div>
  );
}
