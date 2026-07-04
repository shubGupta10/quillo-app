"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { createProjectSchema, CreateProjectInput } from "../schemas/project.schema"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { createProject } from "../actions/create-project"
import { toast } from "sonner"

export function ProjectDialog() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            name: "",
            description: "",
            industry: [],
            audience: [],
            tags: [], 
        }
    });

    async function onSubmit(data: CreateProjectInput) {
        try {
            const result = await createProject(data);
            
            if (result.success && result.data) {
                toast.success("Project created successfully");
                setIsOpen(false);
                form.reset();
                router.push(`/projects/${result.data._id}`);
            } else {
                console.error(result.error);
                toast.error(result.error || "Failed to create project");
            }
        } catch (error) {
            console.error("Failed to create project", error);
            toast.error("An unexpected error occurred");
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} disablePointerDismissal>
            <DialogTrigger render={<Button>New Project</Button>} />

            <DialogContent 
                className="sm:max-w-[850px] max-h-[90vh] overflow-y-auto p-8"
            >
                <button type="button" className="sr-only" />
                <DialogHeader>
                    <DialogTitle className="text-2xl">Create Project</DialogTitle>
                    <DialogDescription>
                        Add details about your new project to start generating content.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
                        {/* Left Column: Shorter Fields */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium">Project Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Quillo"
                                    {...form.register("name")}
                                />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="industry" className="text-sm font-medium">Industry (comma separated)</Label>
                                <Input 
                                    id="industry" 
                                    placeholder="e.g. SaaS, AI, Marketing" 
                                    {...form.register("industry", {
                                        setValueAs: (value: any) => {
                                            if (typeof value === "string") {
                                                return value.split(",").map(v => v.trim()).filter(Boolean);
                                            }
                                            return Array.isArray(value) ? value : [];
                                        }
                                    })} 
                                />
                                {form.formState.errors.industry && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.industry.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="audience" className="text-sm font-medium">Audience (comma separated)</Label>
                                <Input 
                                    id="audience" 
                                    placeholder="e.g. Developers, Marketers" 
                                    {...form.register("audience", {
                                        setValueAs: (value: any) => {
                                            if (typeof value === "string") {
                                                return value.split(",").map(v => v.trim()).filter(Boolean);
                                            }
                                            return Array.isArray(value) ? value : [];
                                        }
                                    })} 
                                />
                                {form.formState.errors.audience && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.audience.message}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tags" className="text-sm font-medium">Tags (comma separated)</Label>
                                <Input 
                                    id="tags" 
                                    placeholder="e.g. Nextjs, Tailwind" 
                                    {...form.register("tags", {
                                        setValueAs: (value: any) => {
                                            if (typeof value === "string") {
                                                return value.split(",").map(v => v.trim()).filter(Boolean);
                                            }
                                            return Array.isArray(value) ? value : [];
                                        }
                                    })} 
                                />
                                {form.formState.errors.tags && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.tags.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Right Column: Description */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                            <Textarea 
                                id="description" 
                                placeholder="What does this project do?"
                                className="h-[340px] resize-none overflow-y-auto"
                                {...form.register("description")} 
                            />
                            {form.formState.errors.description && (
                                <p className="text-sm text-destructive">
                                    {form.formState.errors.description.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t">
                        <Button type="button" variant="outline" className="cursor-pointer" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="cursor-pointer" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Creating..." : "Create Project"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
