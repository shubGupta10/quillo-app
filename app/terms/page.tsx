import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
                <div className="mb-12">
                    <Link href="/" className={buttonVariants({ variant: "ghost" }) + " -ml-4 mb-6 text-muted-foreground hover:text-foreground"}>
                        <ArrowLeft className="mr-2 w-4 h-4" />
                        Back to Home
                    </Link>
                    <h1 className="text-4xl font-semibold tracking-tight mb-4">Terms of Service</h1>
                    <p className="text-muted-foreground">Last updated: June 5, 2026</p>
                </div>

                <div className="space-y-10 text-base leading-relaxed text-foreground/90">
                    
                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">1. Acceptance of Terms</h2>
                        <p>
                            By accessing or using Quillo ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access or use the Service. 
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">2. Use of the Service</h2>
                        <p>
                            Quillo is a tool designed to help creators, developers, and founders generate build-in-public content from their daily project updates. You agree to use the Service only for its intended purposes and in compliance with all applicable laws and regulations. You are responsible for maintaining the security of your account and your authentication credentials.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">3. User Content</h2>
                        <p>
                            You retain all rights to any projects, updates, and content you submit, post, or display on or through the Service ("User Content"). By submitting content to Quillo, you grant us the right to store and process it solely for the purpose of providing the Service to you (such as processing it through AI models to generate the final text). We claim no ownership over your User Content or the final AI-generated content produced from your inputs.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">4. Prohibited Activities</h2>
                        <p>When using Quillo, you agree not to:</p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                            <li>Use the Service to generate illegal, abusive, harassing, or malicious content.</li>
                            <li>Attempt to gain unauthorized access to other users' accounts or data.</li>
                            <li>Interfere with or disrupt the performance of the Service.</li>
                            <li>Use automated scripts or bots to scrape, access, or abuse the Service.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">5. Intellectual Property</h2>
                        <p>
                            The Quillo application, including its original code, design, features, and functionality, is owned by us and is protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or reverse-engineer any part of the Service without our explicit written permission.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">6. Service Availability</h2>
                        <p>
                            We strive to keep Quillo online and available at all times. However, the Service is provided on an "AS IS" and "AS AVAILABLE" basis. We do not guarantee that the Service will be uninterrupted, error-free, or entirely secure. We may occasionally need to perform maintenance or updates that could temporarily disrupt access.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">7. Limitation of Liability</h2>
                        <p>
                            To the maximum extent permitted by law, Quillo and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your access to or use of the Service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">8. Account Termination</h2>
                        <p>
                            We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms of Service. Upon termination, your right to use the Service will immediately cease. You may also terminate your agreement with us at any time by deleting your account from the application.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">9. Changes To These Terms</h2>
                        <p>
                            We reserve the right to modify or replace these Terms of Service at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-2xl font-semibold tracking-tight text-foreground">10. Contact Information</h2>
                        <p>
                            If you have any questions about these Terms of Service, please contact us at <strong>support@quillo.app</strong>.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
}
