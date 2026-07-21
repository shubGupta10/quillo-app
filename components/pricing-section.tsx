import { Check } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { USAGE_QUOTAS, VALIDATION_LIMITS } from "@/lib/constants/limits";
import { PlanType } from "@/features/subscriptions/model/subscriptions.interface";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function PricingSection() {
  return (
    <div className="w-full py-24 md:py-32 px-6 lg:px-10 max-w-7xl mx-auto bg-background" id="pricing">
      <div className="mb-16 flex flex-col items-center text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
          Simple, transparent pricing
        </h2>
        <p className="text-lg text-muted-foreground">
          We are currently in early beta. Paid plans with higher generation limits are coming soon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <Card className="w-full bg-card border-border shadow-sm flex flex-col relative">
          <CardHeader className="text-center pb-8 pt-8">
            <CardTitle className="text-2xl font-semibold">Early Beta</CardTitle>
            <CardDescription className="mt-2 text-base">
              Get started with Quillo for free while we are in beta.
            </CardDescription>
            <div className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-foreground">${USAGE_QUOTAS.PLAN_PRICING[PlanType.FREE]}</span>
              <span className="text-sm font-semibold leading-6 text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-4 text-sm text-foreground">
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span><strong className="font-semibold text-foreground">{USAGE_QUOTAS.AI_GENERATIONS_PER_MONTH[PlanType.FREE]} AI Generations</strong> per month</span>
              </li>
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Up to <strong className="font-semibold text-foreground">{USAGE_QUOTAS.PROJECTS_PER_USER[PlanType.FREE]} projects</strong></span>
              </li>
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Max <strong className="font-semibold text-foreground">{USAGE_QUOTAS.DAILY_UPDATES_PER_USER[PlanType.FREE]} daily updates</strong> (logs) per day</span>
              </li>
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Up to <strong className="font-semibold text-foreground">{VALIDATION_LIMITS.UPLOAD_MAX_FILE_COUNT} file uploads</strong> ({VALIDATION_LIMITS.UPLOAD_MAX_PDF_SIZE} max)</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pb-8 pt-4">
            <Link href="/sign-up" className={cn(buttonVariants({ className: "w-full" }))}>
              Join the Beta
            </Link>
          </CardFooter>
        </Card>

        <Card className="w-full bg-muted/30 border-border shadow-sm flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-primary/90 text-primary-foreground px-4 py-1 text-xs font-semibold rounded-bl-lg">
            Coming Soon
          </div>
          <CardHeader className="text-center pb-8 pt-8">
            <CardTitle className="text-2xl font-semibold text-muted-foreground">Pro</CardTitle>
            <CardDescription className="mt-2 text-base">
              For power users who need more AI generations.
            </CardDescription>
            <div className="mt-6 flex items-baseline justify-center gap-x-2">
              <span className="text-5xl font-bold tracking-tight text-muted-foreground">${USAGE_QUOTAS.PLAN_PRICING[PlanType.BETA_PRO]}</span>
              <span className="text-sm font-semibold leading-6 text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
                <span><strong className="font-semibold text-muted-foreground">{USAGE_QUOTAS.AI_GENERATIONS_PER_MONTH[PlanType.BETA_PRO]} AI Generations</strong> per month</span>
              </li>
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
                <span>Up to <strong className="font-semibold text-muted-foreground">{USAGE_QUOTAS.PROJECTS_PER_USER[PlanType.BETA_PRO]} projects</strong></span>
              </li>
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
                <span>Max <strong className="font-semibold text-muted-foreground">{USAGE_QUOTAS.DAILY_UPDATES_PER_USER[PlanType.BETA_PRO]} daily updates</strong> (logs) per day</span>
              </li>
              <li className="flex gap-x-3">
                <Check className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
                <span>Up to <strong className="font-semibold text-muted-foreground">{VALIDATION_LIMITS.UPLOAD_MAX_FILE_COUNT} file uploads</strong> ({VALIDATION_LIMITS.UPLOAD_MAX_PDF_SIZE} max)</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter className="pb-8 pt-4">
            <Button className="w-full" variant="outline" disabled>
              Waitlist
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
