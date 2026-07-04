"use client"

import { useCallback, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useUploadThing } from "@/lib/uploadthing"
import { X, Upload, Loader2 } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { createDailyUpdateSchema, CreateDailyUpdateInput } from "../schemas/daily-updates.schema"
import { createDailyUpdate } from "../actions/create-daily-update"

interface AddUpdateDialogProps {
    projectId: string;
}

export function AddUpdateDialog({ projectId }: AddUpdateDialogProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm<CreateDailyUpdateInput>({
        resolver: zodResolver(createDailyUpdateSchema),
        defaultValues: {
            projectId: projectId,
            content: "",
        },
    });

    const contentValue = form.watch("content");
    const charCount = contentValue?.length ?? 0;
    const MAX_CHARS = 1000;

    const { startUpload } = useUploadThing("dailyUpdateAttachment", {
        onClientUploadComplete: (res) => {
            if (res && res.length > 0) {
                const newFiles = res.map(file => ({
                    url: file.serverData.url,
                    type: file.serverData.type,
                    fileName: file.serverData.fileName,
                    size: file.serverData.size,
                }));
                setUploadedFiles(prev => [...prev, ...newFiles]);
                toast.success("File uploaded successfully");
            }
            setIsUploading(false);
        },
        onUploadError: (error) => {
            console.error("Upload error:", error);
            toast.error(`Upload failed: ${error.message}`);
            setIsUploading(false);
        },
    });

    const handleFileSelect = useCallback(async (files: File[]) => {
        if (!files.length) return;
        setIsUploading(true);
        await startUpload(files);
    }, [startUpload]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        handleFileSelect(files);
    }, [handleFileSelect]);

    async function onSubmit(data: CreateDailyUpdateInput) {
        try {
            const payload = {
                ...data,
                attachment: uploadedFiles
            };
            const result = await createDailyUpdate(payload);

            if (result.success) {
                toast.success("Update logged successfully");
                setIsOpen(false);
                form.reset();
                setUploadedFiles([]);
                router.refresh();
            } else {
                console.error(result.error);
                toast.error(result.error || "Failed to log update");
            }
        } catch (error) {
            console.error("Failed to log update", error);
            toast.error("An unexpected error occurred");
        }
    }

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = await form.trigger();
        if (!isValid) return;

        const data = form.getValues();
        const payload = {
            ...data,
            attachment: uploadedFiles
        };

        await onSubmit(payload as CreateDailyUpdateInput);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} disablePointerDismissal>
            <DialogTrigger render={<Button className="cursor-pointer">Log Update</Button>} />

            <DialogContent 
                className="sm:max-w-[550px] p-8"
            >
                {/* Visually hidden button to catch Base UI's auto-focus and prevent the orange ring */}
                <button type="button" className="sr-only" />
                <DialogHeader>
                    <DialogTitle>Log Daily Update</DialogTitle>
                    <DialogDescription>
                        What did you work on today? This will be used to generate your content.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="content">Update</Label>
                        <Textarea
                            id="content"
                            placeholder="e.g. Added a new feature to the landing page..."
                            className="h-[250px] resize-none overflow-y-auto"
                            maxLength={MAX_CHARS}
                            {...form.register("content")}
                            onKeyDown={(e) => {
                                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                                    e.preventDefault();
                                    handleFormSubmit(e as any);
                                }
                            }}
                        />
                        <div className="flex items-center justify-between">
                            <div>
                                {form.formState.errors.content && (
                                    <p className="text-sm text-destructive">
                                        {form.formState.errors.content.message}
                                    </p>
                                )}
                            </div>
                            <span
                                className={`text-xs tabular-nums ${
                                    charCount >= MAX_CHARS
                                        ? "text-destructive font-medium"
                                        : charCount >= 900
                                        ? "text-amber-500"
                                        : "text-muted-foreground"
                                }`}
                            >
                                {charCount}/{MAX_CHARS}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Attachment (Optional)</Label>
                        {uploadedFiles.length > 0 ? (
                            <div className="flex flex-col gap-2">
                                {uploadedFiles.map((file, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
                                        <span className="text-sm truncate">{file.fileName}</span>
                                        <Button 
                                            type="button" 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-6 w-6 text-muted-foreground hover:text-destructive cursor-pointer" 
                                            onClick={() => {
                                                const newAttachments = [...uploadedFiles];
                                                newAttachments.splice(idx, 1);
                                                setUploadedFiles(newAttachments);
                                            }}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div
                                className="border border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-muted/30"
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*,.pdf,.txt"
                                    className="hidden"
                                    onChange={(e) => {
                                        const files = Array.from(e.target.files || []);
                                        handleFileSelect(files);
                                        e.target.value = "";
                                    }}
                                />
                                {isUploading ? (
                                    <div className="flex flex-col items-center gap-2 py-2">
                                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">Uploading...</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2 py-2">
                                        <Upload className="h-6 w-6 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                            Drop a file here or click to browse
                                        </p>
                                        <p className="text-xs text-muted-foreground/60">
                                            Images, PDFs, or text files
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="outline" className="cursor-pointer" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" className="cursor-pointer" disabled={form.formState.isSubmitting || isUploading}>
                            {form.formState.isSubmitting ? "Logging..." : "Log Update"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
