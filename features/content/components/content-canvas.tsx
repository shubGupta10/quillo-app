"use client"

import { useState, useRef } from "react"
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
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { generateContentSchema, GenerateContentInput, SaveContentInput } from "../schemas/content.schema"
import { generateContent } from "../actions/generate-content"
import { saveContent } from "../actions/save-content"
import { IDailyUpdate } from "@/features/daily-updates/models/dailyUpdate.interface"
import { Platform, Perspective, Tone, ContentLength } from "../models/content.interface"

import { IUserPreferences } from "@/features/auth/model/auth.interface"
import { Loader2, RefreshCcw } from "lucide-react"
import { ClientDate } from "@/components/ui/client-date"

interface ContentCanvasProps {
    projectId: string;
    updates: (IDailyUpdate & { _id: string })[];
    preferences?: IUserPreferences;
    limitReached?: boolean;
    generationsUsed?: number;
    generationsLimit?: number;
}

export function ContentCanvas({ projectId, updates, preferences, limitReached = false, generationsUsed = 0, generationsLimit }: ContentCanvasProps) {
    const router = useRouter();
    const [isGenerating, setIsGenerating] = useState(false);
    const [isUpdatesModalOpen, setIsUpdatesModalOpen] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);

    // Canvas State
    const [draftData, setDraftData] = useState<{
        variations: { title: string, content: string, contentProfile?: any }[],
        metadata: GenerateContentInput
    } | null>(null);
    const [savingIndex, setSavingIndex] = useState<number | null>(null);

    const form = useForm<GenerateContentInput>({
        resolver: zodResolver(generateContentSchema),
        defaultValues: {
            projectId: projectId,
            sourceUpdates: [],
            platform: (preferences?.defaultPlatform as Platform) || Platform.LINKEDIN,
            perspective: (preferences?.defaultPerspective as Perspective) || Perspective.FIRST_PERSON,
            tone: (preferences?.defaultTone as Tone) || Tone.PROFESSIONAL,
            contentLength: (preferences?.defaultLength as ContentLength) || ContentLength.MEDIUM,
        },
    });

    async function onSubmit(data: GenerateContentInput) {
        setIsGenerating(true);
        // Clear previous variations when generating new ones
        setDraftData(null);

        setTimeout(() => {
            canvasRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
        const toastId = toast.loading("Generating variations...");
        try {
            const result = await generateContent(data);
            if (result.success && result.data) {
                setDraftData({
                    variations: result.data,
                    metadata: data
                });
                toast.success("Content generated successfully", { id: toastId });
            } else {
                toast.error(result.message || result.error || "Failed to generate content", { id: toastId });
            }
        } catch (error) {
            console.error("Failed to generate content", error);
            toast.error("Failed to generate content.", { id: toastId });
        } finally {
            setIsGenerating(false);
        }
    }

    async function handleRegenerate() {
        if (!draftData) return;
        setIsGenerating(true);
        const toastId = toast.loading("Regenerating variations...");
        try {
            const result = await generateContent(draftData.metadata);
            if (result.success && result.data) {
                setDraftData({
                    variations: result.data,
                    metadata: draftData.metadata
                });
                toast.success("Content regenerated successfully", { id: toastId });
            } else {
                toast.error(result.message || result.error || "Failed to regenerate content", { id: toastId });
            }
        } catch (error) {
            toast.error("Failed to regenerate content.", { id: toastId });
        } finally {
            setIsGenerating(false);
        }
    }

    async function handleSave(variation: { title: string, content: string, contentProfile?: any }, index: number) {
        if (!draftData) return;
        setSavingIndex(index);

        const payload: SaveContentInput = {
            ...draftData.metadata,
            title: variation.title,
            content: variation.content,
            contentProfile: variation.contentProfile,
        };

        try {
            const result = await saveContent(payload);
            if (result.success && result.data) {
                toast.success("Content saved to library");
                router.refresh();
                router.push(`/content/${result.data._id}`);
            } else {
                toast.error("Failed to save content: " + (result.error || "Unknown error"));
                setSavingIndex(null);
            }
        } catch (error) {
            toast.error("Failed to save content.");
            setSavingIndex(null);
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
        <div className="flex flex-col gap-16 pb-16">

            {/* Top View: Settings & Input */}
            <div className="flex flex-col space-y-8">
                <div className="space-y-3 max-w-3xl pb-10 border-b">
                    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">Generate Content</h2>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-xl">Select your recent updates and configure the style. Our AI will craft multiple variations of your post.</p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                    {/* 1. Source Updates */}
                    <div className="space-y-6 p-8 lg:p-10 border rounded-lg bg-card shadow-sm flex flex-col">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold tracking-tight">Source Updates</h3>
                            {updates.length > 3 && (
                                <Dialog open={isUpdatesModalOpen} onOpenChange={setIsUpdatesModalOpen}>
                                    <DialogTrigger render={<Button variant="link" className="px-0 text-primary h-auto py-0 hover:underline text-xs" />}>
                                        View all {updates.length}
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[650px] max-h-[85vh] overflow-y-auto p-8">
                                        <button type="button" className="sr-only" />
                                        <DialogHeader>
                                            <DialogTitle className="text-xl">Select Updates</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-3 mt-4">
                                            {updates.map((update) => (
                                                <label key={update._id} htmlFor={`modal-${update._id}`} className="flex items-start space-x-3 p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                                                    <Checkbox
                                                        id={`modal-${update._id}`}
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
                                                    <div className="grid gap-1.5 leading-none flex-1">
                                                        <span className="text-sm font-medium leading-none">
                                                            <ClientDate date={update.createdAt} options={{ year: 'numeric', month: 'numeric', day: 'numeric' }} />
                                                        </span>
                                                        <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                                                            {update.content}
                                                        </p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                        <div className="pt-6 border-t mt-4 flex justify-end">
                                            <Button type="button" onClick={() => setIsUpdatesModalOpen(false)}>
                                                Done
                                            </Button>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </div>

                        <div className="space-y-3">
                            {updates.slice(0, 3).map((update) => (
                                <label
                                    key={update._id}
                                    htmlFor={`inline-${update._id}`}
                                    className="relative flex flex-col p-4 border rounded-lg hover:border-primary/50 cursor-pointer bg-background transition-all has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:ring-1 has-[[data-state=checked]]:ring-primary has-[[data-state=checked]]:bg-primary/5"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="text-xs font-medium text-muted-foreground">
                                            <ClientDate date={update.createdAt} options={{ year: 'numeric', month: 'short', day: 'numeric' }} />
                                        </span>
                                        <Checkbox
                                            id={`inline-${update._id}`}
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
                                    </div>
                                    <p className="text-sm leading-relaxed text-foreground line-clamp-3">
                                        {update.content}
                                    </p>
                                </label>
                            ))}
                        </div>
                        {form.formState.errors.sourceUpdates && (
                            <p className="text-xs text-destructive mt-2">
                                {form.formState.errors.sourceUpdates.message}
                            </p>
                        )}
                    </div>

                    {/* Right: Configuration & Generate */}
                    <div className="p-8 lg:p-10 border rounded-2xl bg-card shadow-sm flex flex-col">
                        <div className="space-y-8">
                            <h3 className="text-base font-semibold tracking-tight">Configuration</h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                                <div className="flex flex-col gap-3">
                                    <Label className="text-sm font-medium text-muted-foreground">Platform</Label>
                                    <Select
                                        onValueChange={(value) => form.setValue("platform", value as Platform)}
                                        value={form.watch("platform") || Platform.LINKEDIN}
                                    >
                                        <SelectTrigger className="w-full h-11 text-base">
                                            <SelectValue placeholder="Select platform" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {Object.values(Platform).map(p => (
                                                    <SelectItem key={p} value={p}>{p}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Label className="text-sm font-medium text-muted-foreground">Perspective</Label>
                                    <Select
                                        onValueChange={(value) => form.setValue("perspective", value as Perspective)}
                                        value={form.watch("perspective") || Perspective.FIRST_PERSON}
                                    >
                                        <SelectTrigger className="w-full h-11 text-base">
                                            <SelectValue placeholder="Select perspective" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {Object.values(Perspective).map(p => (
                                                    <SelectItem key={p} value={p}>{p.replace('_', ' ')}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Label className="text-sm font-medium text-muted-foreground">Tone</Label>
                                    <Select
                                        onValueChange={(value) => form.setValue("tone", value as Tone)}
                                        value={form.watch("tone") || Tone.PROFESSIONAL}
                                    >
                                        <SelectTrigger className="w-full h-11 text-base">
                                            <SelectValue placeholder="Select tone" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {Object.values(Tone).map(t => (
                                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Label className="text-sm font-medium text-muted-foreground">Length</Label>
                                    <Select
                                        onValueChange={(value) => form.setValue("contentLength", value as ContentLength)}
                                        value={form.watch("contentLength") || ContentLength.MEDIUM}
                                    >
                                        <SelectTrigger className="w-full h-11 text-base">
                                            <SelectValue placeholder="Select length" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {Object.values(ContentLength).map(l => (
                                                    <SelectItem key={l} value={l}>{l}</SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 space-y-4">
                            {limitReached && (
                                <div className="flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                                    You&apos;ve used all <strong>{generationsLimit}</strong> generations for this month.
                                </div>
                            )}
                            <Button type="submit" disabled={isGenerating || limitReached} className="w-full text-base">
                                {isGenerating ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Generating...</>
                                ) : (
                                    "Generate Variations"
                                )}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            {/* Bottom View: Canvas / Preview */}
            <div ref={canvasRef} className="bg-card border rounded-lg overflow-hidden min-h-[600px] lg:min-h-[calc(100vh-8rem)] flex flex-col scroll-mt-24 shadow-sm">
                <div className="border-b bg-muted/30 px-6 py-4 flex items-center justify-between">
                    <div>
                        <h2 className="font-medium">Canvas</h2>
                        <p className="text-xs text-muted-foreground mt-0.5">Preview and refine your generated content</p>
                    </div>
                    {draftData && (
                        <Button
                            variant="outline"
                            onClick={handleRegenerate}
                            disabled={isGenerating || savingIndex !== null}
                        >
                            <RefreshCcw className={`h-3.5 w-3.5 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                            Regenerate
                        </Button>
                    )}
                </div>

                <div className="p-6 lg:p-10 flex-1 flex flex-col bg-muted/10">
                    {isGenerating && !draftData ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground space-y-4 animate-in fade-in duration-500">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            <p>Crafting your post variations...</p>
                        </div>
                    ) : !draftData ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-2">
                            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-2">
                                <span className="text-2xl">✨</span>
                            </div>
                            <h3 className="font-medium text-lg">Ready to create</h3>
                            <p className="text-muted-foreground text-sm max-w-sm">
                                Configure your settings on the left and click generate to see AI-crafted variations here.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-12 animate-in slide-in-from-bottom-4 fade-in duration-500">
                            {draftData.variations.map((variation, index) => (
                                <div key={index} className="space-y-4">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <h2 className="text-xl font-semibold">Option {index + 1}</h2>
                                        <Button
                                            onClick={() => handleSave(variation, index)}
                                            disabled={savingIndex !== null}
                                        >
                                            {savingIndex === index ? (
                                                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
                                            ) : "Save this version"}
                                        </Button>
                                    </div>

                                    <div className="p-6 sm:p-8 bg-background border rounded-lg shadow-sm space-y-4 relative group">
                                        {variation.title && variation.title.trim() !== "" && (
                                            <h3 className="text-lg font-medium">{variation.title}</h3>
                                        )}
                                        <div className="whitespace-pre-wrap text-base leading-relaxed text-foreground">
                                            {variation.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
