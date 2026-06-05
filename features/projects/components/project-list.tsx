"use client"

import { IProject } from "../models/project.interface"
import { ProjectCard } from "./project-card"
import { ProjectDailog } from "./project-dailog"

interface ProjectListProps {
    projects: (IProject & { _id: string })[]
}

export function ProjectList({ projects }: ProjectListProps) {
    if (!projects || projects.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-card min-h-[300px]">
                <h3 className="text-xl font-semibold tracking-tight">No projects found</h3>
                <p className="text-muted-foreground mt-2 mb-6">
                    Create your first project to get started with content generation.
                </p>
                <ProjectDailog />
            </div>
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