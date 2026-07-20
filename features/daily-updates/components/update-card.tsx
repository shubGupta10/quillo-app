"use client"

import { useState } from "react";
import { IDailyUpdate } from "../models/dailyUpdate.interface";
import { Button } from "@/components/ui/button";
import { Trash2, Paperclip, Edit2 } from "lucide-react";
import { deleteDailyUpdate } from "../actions/delete-daily-update";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { updateDailyUpdate } from "../actions/update-daily-update";
import { useTransition } from "react";

interface UpdateCardProps {
    update: IDailyUpdate & { _id: string };
}

export function UpdateCard({ update }: UpdateCardProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editedContent, setEditedContent] = useState(update.content);
    const [isPending, startTransition] = useTransition();

    const handleDelete = async () => {
        toast.success("Deleting update...");

        startTransition(async () => {
            try {
                const res = await deleteDailyUpdate(update._id);
                if (res.success) {
                    toast.success("Daily update deleted");
                    setIsOpen(false);
                    router.refresh();
                } else {
                    toast.error(res.error || "Failed to delete update");
                }
            } catch (error) {
                toast.error("An unexpected error occurred");
            }
        })

    };

    const handleUpdate = async () => {
        setIsEditOpen(false);
        toast.success("Saving changes...");

        startTransition(async () => {
            try {
                const res = await updateDailyUpdate({
                    content: editedContent
                }, update._id);

                if (res.success) {
                    toast.success("Daily update updated");
                    router.refresh();
                } else {
                    toast.error(res.error || "Failed to update")
                }
            } catch (error) {
                toast.error("An unexpected error occurred");
            }
        });
    }

    const formattedDate = new Date(update.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="p-6 border rounded-lg bg-card space-y-4 group">
            <div className="flex justify-between items-start text-sm text-muted-foreground">
                <time className="pt-1">{formattedDate}</time>

                <div className="flex items-center gap-1">
                    <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                        <DialogTrigger render={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Edit2 className="h-4 w-4" />
                            </Button>
                        } />
                        <DialogContent className="sm:max-w-2xl">
                            <DialogHeader>
                                <DialogTitle>Edit Update</DialogTitle>
                            </DialogHeader>
                            <div className="py-4">
                                <Textarea
                                    className="min-h-[250px] resize-y"
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    placeholder="Write your daily update..."
                                />
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</Button>
                                <Button variant="default" disabled={isPending} onClick={handleUpdate}>
                                    {isPending ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger render={
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        } />
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Delete Update?</DialogTitle>
                            </DialogHeader>
                            <div className="text-sm text-muted-foreground">
                                This action cannot be undone. Are you sure you want to delete this daily update?
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                                <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                                <Button variant="default" disabled={isPending} onClick={handleDelete}>
                                    {isPending ? "Deleting..." : "Delete"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <p className="whitespace-pre-wrap">{update.content}</p>

            {update.attachment && update.attachment.length > 0 && (
                <div className="pt-4 mt-2 border-t">
                    <div className="flex flex-wrap gap-2">
                        {update.attachment.map((att, idx) => (
                            <a
                                key={idx}
                                href={att.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/20 hover:bg-muted/50 transition-colors text-sm w-fit"
                            >
                                <Paperclip className="h-4 w-4 text-muted-foreground" />
                                <span className="text-blue-500 hover:underline">
                                    Show image
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
