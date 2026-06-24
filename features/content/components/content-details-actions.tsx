"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Copy, Trash2, CalendarClock, Info } from "lucide-react";
import { EditContentDialog } from "./edit-content-dialog";
import { deleteContent } from "../actions/delete-content";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { scheduleContent } from "@/features/schedule/actions/schedule.content";
import { Input } from "@/components/ui/input";

interface ContentDetailsActionsProps {
    content: any;
}

export function ContentDetailsActions({ content }: ContentDetailsActionsProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
     const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
    const [scheduledDate, setScheduledDate] = useState("");
    const [isScheduling, setIsScheduling] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content.content);
        toast.success("Content copied successfully!");
    };

    const handleDelete = async () => {
        const res = await deleteContent(content._id);
        if (res.success) {
            toast.success("Content deleted successfully");
            setIsOpen(false);
            router.push("/content");
            router.refresh();
        } else {
            toast.error("Failed to delete content");
        }
    };

    const handleSchedule = async () => {
        if(!scheduledDate){
              toast.error("Please select a date and time");
            return;
        }

        setIsScheduling(true);
        const res = await scheduleContent(content._id, new Date(scheduledDate));
        setIsScheduling(false);

        if(res.success){
            toast.success("Content scheduled successfully!");
            setIsScheduleDialogOpen(false);
        } else {
            toast.error(res.error || "Failed to schedule content")
        }
    };

    return (
        <div className="flex items-center gap-2">

            {content.status !== "PUBLISHED" && content.platform !== "REDDIT" && (
            <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
                <DialogTrigger render={
                    <Button variant="default" size="sm" className="h-9">
                        <CalendarClock className="w-4 h-4 mr-2" />
                        {content.status === "SCHEDULED" ? "Reschedule" : "Schedule"}
                    </Button>
                } />

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{content.status === "SCHEDULED" ? "Reschedule Post" : "Schedule Post"}</DialogTitle>
                    </DialogHeader>

                    <div className="py-4 space-y-4">
                        <p className="text-sm text-muted-foreground"> Select when you want this content to be automatically published</p>

                        <Input
                          type="datetime-local"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                        />

                        {content.status !== "PUBLISHED" && (
                            <div className="bg-muted/50 border rounded-lg p-4 mt-4 space-y-3">
                                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                                    <Info className="w-4 h-4 text-muted-foreground" />
                                    <span>Recommended Times</span>
                                </div>
                                {content.platform === "LINKEDIN" ? (
                                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                                        <li><span className="font-medium text-foreground">Monday:</span> 10am - 12pm</li>
                                        <li><span className="font-medium text-foreground">Tuesday:</span> 10am - 12pm or 3pm - 6pm</li>
                                        <li><span className="font-medium text-foreground">Wednesday:</span> 10am - 12pm or 4pm (Peak)</li>
                                        <li><span className="font-medium text-foreground">Thursday:</span> 10am - 12pm or 3pm - 6pm</li>
                                        <li><span className="font-medium text-foreground">Friday:</span> 10am - 12pm</li>
                                        <li className="opacity-70">Weekends: Lower engagement</li>
                                    </ul>
                                ) : (
                                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                                        <li><span className="font-medium text-foreground">Monday:</span> 9am - 11am</li>
                                        <li><span className="font-medium text-foreground">Tue - Thu:</span> 9am - 11am or 5pm - 7pm</li>
                                        <li><span className="font-medium text-foreground">Friday:</span> 9am - 11am</li>
                                        <li className="opacity-70">Weekends: Lower engagement</li>
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                          <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSchedule} disabled={isScheduling || !scheduledDate}>
                            {isScheduling ? "Scheduling..." : content.status === "SCHEDULED" ? "Confirm Reschedule" : "Confirm Schedule"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            )}

            <Button variant="outline" size="sm" className="h-9" onClick={handleCopy}>
                <Copy className="w-4 h-4 mr-2" />
                Copy
            </Button>
            
            <EditContentDialog content={content}>
                <Button variant="outline" size="sm" className="h-9">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                </Button>
            </EditContentDialog>
            
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger render={
                    <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-9 text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/20"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                    </Button>
                } />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Content?</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-muted-foreground">
                        This action cannot be undone. Are you sure you want to delete this content?
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button variant="default" onClick={handleDelete}>Delete</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
