"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 h-full min-h-[60vh] px-4 text-center">
      <div className="flex flex-col items-center max-w-md p-8 border rounded-lg bg-card">
        <div className="p-4 mb-4 rounded-full bg-muted">
            <AlertTriangle className="w-10 h-10 text-destructive" />
        </div>
        <h2 className="text-xl font-semibold tracking-tight mb-2">Something went wrong</h2>
        <p className="text-muted-foreground text-sm mb-8">
          An error occurred while loading this page. Please try again.
        </p>
        <Button onClick={() => reset()} variant="outline">
          Try again
        </Button>
      </div>
    </div>
  );
}
