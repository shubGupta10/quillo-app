import { PricingSection } from "@/components/pricing";

export const quilloPlans = [
  {
    name: "Hobby",
    info: "Perfect for getting started and building the public habit.",
    price: {
      monthly: 0,
      yearly: 0,
    },
    features: [
      { text: "Unlimited local logging" },
      { text: "Basic Markdown editor" },
      { text: "Export to clipboard" },
      { text: "1 Workspace" },
    ],
    btn: {
      text: "Start for Free",
      href: "/signup",
    },
  },
  {
    name: "Pro",
    info: "For serious builders growing an audience on autopilot.",
    price: {
      monthly: 12,
      yearly: 96,
    },
    highlighted: true,
    features: [
      { text: "Everything in Hobby" },
      { text: "AI Post Generation", tooltip: "Powered by Gemini 1.5 Pro" },
      { text: "Unlimited Scheduling to X & LinkedIn" },
      { text: "Unlimited Workspaces" },
      { text: "Analytics Dashboard", tooltip: "Track your views and engagement over time." },
    ],
    btn: {
      text: "Upgrade to Pro",
      href: "/signup",
    },
  },
];

export function QuilloPricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-background border-t border-border">
      <PricingSection
        heading="Simple, transparent pricing"
        description="Start logging for free, upgrade when you need AI and auto-scheduling."
        plans={quilloPlans}
      />
    </section>
  );
}
