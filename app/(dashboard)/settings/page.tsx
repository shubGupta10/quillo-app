import { getSettings } from "@/features/settings/actions/get-settings";
import { PreferencesSection } from "@/features/settings/components/preferences-section";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
    const result = await getSettings();

    if (!result.success || !result.data) {
        redirect("/sign-in");
    }

    const { name, email, preferences } = result.data;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground mt-1">Manage your application preferences.</p>
                </div>
            </div>

            <div className="space-y-12">
                {/* Content Preferences */}
                <section className="space-y-4">
                    <div className="border-b pb-3">
                        <h2 className="text-lg font-semibold">Content Preferences</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Default settings used when generating content.</p>
                    </div>
                    <PreferencesSection preferences={preferences} />
                </section>
            </div>
        </div>
    );
}
