"use client"

import { IProject } from "../models/project.interface"
import { ProjectCard } from "./project-card"
import { ProjectDailog } from "./project-dailog"
import { EmptyState } from "@/components/ui/empty-state"
import { FolderOpen } from "lucide-react"

interface ProjectListProps {
    projects: (IProject & { _id: string })[]
}

export function ProjectList({ projects }: ProjectListProps) {
    if (!projects || projects.length === 0) {
        return (
            <EmptyState
                icon={FolderOpen}
                title="No projects found"
                description="Create your first project to get started with content generation."
            >
                <ProjectDailog />
            </EmptyState>
        )
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
            {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
            ))}
        </div>
    )
}