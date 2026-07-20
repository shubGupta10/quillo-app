"use client"

import { usePathname } from "next/navigation"
import { useBreadcrumbTitle } from "@/lib/stores/breadcrumb-store"
import Link from "next/link"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const dynamicTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/projects": "Projects",
  "/content": "Content",
  "/schedule": "Schedule",
  "/settings": "Settings",
  "/profile": "Profile",
}

export function PageTitle() {
  const pathname = usePathname()
  const customTitle = useBreadcrumbTitle()

  // Exact match first
  if (dynamicTitles[pathname]) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{dynamicTitles[pathname]}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  // Sub-pages: find the closest parent
  const match = Object.entries(dynamicTitles)
    .filter(([path]) => pathname.startsWith(path + "/"))
    .sort((a, b) => b[0].length - a[0].length)[0]

  if (match) {
    const parentPath = match[0]
    const parentName = match[1]

    // If we have a custom title from the store (like a Project Name), show Breadcrumbs
    if (customTitle) {
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href={parentPath} />}>{parentName}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{customTitle}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )
    }

    // Fallback if no custom title is provided but it's a subpage
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{parentName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return null
}
