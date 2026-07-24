"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";

const ProjectDialog = dynamic(
    () => import("@/features/projects/components/project-dailog").then((m) => m.ProjectDialog),
    {
        ssr: false,
        loading: () => <Button disabled className="opacity-70">New Project</Button>,
    }
);

export function HeaderActions() {
    const pathname = usePathname();

    // Show the New Project button on the dashboard and projects pages
    if (pathname === "/dashboard" || pathname === "/projects") {
        return <ProjectDialog />;
    }

    return null;
}
