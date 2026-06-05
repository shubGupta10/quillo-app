"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";


export function useThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  const toggleTheme = (event: React.MouseEvent) => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    const isDark = currentTheme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  };

  return toggleTheme;
}

export function ThemeToggle() {
  const toggleTheme = useThemeToggle();
  return (
    <DropdownMenuItem onClick={toggleTheme} className="cursor-pointer">
      <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span>Toggle theme</span>
    </DropdownMenuItem>
  );
}


