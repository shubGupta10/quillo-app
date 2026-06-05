"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function DangerSection() {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDeleteAccount = async () => {
        setIsDeleting(true)
        try {
            await authClient.deleteUser()
            toast.success("Account deleted")
            router.push("/sign-in")
        } catch (error) {
            toast.error("Failed to delete account")
            setIsDeleting(false)
        }
    }

    return (
        <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
                Deleting your account will permanently remove your projects, updates, and generated content.
            </p>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger render={
                    <Button variant="destructive" size="sm">
                        Delete Account
                    </Button>
                } />
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Account?</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-muted-foreground">
                        This action cannot be undone. All your projects, updates, and generated content will be permanently deleted.
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button variant="default" onClick={handleDeleteAccount} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete Account"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
