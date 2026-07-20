"use client"

import { ProjectHeader } from "./project-header"
import { UpdateList } from "@/features/daily-updates/components/update-list"
import { AddUpdateDialog } from "@/features/daily-updates/components/add-update-dialog"
import { ContentCanvas } from "@/features/content/components/content-canvas"
import { IProject } from "../models/project.interface"
import { IUserPreferences } from "@/features/auth/model/auth.interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutList, LayoutDashboard, Wand2 } from "lucide-react"
import { useEffect } from "react"
import { breadcrumbStore } from "@/lib/stores/breadcrumb-store"

interface ProjectTabsContainerProps {
    project: IProject & { _id: string };
    updates: any[];
    hasMoreUpdates: boolean;
    generateUpdates: any[];
    preferences?: IUserPreferences;
    limitReached: boolean;
    generationsUsed: number;
    generationsLimit: number;
}

export function ProjectTabsContainer({
    project,
    updates,
    hasMoreUpdates,
    generateUpdates,
    preferences,
    limitReached,
    generationsUsed,
    generationsLimit
}: ProjectTabsContainerProps) {
    useEffect(() => {
        breadcrumbStore.setTitle(project.name);
        return () => breadcrumbStore.setTitle(null);
    }, [project.name]);

    return (
        <Tabs defaultValue="overview" className="space-y-8">
            <div className="flex items-center w-full gap-4 lg:gap-6 border-b">
                <TabsList variant="line" className="w-full justify-start gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
                    <TabsTrigger value="overview" className="text-sm sm:text-base py-4">
                        <LayoutDashboard className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 mr-1.5" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="generate" className="text-sm sm:text-base py-4">
                        <Wand2 className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 mr-1.5" />
                        <span className="hidden sm:inline">Generate Content</span>
                        <span className="sm:hidden">Generate</span>
                    </TabsTrigger>
                    <TabsTrigger value="updates" className="text-sm sm:text-base py-4">
                        <LayoutList className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2 mr-1.5" />
                        Updates
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="overview">
                <div className="space-y-8 pb-12 animate-in fade-in duration-300">
                    <ProjectHeader project={project} />

                    {/* Future settings forms like Edit Project, Danger Zone, etc. can go here */}
                    <div className="bg-muted/30 border rounded-xl p-12 text-center text-muted-foreground max-w-2xl mx-auto mt-8">
                        <h3 className="font-medium text-foreground mb-2">Project Configuration</h3>
                        <p className="text-sm">Additional settings for your project will appear here.</p>
                    </div>
                </div>
            </TabsContent>

            <TabsContent value="generate">
                <div className="pb-10 min-h-[calc(100vh-10rem)] animate-in fade-in duration-300">
                    <ContentCanvas
                        projectId={project._id}
                        updates={generateUpdates}
                        preferences={preferences}
                        limitReached={limitReached}
                        generationsUsed={generationsUsed}
                        generationsLimit={generationsLimit}
                    />
                </div>
            </TabsContent>

            <TabsContent value="updates">
                <div className="space-y-8 pb-12 animate-in fade-in duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-10 border-b">
                        <div className="space-y-3 max-w-3xl">
                            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Recent Updates</h2>
                            <p className="text-base text-muted-foreground leading-relaxed">Log what you worked on today.</p>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <AddUpdateDialog projectId={project._id} />
                        </div>
                    </div>

                    <UpdateList
                        initialUpdates={updates}
                        projectId={project._id}
                        initialHasMore={hasMoreUpdates}
                    />
                </div>
            </TabsContent>
        </Tabs>
    )
}
