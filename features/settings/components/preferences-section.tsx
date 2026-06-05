"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Platform, Perspective, Tone, ContentLength } from "@/features/content/models/content.interface"
import { updatePreferences } from "../actions/update-preferences"
import { IUserPreferences } from "@/features/auth/model/auth.interface"

interface PreferencesSectionProps {
    preferences: IUserPreferences;
}

const EMPTY = ""

function toValue(val: string | null | undefined): string {
    return val ?? EMPTY
}

function fromValue(val: string): string | null {
    return val === EMPTY ? null : val
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 py-3 border-b last:border-0">
            <div className="min-w-0">
                <p className="text-sm font-medium">{label}</p>
                {description && (
                    <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                )}
            </div>
            <div className="w-full sm:w-auto sm:min-w-[11rem] shrink-0">
                {children}
            </div>
        </div>
    )
}

export function PreferencesSection({ preferences }: PreferencesSectionProps) {
    const [platform, setPlatform] = useState(toValue(preferences?.defaultPlatform))
    const [perspective, setPerspective] = useState(toValue(preferences?.defaultPerspective))
    const [tone, setTone] = useState(toValue(preferences?.defaultTone))
    const [length, setLength] = useState(toValue(preferences?.defaultLength))
    const [isSaving, setIsSaving] = useState(false)

    const handleSave = async () => {
        setIsSaving(true)
        const result = await updatePreferences({
            defaultPlatform: fromValue(platform) as any,
            defaultPerspective: fromValue(perspective) as any,
            defaultTone: fromValue(tone) as any,
            defaultLength: fromValue(length) as any,
        })
        if (result.success) {
            toast.success("Preferences saved")
        } else {
            toast.error("Failed to save preferences")
        }
        setIsSaving(false)
    }

    return (
        <div className="space-y-1">
            <SettingRow
                label="Platform"
                description="Default platform when generating content"
            >
                <Select value={platform} onValueChange={(val) => setPlatform(val ?? "")}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="No default" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={EMPTY}>No default</SelectItem>
                        {Object.values(Platform).map(p => (
                            <SelectItem key={p} value={p}>
                                {p.charAt(0) + p.slice(1).toLowerCase()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </SettingRow>

            <SettingRow
                label="Perspective"
                description="First person or team voice"
            >
                <Select value={perspective} onValueChange={(val) => setPerspective(val ?? "")}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="No default" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={EMPTY}>No default</SelectItem>
                        {Object.values(Perspective).map(p => (
                            <SelectItem key={p} value={p}>
                                {p.replace("_", " ").toLowerCase().replace(/^\w/, c => c.toUpperCase())}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </SettingRow>

            <SettingRow
                label="Tone"
                description="Writing style for generated posts"
            >
                <Select value={tone} onValueChange={(val) => setTone(val ?? "")}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="No default" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={EMPTY}>No default</SelectItem>
                        {Object.values(Tone).map(t => (
                            <SelectItem key={t} value={t}>
                                {t.charAt(0) + t.slice(1).toLowerCase()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </SettingRow>

            <SettingRow
                label="Length"
                description="Target length for generated content"
            >
                <Select value={length} onValueChange={(val) => setLength(val ?? "")}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="No default" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={EMPTY}>No default</SelectItem>
                        {Object.values(ContentLength).map(l => (
                            <SelectItem key={l} value={l}>
                                {l.charAt(0) + l.slice(1).toLowerCase()}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </SettingRow>

            <div className="pt-4 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Preferences"}
                </Button>
            </div>
        </div>
    )
}
