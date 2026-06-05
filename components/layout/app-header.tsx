import { SidebarTrigger } from "@/components/ui/sidebar";
import { PageTitle } from "./page-title";
import { HeaderActions } from "./header-actions";

export function AppHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="w-px h-4 bg-border" />
      <PageTitle />
      <div className="flex-1" />
      <HeaderActions />
    </header>
  );
}
