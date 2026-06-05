import { AddUpdateDialog } from "@/features/daily-updates/components/add-update-dialog";
import { ProjectHeaderActions } from "./project-header-actions";
import { IProject } from "../models/project.interface";
import { Badge } from "@/components/ui/badge";

interface ProjectHeaderProps {
    project: IProject & { _id: string}
}

export function ProjectHeader({ project}: ProjectHeaderProps){
    return (
        <div className="space-y-6 pb-8 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-semibold tracking-tight">{project.name}</h1>
                    <p className="text-muted-foreground">{project.description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <AddUpdateDialog projectId={project._id} />
                    <ProjectHeaderActions project={project} />
                </div>
            </div>
            
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm">
                
                {project.industry && project.industry.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-muted-foreground font-medium">Industry</span>
                        <div className="flex flex-wrap gap-2">
                            {project.industry.map((ind, i) => (
                                <Badge key={i} variant="secondary">{ind}</Badge>
                            ))}
                        </div>
                    </div>
                )}
                {project.audience && project.audience.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-muted-foreground font-medium">Audience</span>
                        <div className="flex flex-wrap gap-2">
                            {project.audience.map((aud, i) => (
                                <Badge key={i} variant="secondary">{aud}</Badge>
                            ))}
                        </div>
                    </div>
                )}
                {project.tags && project.tags.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-muted-foreground font-medium">Tags</span>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                )}
                
            </div>
        </div>
    );
}