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
import { useTransition } from "react"

interface EditProjectDialogProps {
    project: any;
    children: React.ReactElement;
}

export function EditProjectDialog({ project, children }: EditProjectDialogProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();

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
        setIsOpen(false);
        toast.success("Saving changes...");

        startTransition(async () => {
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
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger render={children} />

            <DialogContent className="sm:max-w-[850px] max-h-[90vh] overflow-y-auto p-8">
                {/* Visually hidden button to catch Base UI's auto-focus and prevent the orange ring */}
                <button type="button" className="sr-only" />
                <DialogHeader>
                    <DialogTitle className="text-2xl">Edit Project</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                        {/* Left Column: Shorter Fields */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">Project Name</Label>
                                <Input
                                    id="name"
                                    {...form.register("name")}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="industry" className="text-sm font-medium">Industry (comma separated)</Label>
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
                                <Label htmlFor="audience" className="text-sm font-medium">Audience (comma separated)</Label>
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
                                <Label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</Label>
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
                        </div>

                        {/* Right Column: Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                            <Textarea
                                id="description"
                                className="h-[340px] resize-none overflow-y-auto"
                                {...form.register("description")}
                            />
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t">
                        <Button type="button" variant="outline" className="cursor-pointer" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="cursor-pointer" disabled={form.formState.isSubmitting || isPending}>
                            {form.formState.isSubmitting || isPending ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
