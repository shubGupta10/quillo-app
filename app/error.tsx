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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background">
      <div className="flex flex-col items-center max-w-md p-8 border rounded-lg bg-card">
        <div className="p-4 mb-4 rounded-full bg-muted">
            <AlertCircle className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-2xl font-semibold tracking-tight mb-2">Application Error</h2>
        <p className="text-muted-foreground mb-8">
          A critical error occurred. Please try again or return to the dashboard.
        </p>
        <div className="flex gap-4">
            <Button onClick={() => reset()} variant="outline">
            Try again
            </Button>
            <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
            </Link>
        </div>
      </div>
    </div>
  );
}
