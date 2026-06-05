"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditProjectDialog } from "./edit-project-dialog";
import { deleteProject } from "../actions/delete-project";
import { useRouter } from "next/navigation";
import { Trash2, Edit2 } from "lucide-react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ProjectHeaderActionsProps {
    project: any;
}

export function ProjectHeaderActions({ project }: ProjectHeaderActionsProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async () => {
        const res = await deleteProject(project._id);
        if (res.success) {
            toast.success("Project deleted successfully");
            setIsOpen(false);
            router.push("/projects");
            router.refresh();
        } else {
            toast.error("Failed to delete project");
        }
    };

    return (
        <div className="flex items-center gap-2">
            <EditProjectDialog project={project}>
                <Button variant="outline" size="sm" className="h-9">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                </Button>
            </EditProjectDialog>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger render={
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-9 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                } />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Project?</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-muted-foreground">
                        This action cannot be undone. Are you sure you want to delete this project?
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button variant="default" onClick={handleDelete}>Delete</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
