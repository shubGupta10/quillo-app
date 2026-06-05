"use client";

import { usePathname } from "next/navigation";
import { ProjectDailog } from "@/features/projects/components/project-dailog";

export function HeaderActions() {
    const pathname = usePathname();

    // Show the New Project button on the dashboard and projects pages
    if (pathname === "/dashboard" || pathname === "/projects") {
        return <ProjectDailog />;
    }

    return null;
}
