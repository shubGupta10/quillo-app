import { getSettings } from "@/features/settings/actions/get-settings";
import { AccountSection } from "@/features/settings/components/account-section";
import { DangerSection } from "@/features/settings/components/danger-section";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const result = await getSettings();

    if (!result.success || !result.data) {
        redirect("/sign-in");
    }

    const { name, email, image } = result.data;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            


            <div className="space-y-12">
                {/* Account */}
                <section className="space-y-4">
                    <div className="border-b pb-3">
                        <h2 className="text-lg font-semibold">Account</h2>
                        <p className="text-sm text-muted-foreground mt-0.5">Your profile information.</p>
                    </div>
                    <AccountSection name={name ?? ""} email={email ?? ""} image={image ?? ""} />
                </section>

                {/* Danger Zone */}
                <section className="space-y-4">
                    <div className="border-b border-destructive pb-3">
                        <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
                    </div>
                    <DangerSection />
                </section>
            </div>
        </div>
    );
}
