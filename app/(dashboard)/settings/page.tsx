import { getSettings } from "@/features/settings/actions/get-settings";
import { PreferencesSection } from "@/features/settings/components/preferences-section";
import { ConnectAccountsSection } from "@/features/settings/components/connected-accounts-section";
import SocialAccount from "@/features/schedule/model/socialAccount.model";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db";

export default async function SettingsPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    const result = await getSettings();

    if (!result.success || !result.data || !session?.user) {
        redirect("/sign-in");
    }

    const { name, email, preferences } = result.data;

    await connectDB();
    const accounts = await SocialAccount.find({ userId: session.user.id });
    const connectedAccounts = JSON.parse(JSON.stringify(accounts));

    return (
        <div className="space-y-8">
            <div className="space-y-12">

                {/* Connected Accounts */}
                <section className="space-y-4">
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold">Connected Accounts</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Connect your social profiles to enable automatic publishing.</p>
                    </div>
                    <ConnectAccountsSection connectedAccounts={connectedAccounts} />
                </section>

                {/* Content Preferences */}
                <section className="space-y-4">
                    <div className="border-b pb-4">
                        <h2 className="text-xl font-semibold">Content Preferences</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Default settings used when generating content.</p>
                    </div>
                    <PreferencesSection preferences={preferences} />
                </section>
            </div>
        </div>
    );
}
