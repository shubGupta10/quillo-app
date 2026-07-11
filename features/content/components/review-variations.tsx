"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, RefreshCcw } from "lucide-react"
import { saveContent } from "../actions/save-content"
import { generateContent } from "../actions/generate-content"
import { SaveContentInput } from "../schemas/content.schema"
import { toast } from "sonner"

interface ReviewVariationsProps {
    projectId: string;
}

export function ReviewVariations({ projectId }: ReviewVariationsProps) {
    const router = useRouter();
    const [draftData, setDraftData] = useState<{
        variations: { title: string, content: string }[],
        metadata: any
    } | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [savingIndex, setSavingIndex] = useState<number | null>(null);
    const [isRegenerating, setIsRegenerating] = useState(false);

    useEffect(() => {
        const stored = sessionStorage.getItem(`draftContent_${projectId}`);
        if (!stored) {
            // No draft found (direct URL access or already saved), kick back to project
            router.replace(`/projects/${projectId}`);
            return;
        }

        try {
            const parsed = JSON.parse(stored);
            if (!parsed.variations || !parsed.metadata) throw new Error("Invalid draft structure");
            setDraftData(parsed);
        } catch (error) {
            router.replace(`/projects/${projectId}`);
        } finally {
            setIsLoaded(true);
        }
    }, [projectId, router]);

    async function handleRegenerate() {
        if (!draftData) return;
        setIsRegenerating(true);
        const toastId = toast.loading("Regenerating variations...");
        try {
            const result = await generateContent(draftData.metadata);
            if (result.success && result.data) {
                const newData = {
                    variations: result.data,
                    metadata: draftData.metadata
                };
                sessionStorage.setItem(`draftContent_${projectId}`, JSON.stringify(newData));
                setDraftData(newData);
                toast.success("Content regenerated successfully", { id: toastId });
            } else {
                toast.error(result.message || result.error || "Failed to regenerate content", { id: toastId });
            }
        } catch (error) {
            toast.error("Failed to regenerate content.", { id: toastId });
        } finally {
            setIsRegenerating(false);
        }
    }

    async function handleSave(variation: {title: string, content: string}, index: number) {
        if (!draftData) return;
        setSavingIndex(index);
        
        const payload: SaveContentInput = {
            ...draftData.metadata,
            title: variation.title,
            content: variation.content,
        };

        try {
            const result = await saveContent(payload);
            if (result.success && result.data) {
                toast.success("Content saved to library");
                // Clear the draft from session storage so it doesn't linger
                sessionStorage.removeItem(`draftContent_${projectId}`);
                
                // Refresh router to ensure layout data is fresh
                router.refresh();
                
                // Redirect immediately to the new content details page
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

    if (!isLoaded || !draftData) {
        return (
            <div className="flex justify-center items-center py-20 text-muted-foreground">
                <Loader2 className="h-6 w-6 animate-spin mr-2" /> Loading variations...
            </div>
        )
    }

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b pb-6">
                <Button variant="outline" size="icon" onClick={() => router.back()} className="shrink-0">
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                    <h1 className="text-3xl font-semibold tracking-tight">Review Variations</h1>
                    <p className="text-muted-foreground mt-1">
                        Select your preferred option to save it to your library.
                    </p>
                </div>
                <Button 
                    variant="outline" 
                    onClick={handleRegenerate}
                    disabled={isRegenerating || savingIndex !== null}
                    className="shrink-0"
                >
                    <RefreshCcw className={`h-4 w-4 mr-2 ${isRegenerating ? 'animate-spin' : ''}`} />
                    {isRegenerating ? "Regenerating..." : "Regenerate"}
                </Button>
            </div>

            <div className="space-y-12">
                {draftData.variations.map((variation, index) => (
                    <div key={index} className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <h2 className="text-2xl font-semibold">Option {index + 1}</h2>
                            <Button 
                                size="lg"
                                onClick={() => handleSave(variation, index)}
                                disabled={savingIndex !== null}
                                className="w-full sm:w-auto"
                            >
                                {savingIndex === index ? "Saving..." : "Save This Version"}
                            </Button>
                        </div>
                        
                        <div className="p-6 sm:p-8 border rounded-lg bg-card shadow-sm space-y-6">
                            {variation.title && variation.title.trim() !== "" && (
                                <div>
                                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Title</h3>
                                    <p className="text-lg font-medium">{variation.title}</p>
                                </div>
                            )}
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-2">Content</h3>
                                <div className="whitespace-pre-wrap text-lg leading-relaxed text-foreground">
                                    {variation.content}
                                </div>
                            </div>
                        </div>
                        
                        {index === 0 && draftData.variations.length > 1 && (
                            <hr className="my-8 border-border" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
