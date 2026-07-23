import { getAnalytics } from "@/features/analytics/queries";
import { AnalyticsDashboard } from "@/features/analytics/components/analytics-dashboard";
import { AlertCircle, Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20 border rounded-lg bg-card">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        }
      >
        <AnalyticsContent />
      </Suspense>
    </div>
  );
}

async function AnalyticsContent() {
  const result = await getAnalytics();

  if (!result.success && result.error === "Unauthorized") {
    redirect("/sign-in");
  }

  if (!result.success || !result.data) {
    return (
      <div className="text-center py-20 border rounded-lg bg-card space-y-3">
        <AlertCircle className="w-10 h-10 mx-auto text-destructive opacity-60" />
        <p className="text-sm font-medium">Failed to load analytics</p>
        <p className="text-sm text-muted-foreground">
          {result.error || "Please refresh the page and try again."}
        </p>
      </div>
    );
  }

  return <AnalyticsDashboard data={result.data} />;
}
