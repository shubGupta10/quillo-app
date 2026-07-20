"use client";

import { useEffect } from "react";
import { breadcrumbStore } from "@/lib/stores/breadcrumb-store";

export function BreadcrumbSetter({ title }: { title: string }) {
    useEffect(() => {
        breadcrumbStore.setTitle(title);
        return () => breadcrumbStore.setTitle(null);
    }, [title]);

    return null;
}
