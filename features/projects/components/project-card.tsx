import Link from "next/link";
import { IProject } from "../models/project.interface";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileText } from "lucide-react";

interface ProjectCardProps {
    project: IProject & { _id: string; updatesCount?: number; contentCount?: number };
}

function getRelativeTime(date: Date) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const daysDifference = Math.round((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    
    if (Math.abs(daysDifference) < 1) {
        return "today";
    } else if (Math.abs(daysDifference) === 1) {
        return "yesterday";
    } else if (Math.abs(daysDifference) < 7) {
        return rtf.format(daysDifference, 'day');
    } else {
        return date.toLocaleDateString();
    }
}

export function ProjectCard({ project }: ProjectCardProps) {
    const updates = project.updatesCount || 0;
    const posts = project.contentCount || 0;
    
    return (
        <Link 
            href={`/projects/${project._id}`}
            className="group flex flex-col p-6 border rounded-lg bg-card hover:border-primary/50 hover:shadow-sm transition-all h-full"
        >
            <div className="space-y-1 mb-4">
                <h3 className="text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {project.name}
                </h3>
                <p className="text-muted-foreground line-clamp-2 text-sm">
                    {project.description}
                </p>
            </div>
            
            <div className="mt-auto pt-4 space-y-1 border-t border-border/50">
                <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    {updates} {updates === 1 ? 'update' : 'updates'} <span className="text-muted-foreground">&bull;</span> {posts} {posts === 1 ? 'post' : 'posts'}
                </p>
                <p className="text-xs text-muted-foreground">
                    Updated {getRelativeTime(new Date(project.updatedAt))}
                </p>
            </div>

            {project.industry && project.industry.length > 0 && (
                <div className="mt-4">
                    <Badge variant="secondary" className="font-normal text-[10px] h-5">
                        {project.industry[0]}
                    </Badge>
                </div>
            )}
        </Link>
    );
}