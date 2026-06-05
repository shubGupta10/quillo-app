"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AccountSectionProps {
    name: string;
    email: string;
    image: string;
}

function SettingRow({
    label,
    description,
    children,
}: {
    label: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 py-4 border-b last:border-0">
            <div className="min-w-0">
                <p className="text-sm font-medium">{label}</p>
                {description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                )}
            </div>
            <div className="w-full sm:w-auto sm:min-w-[16rem] shrink-0">
                {children}
            </div>
        </div>
    )
}

export function AccountSection({ name, email, image }: AccountSectionProps) {
    const router = useRouter()
    const [displayName, setDisplayName] = useState(name)
    const [isSaving, setIsSaving] = useState(false)

    const handleSaveName = async () => {
        if (!displayName.trim() || displayName.trim() === name) return
        setIsSaving(true)
        try {
            await authClient.updateUser({ name: displayName.trim() })
            toast.success("Name updated")
            router.refresh()
        } catch {
            toast.error("Failed to update name")
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <div className="space-y-1">
            <SettingRow
                label="Avatar"
                description="Managed by your sign-in provider"
            >
                <Avatar className="h-16 w-16">
                    <AvatarImage src={image} alt={name} />
                    <AvatarFallback>{name?.charAt(0) ?? "U"}</AvatarFallback>
                </Avatar>
            </SettingRow>
            <SettingRow
                label="Display Name"
                description="Your name shown across the app"
            >
                <div className="flex flex-col gap-3">
                    <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder="Your name"
                        className="w-full"
                    />
                    <div className="flex justify-end">
                        <Button
                            size="sm"
                            onClick={handleSaveName}
                            disabled={isSaving || !displayName.trim() || displayName.trim() === name}
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </div>
            </SettingRow>

            <SettingRow
                label="Email"
                description="Managed by your sign-in provider"
            >
                <Input
                    value={email}
                    disabled
                    className="bg-muted text-muted-foreground cursor-not-allowed"
                />
            </SettingRow>
        </div>
    )
}
