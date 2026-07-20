"use client"

import { AddUpdateDialog } from "@/features/daily-updates/components/add-update-dialog";
import { ProjectHeaderActions } from "./project-header-actions";
import { IProject } from "../models/project.interface";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ProjectHeaderProps {
    project: IProject & { _id: string }
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <div className="space-y-8 pb-10 border-b">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="space-y-3 max-w-3xl">
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">{project.name}</h1>
                    <div className="space-y-2">
                        <p
                            className={`text-muted-foreground leading-relaxed transition-all duration-200 ${isExpanded ? "" : "line-clamp-3"
                                }`}
                        >
                            {project.description}
                        </p>

                        {project.description.length > 150 && (
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-sm font-medium text-primary hover:underline transition-colors cursor-pointer inline-block mt-1"
                            >
                                {isExpanded ? "Show Less" : "Show More"}
                            </button>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                    <AddUpdateDialog projectId={project._id} />
                    <ProjectHeaderActions project={project} />
                </div>
            </div>

            {/* Metadata Tags */}
            <div className="flex flex-wrap gap-x-10 gap-y-6 pt-2">
                {project.industry && project.industry.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider">Industry</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.industry.map((ind, i) => (
                                <Badge key={i} variant="secondary" className="font-normal rounded-md">{ind}</Badge>
                            ))}
                        </div>
                    </div>
                )}
                {project.audience && project.audience.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider">Audience</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.audience.map((aud, i) => (
                                <Badge key={i} variant="secondary" className="font-normal rounded-md">{aud}</Badge>
                            ))}
                        </div>
                    </div>
                )}
                {project.tags && project.tags.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-[13px] font-medium text-muted-foreground uppercase tracking-wider">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="font-normal rounded-md">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}