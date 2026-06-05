"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { generateContentSchema, GenerateContentInput } from "../schemas/content.schema"
import { generateContent } from "../actions/generate-content"
import { IDailyUpdate } from "@/features/daily-updates/models/dailyUpdate.interface"
import { Platform, Perspective, Tone, ContentLength } from "../models/content.interface"

interface GenerateContentFormProps {
    projectId: string;
    updates: (IDailyUpdate & { _id: string })[];
}

export function GenerateContentForm({ projectId, updates }: GenerateContentFormProps) {
    const router = useRouter();
    const [isGenerating, setIsGenerating] = useState(false);

    const form = useForm<GenerateContentInput>({
        resolver: zodResolver(generateContentSchema),
        defaultValues: {
            projectId: projectId,
            sourceUpdates: [],
            platform: Platform.LINKEDIN,
            perspective: Perspective.FIRST_PERSON,
            tone: Tone.PROFESSIONAL,
            contentLength: ContentLength.MEDIUM,
        },
    });

    async function onSubmit(data: GenerateContentInput) {
        setIsGenerating(true);
        const toastId = toast.loading("Generating variations...");
        try {
            const result = await generateContent(data);
            if (result.success && result.data) {
                // Save variations and form metadata to sessionStorage
                sessionStorage.setItem(`draftContent_${projectId}`, JSON.stringify({
                    variations: result.data,
                    metadata: data
                }));
                toast.success("Content generated successfully", { id: toastId });
                // Redirect to review page
                router.push(`/projects/${projectId}/review`);
            } else {
                console.error(result.message || result.error);
                toast.error(result.message || result.error || "Failed to generate content", { id: toastId });
            }
        } catch (error) {
            console.error("Failed to generate content", error);
            toast.error("Failed to generate content. See console for details.", { id: toastId });
        } finally {
            setIsGenerating(false);
        }
    }

    if (!updates || updates.length === 0) {
        return (
            <div className="p-8 border rounded-lg bg-card text-center space-y-4">
                <h3 className="text-xl font-semibold">Cannot generate content yet</h3>
                <p className="text-muted-foreground">
                    Please log at least one daily update before generating content.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-6 border rounded-lg bg-card">
            
            <div className="space-y-4">
                <h3 className="text-lg font-semibold tracking-tight">1. Select Updates to Include</h3>
                <div className="space-y-3">
                    {updates.map((update) => (
                        <div key={update._id} className="flex items-start space-x-3 p-3 border rounded-md">
                            <Checkbox 
                                id={update._id} 
                                checked={form.watch("sourceUpdates").includes(update._id)}
                                onCheckedChange={(checked) => {
                                    const current = form.watch("sourceUpdates");
                                    if (checked) {
                                        form.setValue("sourceUpdates", [...current, update._id]);
                                    } else {
                                        form.setValue("sourceUpdates", current.filter(id => id !== update._id));
                                    }
                                }}
                            />
                            <div className="grid gap-1.5 leading-none">
                                <label
                                    htmlFor={update._id}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                                >
                                    {new Date(update.createdAt).toLocaleDateString()}
                                </label>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {update.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                {form.formState.errors.sourceUpdates && (
                    <p className="text-sm text-destructive">
                        {form.formState.errors.sourceUpdates.message}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label>Platform</Label>
                    <Select 
                        onValueChange={(value) => form.setValue("platform", value as Platform)} 
                        value={form.watch("platform") || Platform.LINKEDIN}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(Platform).map(p => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Perspective</Label>
                    <Select 
                        onValueChange={(value) => form.setValue("perspective", value as Perspective)} 
                        value={form.watch("perspective") || Perspective.FIRST_PERSON}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select perspective" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(Perspective).map(p => (
                                <SelectItem key={p} value={p}>{p.replace('_', ' ')}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Tone</Label>
                    <Select 
                        onValueChange={(value) => form.setValue("tone", value as Tone)} 
                        value={form.watch("tone") || Tone.PROFESSIONAL}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select tone" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(Tone).map(t => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Length</Label>
                    <Select 
                        onValueChange={(value) => form.setValue("contentLength", value as ContentLength)} 
                        value={form.watch("contentLength") || ContentLength.MEDIUM}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select length" />
                        </SelectTrigger>
                        <SelectContent>
                            {Object.values(ContentLength).map(l => (
                                <SelectItem key={l} value={l}>{l}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="pt-4 border-t flex justify-end">
                <Button type="submit" disabled={isGenerating}>
                    {isGenerating ? "Generating Variations..." : "Generate Content"}
                </Button>
            </div>

        </form>
    );
}
