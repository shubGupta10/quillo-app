"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowLeft, Settings, LayoutList, Wand2 } from "lucide-react"

export type ProjectTab = "overview" | "generate" | "updates";

interface ProjectNavProps {
    projectName: string;
    activeTab: ProjectTab;
    onTabChange: (tab: ProjectTab) => void;
}

export function ProjectNav({ projectName, activeTab, onTabChange }: ProjectNavProps) {
    const tabs: { id: ProjectTab; name: string; icon: any }[] = [
        {
            id: "overview",
            name: "Overview",
            icon: Settings,
        },
        {
            id: "generate",
            name: "Generate Content",
            icon: Wand2,
        },
        {
            id: "updates",
            name: "Updates",
            icon: LayoutList,
        }
    ];

    return (
        <div className="shrink-0 sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b -mx-6 px-6 lg:-mx-10 lg:px-10 -mt-6 lg:-mt-8">
            <div className="flex items-end pt-1 lg:pt-2">
                <Link 
                    href="/projects" 
                    className="flex items-center justify-center p-2 mr-4 mb-2 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer" 
                    aria-label="Back to Projects"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>

                <nav className="flex flex-1 items-center space-x-6 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={cn(
                                    "flex items-center gap-2 pb-3 text-base font-medium border-b-[3px] transition-colors whitespace-nowrap cursor-pointer",
                                    isActive 
                                        ? "border-primary text-foreground" 
                                        : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground/30"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {tab.name}
                            </button>
                        );
                    })}
                </nav>
            </div>
        </div>
    )
}
