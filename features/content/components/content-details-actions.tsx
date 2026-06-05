"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Copy, Trash2 } from "lucide-react";
import { EditContentDialog } from "./edit-content-dialog";
import { deleteContent } from "../actions/delete-content";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ContentDetailsActionsProps {
    content: any;
}

export function ContentDetailsActions({ content }: ContentDetailsActionsProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

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

    return (
        <div className="flex items-center gap-2">
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
