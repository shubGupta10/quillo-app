"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Check, Copy, ExternalLink, MessageSquare, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { FeedbackDialog } from "@/features/feedback/components/feedback-dialog";

interface ShareContentModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    content?: string;
    platform?: string;
    onSchedule?: () => void;
}

export function ShareContentModal({
    isOpen,
    onClose,
    title,
    content,
    platform = "LINKEDIN",
    onSchedule,
}: ShareContentModalProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content || "");
            setCopied(true);
            toast.success("Post text copied to clipboard!");
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            toast.error("Failed to copy content to clipboard");
        }
    };

    const handleShareX = () => {
        const textToShare = title ? `${title}\n\n${content}` : content || "";
        const xUrl = `https://x.com/intent/post?text=${encodeURIComponent(textToShare)}`;
        window.open(xUrl, "_blank", "noopener,noreferrer");
    };

    const handleShareLinkedin = async () => {
        await handleCopy();
        toast.success("Opening LinkedIn Feed...");
        window.open("https://www.linkedin.com/feed/", "_blank", "noopener,noreferrer");
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[550px] p-8 space-y-6">
                <DialogHeader className="space-y-2">
                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                        <Sparkles className="h-4 w-4" />
                        <span>Content Saved to Library</span>
                    </div>

                    <DialogTitle className="text-2xl font-semibold">Ready to publish?</DialogTitle>
                    <DialogDescription className="text-muted-foreground text-sm">
                        Share your post instantly on social media or schedule it for later.
                    </DialogDescription>
                </DialogHeader>

                {/* Content Preview Box */}
                <div className="p-6 border rounded-lg bg-muted/30 max-h-[220px] overflow-y-auto space-y-2">
                    {title && <p className="font-semibold text-foreground text-base">{title}</p>}
                    <p className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">{content}</p>
                </div>

                {/* Action Grid */}
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        1-Click Social Share
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Button
                            onClick={handleShareX}
                            className="w-full gap-2 cursor-pointer"
                        >
                            <span>Share on X (Twitter)</span>
                            <ExternalLink className="h-4 w-4" />
                        </Button>

                        <Button
                            onClick={handleShareLinkedin}
                            className="w-full gap-2 cursor-pointer"
                        >
                            <span>Share on LinkedIn</span>
                            <ExternalLink className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Utilities */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-border">
                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCopy}
                            className="gap-2 cursor-pointer"
                        >
                            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                            <span>{copied ? "Copied" : "Copy Text"}</span>
                        </Button>

                        {onSchedule && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    onClose();
                                    onSchedule();
                                }}
                                className="gap-2 cursor-pointer"
                            >
                                <Calendar className="h-4 w-4" />
                                <span>Schedule Post</span>
                            </Button>
                        )}

                        <FeedbackDialog triggerVariant="outline" triggerClassName="gap-2">
                            <Button variant="outline" size="sm" className="gap-2 cursor-pointer">
                                <MessageSquare className="h-4 w-4" />
                                <span>Feedback</span>
                            </Button>
                        </FeedbackDialog>
                    </div>

                    <Button variant="ghost" size="sm" onClick={onClose} className="cursor-pointer">
                        Done
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}