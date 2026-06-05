"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

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

    const form = useForm<CreateDailyUpdateInput>({
        resolver: zodResolver(createDailyUpdateSchema),
        defaultValues: {
            projectId: projectId,
            content: "",
        },
    });

    async function onSubmit(data: CreateDailyUpdateInput) {
        try {
            const result = await createDailyUpdate(data);

            if (result.success) {
                toast.success("Update logged successfully");
                setIsOpen(false);
                form.reset();
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

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger render={<Button />}>
                Log Update
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Log Daily Update</DialogTitle>
                    <DialogDescription>
                        What did you work on today? This will be used to generate your content.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="content">Update</Label>
                        <Textarea
                            id="content"
                            placeholder="e.g. Added a new feature to the landing page..."
                            className="min-h-[120px]"
                            {...form.register("content")}
                        />
                        {form.formState.errors.content && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.content.message}
                            </p>
                        )}
                    </div>

                    <div className="pt-4 flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Logging..." : "Log Update"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
