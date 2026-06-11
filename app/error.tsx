"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-slate-950">
      <div className="flex flex-col items-center max-w-md p-8 border border-border rounded-xl bg-card shadow-sm">
        <div className="p-4 mb-6 rounded-full bg-destructive/10">
            <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-2 text-foreground">Application Error</h2>
        <p className="text-muted-foreground mb-8 text-base">
          A critical error occurred. Please try again or return to the dashboard.
        </p>
        <div className="flex flex-col w-full gap-3 sm:flex-row">
            <Button onClick={() => reset()} variant="outline" className="w-full">
                Try again
            </Button>
            <Link href="/dashboard" className="w-full">
                <Button className="w-full">Go to Dashboard</Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
