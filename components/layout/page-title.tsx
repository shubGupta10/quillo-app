"use client"

import { usePathname } from "next/navigation"
import { dashboardNavigation } from "@/constants/navigation"

const dynamicTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/content": "Content",
  "/settings": "Settings",
  "/profile": "Profile",
}

export function PageTitle() {
  const pathname = usePathname()

  // Exact match first
  if (dynamicTitles[pathname]) {
    return (
      <span className="text-sm font-medium text-foreground">
        {dynamicTitles[pathname]}
      </span>
    )
  }

  // Sub-pages: find the closest parent
  const match = Object.entries(dynamicTitles)
    .filter(([path]) => pathname.startsWith(path + "/"))
    .sort((a, b) => b[0].length - a[0].length)[0]

  if (match) {
    return (
      <span className="text-sm font-medium text-foreground">
        {match[1]}
      </span>
    )
  }

  return null
}
