import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Check } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Simple, transparent pricing</h1>
                <p className="mt-4 text-xl text-muted-foreground">Unlock automation for Twitter, Blogs, and Instagram.</p>
            </div>

            <div className="mt-16 flex justify-center">
                <div className="border rounded-2xl shadow-sm p-8 bg-card max-w-md w-full">
                    <h3 className="text-2xl font-semibold">Beta Pro</h3>
                    <p className="mt-4 text-muted-foreground">Automate everything, everywhere.</p>
                    <p className="mt-8">
                        <span className="text-4xl font-extrabold">$19</span>
                        <span className="text-base font-medium text-muted-foreground">/mo</span>
                    </p>
                    <ul className="mt-8 space-y-4">
                        {['Unlimited AI Generations', 'LinkedIn Automation', 'X/Twitter Automation', 'Blog & Medium Integration'].map((feature) => (
                            <li key={feature} className="flex items-center">
                                <Check className="h-5 w-5 text-primary shrink-0" />
                                <span className="ml-3 text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <Button className="mt-8 w-full" size="lg">Upgrade Now</Button>
                    <p className="mt-4 text-xs text-center text-muted-foreground">Stripe integration coming soon.</p>
                </div>
            </div>
        </div>
    );
}
