import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
                <div className="mb-12">
                    <Link href="/" className={buttonVariants({ variant: "ghost" }) + " -ml-4 mb-6 text-muted-foreground hover:text-foreground"}>
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-semibold tracking-tight mb-4">Privacy Policy</h1>
                    <p className="text-muted-foreground">Last updated: June 5, 2026</p>
                </div>

                <div className="space-y-10 text-base leading-relaxed text-foreground/90">
                    
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">1. Introduction</h2>
                        <p>
                            Welcome to Quillo. We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you use our application to generate and manage your build-in-public content.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">2. Information We Collect</h2>
                        <p>When you use Quillo, we collect only the information necessary to provide you with our services. This includes:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Account Information:</strong> Your name, email address, and profile picture (avatar).</li>
                            <li><strong>User-Generated Content:</strong> The projects you create, the daily updates you log, and the content you generate using our AI tools.</li>
                            <li><strong>Application Preferences:</strong> Your default settings for content generation (platform, perspective, tone, and length).</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">3. How We Use Information</h2>
                        <p>Your data is used strictly to provide and improve the Quillo service. Specifically, we use your information to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Authenticate your account and keep it secure.</li>
                            <li>Store and organize your projects and daily updates.</li>
                            <li>Feed your updates to our AI models to generate personalized content for you.</li>
                            <li>Remember your application preferences.</li>
                        </ul>
                        <p className="font-medium">We do not sell your personal data to anyone.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">4. Data Storage</h2>
                        <p>
                            We store your account information, projects, and generated content securely in our database. We retain this data for as long as your account is active, so you can always access your historical content and updates.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">5. Third-Party Services</h2>
                        <p>We use trusted third-party service providers to help run Quillo. These include:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li><strong>Google Gemini AI:</strong> Used to generate content from your daily updates. Your inputs are sent securely to generate the requested text.</li>
                            <li><strong>Database & Hosting Providers:</strong> Used to safely store your application data.</li>
                        </ul>
                        <p>We only share the minimum amount of data required for these services to function, and we do not permit them to use your data for their own marketing purposes.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">6. Google Authentication</h2>
                        <p>
                            Quillo allows you to sign in using Google OAuth. By authenticating with Google, you grant us access to your basic profile information (name, email address, and profile picture). We use this strictly to create and secure your Quillo account. We do not have access to your Google password, nor do we request access to your private Google Drive files or emails.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">7. User Rights</h2>
                        <p>You own all the content you create and store in Quillo. You have the right to access, edit, or export your projects, daily updates, and generated content at any time through the application interface.</p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">8. Data Deletion</h2>
                        <p>
                            You have the right to be forgotten. If you no longer wish to use Quillo, you can permanently delete your account from the Profile settings page. Choosing to delete your account will instantly and irreversibly remove all your personal information, projects, updates, and generated content from our active databases.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">9. Changes To This Policy</h2>
                        <p>
                            We may update this Privacy Policy occasionally to reflect changes in our practices or legal requirements. When we make significant changes, we will notify you by updating the date at the top of this page or by sending an email notification.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">10. Contact Information</h2>
                        <p>
                            If you have any questions, concerns, or requests regarding this Privacy Policy or your data, please contact us at <strong>support@quillo.app</strong>.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
