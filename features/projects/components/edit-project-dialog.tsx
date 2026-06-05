"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { updateProjectSchema, UpdateProjectInput } from "../schemas/project.schema"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { updateProject } from "../actions/update-project"
import { toast } from "sonner"

interface EditProjectDialogProps {
    project: any;
    children: React.ReactElement;
}

export function EditProjectDialog({ project, children }: EditProjectDialogProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            projectId: project._id,
            name: project.name || "",
            description: project.description || "",
            industry: project.industry || [],
            audience: project.audience || [],
            tags: project.tags || [], 
        }
    });

    async function onSubmit(data: UpdateProjectInput) {
        try {
            const result = await updateProject(data);
            
            if (result.success) {
                toast.success("Project updated successfully");
                setIsOpen(false);
                router.refresh();
            } else {
                toast.error(result.error || "Failed to update project");
            }
        } catch (error) {
            console.error("Failed to update project", error);
            toast.error("An unexpected error occurred");
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger render={children} />

            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Project</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Project Name</Label>
                        <Input
                            id="name"
                            {...form.register("name")}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea 
                            id="description" 
                            {...form.register("description")} 
                        />
                    </div>
             
                    <div className="space-y-2">
                        <Label htmlFor="industry">Industry (comma separated)</Label>
                        <Input 
                            id="industry" 
                            {...form.register("industry", {
                                setValueAs: (value: any) => {
                                    if (typeof value === "string") {
                                        return value.split(",").map(v => v.trim()).filter(Boolean);
                                    }
                                    return Array.isArray(value) ? value : [];
                                }
                            })} 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="audience">Audience (comma separated)</Label>
                        <Input 
                            id="audience" 
                            {...form.register("audience", {
                                setValueAs: (value: any) => {
                                    if (typeof value === "string") {
                                        return value.split(",").map(v => v.trim()).filter(Boolean);
                                    }
                                    return Array.isArray(value) ? value : [];
                                }
                            })} 
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Tags (comma separated)</Label>
                        <Input 
                            id="tags" 
                            {...form.register("tags", {
                                setValueAs: (value: any) => {
                                    if (typeof value === "string") {
                                        return value.split(",").map(v => v.trim()).filter(Boolean);
                                    }
                                    return Array.isArray(value) ? value : [];
                                }
                            })} 
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
