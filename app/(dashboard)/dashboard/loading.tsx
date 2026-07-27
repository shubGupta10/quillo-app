import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-28 rounded-md" />
              <Skeleton className="h-4 w-4 rounded-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 rounded-md mb-1" />
              {i === 3 && <Skeleton className="h-3 w-20 rounded-md" />}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle Row: Recent Projects (Left) & Upcoming Schedule (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Recent Projects Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-40 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>

          <div className="divide-y divide-border border rounded-lg bg-card shadow-sm">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-40 rounded-md" />
                  <Skeleton className="h-4 w-56 rounded-md" />
                </div>
                <Skeleton className="h-4 w-4 rounded-full shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Schedule Skeleton */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-44 rounded-md" />
            <Skeleton className="h-4 w-16 rounded-md" />
          </div>

          <div className="divide-y divide-border border rounded-lg bg-card shadow-sm">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between gap-4 px-6 py-4">
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-5 w-48 rounded-md" />
                  <Skeleton className="h-4 w-36 rounded-md" />
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Skeleton className="h-5 w-16 rounded-full" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Content */}
      <div className="space-y-6 mt-12">
        <div className="flex items-center justify-between">
          <Skeleton className="h-7 w-40 rounded-md" />
          <Skeleton className="h-4 w-16 rounded-md" />
        </div>

        <div className="divide-y divide-border border rounded-lg bg-card shadow-sm">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between gap-4 px-6 py-4">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-5 w-52 rounded-md" />
                <Skeleton className="h-4 w-36 rounded-md" />
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
