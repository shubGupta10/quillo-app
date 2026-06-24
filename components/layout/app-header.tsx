"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { PageTitle } from "./page-title";
import { HeaderActions } from "./header-actions";
import { useThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function AppHeader() {
  const toggleTheme = useThemeToggle();

  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b bg-background px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="w-px h-4 bg-border" />
      <PageTitle />
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        {/* <HeaderActions /> */}
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="cursor-pointer" aria-label="Toggle theme">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
      </div>
    </header>
  );
}
