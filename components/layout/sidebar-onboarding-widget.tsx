"use client"

import Link from "next/link"
import { useOnboardingState } from "@/lib/stores/onboarding-store"
import { CheckCircle2, Circle, Sparkles } from "lucide-react"
import { useSidebar } from "@/components/ui/sidebar"

export function SidebarOnboardingWidget() {
    const state = useOnboardingState();
    const { state: sidebarState } = useSidebar();

    if (!state) return null;

    const { projectId, projectName, onboarding } = state;
    const steps = [onboarding.loggedUpdate, onboarding.generatedContent, onboarding.savedContent];
    const completedCount = steps.filter(Boolean).length;

    // Hide when all steps are done
    if (completedCount === 3) return null;

    // When sidebar is collapsed, show minimal icon
    if (sidebarState === "collapsed") {
        return (
            <Link
                href={`/projects/${projectId}`}
                className="flex items-center justify-center py-2"
                title={`Getting Started: ${completedCount}/3`}
            >
                <div className="relative">
                    <Sparkles className="size-4 text-amber-500" />
                    <span className="absolute -top-1 -right-1.5 text-[9px] font-bold text-amber-500">
                        {completedCount}
                    </span>
                </div>
            </Link>
        );
    }

    return (
        <div className="px-3 py-3 space-y-3">
            <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs font-medium text-sidebar-foreground">
                    <Sparkles className="size-3 text-amber-500" />
                    Getting Started
                </span>
                <span className="text-xs font-semibold tabular-nums text-amber-500">
                    {completedCount}/3
                </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 w-full rounded-full bg-sidebar-accent overflow-hidden">
                <div
                    className="h-full rounded-full bg-amber-500 transition-all duration-500"
                    style={{ width: `${(completedCount / 3) * 100}%` }}
                />
            </div>

            {/* Steps */}
            <div className="space-y-1.5">
                {[
                    { label: "Log update", done: onboarding.loggedUpdate },
                    { label: "Generate content", done: onboarding.generatedContent },
                    { label: "Save content", done: onboarding.savedContent },
                ].map((step) => (
                    <div key={step.label} className="flex items-center gap-2">
                        {step.done ? (
                            <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                        ) : (
                            <Circle className="size-3 text-muted-foreground shrink-0" />
                        )}
                        <span className={`text-xs ${step.done ? "text-muted-foreground line-through" : "text-sidebar-foreground"}`}>
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Link back to project */}
            <Link
                href={`/projects/${projectId}`}
                className="text-xs text-primary hover:underline block truncate"
            >
                {projectName} →
            </Link>
        </div>
    );
}
