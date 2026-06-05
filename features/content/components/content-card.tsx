import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteContent } from "../actions/delete-content";
import { EditContentDialog } from "./edit-content-dialog";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

interface ContentCardProps {
    content: any;
}

export function ContentCard({ content }: ContentCardProps) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(content.content);
        toast.success("Content copied successfully!");
    }

    const handleDelete = async () => {
        const res = await deleteContent(content._id);
        if(res.success){
            toast.success("Content deleted");
            setIsOpen(false);
            router.refresh();
        }else {
            toast.error("Failed to delete content");
        }
    }

    const formattedDate = new Date(content.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });

    return (
        <div className="flex flex-col py-6 border-b border-border last:border-0 group">
            <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-1" title={content.title}>
                {content.title || "Untitled Content"}
            </h3>

            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-3">
                {content.projectId?.name && (
                    <>
                        <span className="font-medium text-foreground/80">{content.projectId.name}</span>
                        <span>&bull;</span>
                    </>
                )}
                <span>{content.platform}</span>
                <span>&bull;</span>
                <span>{formattedDate}</span>
                <span>&bull;</span>
                <span className="capitalize">{content.status.toLowerCase()}</span>
            </div>

            <div className="text-muted-foreground text-sm line-clamp-3 leading-relaxed mb-4">
                {content.content}
            </div>

            <div className="flex items-center justify-end gap-2 mt-auto">
                <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground font-medium" onClick={handleCopy}>
                    Copy
                </Button>

                <EditContentDialog content={content}>
                    <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-foreground font-medium">
                        Edit
                    </Button>
                </EditContentDialog>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger render={
                        <Button variant="ghost" size="sm" className="h-8 text-muted-foreground hover:text-destructive font-medium">
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

                <Link href={`/content/${content._id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
