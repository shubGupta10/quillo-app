"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AddUpdateDialog } from "@/features/daily-updates/components/add-update-dialog"
import { IProjectOnboarding } from "../models/project.interface"
import { CheckCircle2, Circle, PenTool, Sparkles, Send, ArrowRight, Check } from "lucide-react"

interface GettingStartedChecklistProps {
    projectId: string;
    onboarding: IProjectOnboarding;
    onNavigateToGenerate?: () => void;
}

export function GettingStartedChecklist({ projectId, onboarding, onNavigateToGenerate }: GettingStartedChecklistProps) {
    const { loggedUpdate, generatedContent, savedContent } = onboarding;
    const completedCount = [loggedUpdate, generatedContent, savedContent].filter(Boolean).length;

    return (
        <Card className="bg-card border-border shadow-sm">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-semibold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-500" />
                        Getting Started with your Project
                    </CardTitle>
                    {completedCount === 3 ? (
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center gap-1">
                            <Check className="h-3.5 w-3.5" /> All 3 Steps Completed!
                        </span>
                    ) : (
                        <span className="text-xs font-medium text-muted-foreground">
                            {completedCount}/3 completed
                        </span>
                    )}
                </div>
                <p className="text-sm text-muted-foreground">
                    Follow these 3 simple steps to start turning your daily work into content.
                </p>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Step 1: Log Work */}
                    <div className={`p-4 border rounded-lg space-y-3 transition-colors ${loggedUpdate ? "bg-muted/20 border-emerald-500/30" : "bg-muted/40 border-primary/50"}`}>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Step 1</span>
                            {loggedUpdate ? (
                                <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                    <span>Done</span>
                                </div>
                            ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <PenTool className="h-4 w-4 text-foreground" />
                            <h4 className="font-medium text-sm">Log Today's Work</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Write a quick update about what you built, fixed, or shipped today.
                        </p>
                        <div className="pt-2">
                            <AddUpdateDialog projectId={projectId} />
                        </div>
                    </div>

                    {/* Step 2: Generate Content */}
                    <div className={`p-4 border rounded-lg space-y-3 transition-colors ${generatedContent ? "bg-muted/20 border-emerald-500/30" : loggedUpdate ? "bg-muted/50 border-amber-500/50 shadow-sm" : "opacity-60 bg-muted/20"}`}>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Step 2</span>
                            {generatedContent ? (
                                <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                    <span>Done</span>
                                </div>
                            ) : (
                                <Circle className={`h-5 w-5 ${loggedUpdate ? "text-amber-500" : "text-muted-foreground"}`} />
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-foreground" />
                            <h4 className="font-medium text-sm">Generate Content</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Select the updates you want to post about, choose your platform (LinkedIn or X), perspective, tone, and length, then AI drafts your posts.
                        </p>
                        <div className="pt-2">
                            <Button
                                size="sm"
                                variant={loggedUpdate ? "default" : "outline"}
                                disabled={!loggedUpdate}
                                onClick={onNavigateToGenerate}
                                className="cursor-pointer gap-1.5 w-full sm:w-auto"
                            >
                                <span>Generate Content</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    </div>

                    {/* Step 3: Save or Schedule */}
                    <div className={`p-4 border rounded-lg space-y-3 transition-colors ${savedContent ? "bg-muted/20 border-emerald-500/30" : generatedContent ? "bg-muted/50 border-amber-500/50 shadow-sm" : "bg-muted/20 opacity-60"}`}>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-amber-500 uppercase tracking-wider">Step 3</span>
                            {savedContent ? (
                                <div className="flex items-center gap-1 text-emerald-500 text-xs font-medium">
                                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                    <span>Done</span>
                                </div>
                            ) : (
                                <Circle className={`h-5 w-5 ${generatedContent ? "text-amber-500" : "text-muted-foreground"}`} />
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            <Send className="h-4 w-4 text-foreground" />
                            <h4 className="font-medium text-sm">Save or Schedule</h4>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            Click &quot;Save This Version&quot; on any generated draft to save it to your backlog or schedule automated social posts.
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
