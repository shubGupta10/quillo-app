import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NavItems } from "./nav-items";
import { NavUser } from "../nav-user";

export async function AppSidebar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/dashboard" />}>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="font-bold text-sm">Q</span>
              </div>
              <span className="font-semibold">Quillo</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-1">
        <NavItems />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        {session?.user ? (
          <NavUser user={{ name: session.user.name ?? "User", email: session.user.email ?? "", avatar: session.user.image ?? "" }} />
        ) : (
          <div className="px-2 py-2">
            <Link href="/sign-in" className="text-sm text-sidebar-foreground hover:underline">
              Sign in
            </Link>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
