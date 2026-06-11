"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateContentSchema, UpdateContentInput } from "../schemas/updateContent.schema"
import { updateContent } from "../actions/update-content"
import { Status } from "../models/content.interface"
import { toast } from "sonner"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditContentDialogProps {
    content: any;
    children: React.ReactElement;
}

export function EditContentDialog({ content, children }: EditContentDialogProps) {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    
    const form = useForm<UpdateContentInput>({
        resolver: zodResolver(updateContentSchema),
        defaultValues: {
            title: content.title || "",
            content: content.content || "",
            status: content.status || Status.DRAFT
        }
    })

    const onSubmit = async (data: UpdateContentInput) => {
        const res = await updateContent(content._id, data)
        if (res.success) {
            toast.success("Content updated successfully")
            setOpen(false)
            router.refresh()
        } else {
            toast.error("Failed to update content")
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger render={children}/>
            <DialogContent className="sm:max-w-[850px] max-h-[90vh] overflow-y-auto p-8">
                <DialogHeader>
                    <DialogTitle>Edit Content</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label>Title</Label>
                                <Input {...form.register("title")} />
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select 
                                    onValueChange={(val) => form.setValue("status", val as Status)}
                                    value={form.watch("status")}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.values(Status).map(s => (
                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-2">
                            <Label>Content</Label>
                            <Textarea 
                                {...form.register("content")} 
                                className="min-h-[400px] h-full max-h-[70vh] resize-y p-4 text-base leading-relaxed"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
