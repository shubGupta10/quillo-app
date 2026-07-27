import { Skeleton } from "@/components/ui/skeleton";

export default function ReviewLoading() {
  return (
    <div className="space-y-8">
      {/* Top Controls Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Skeleton className="h-9 w-40 rounded-md" />
        <Skeleton className="h-9 w-32 rounded-md" />
      </div>

      {/* Variation Cards List Skeleton */}
      <div className="space-y-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-9 w-36 rounded-md" />
            </div>

            <div className="p-6 lg:p-8 border rounded-lg bg-card shadow-sm space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16 rounded-md" />
                <Skeleton className="h-6 w-1/2 rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-11/12 rounded-md" />
                <Skeleton className="h-5 w-4/5 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
