import { Skeleton } from "@/components/ui/skeleton";

export default function ContentDetailsLoading() {
  return (
    <div className="space-y-8">
      {/* Header & Action Bar Skeleton */}
      <div className="space-y-6 pb-6 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <Skeleton className="h-9 w-3/4 max-w-lg rounded-md" />

          {/* Action buttons row */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Skeleton className="h-9 w-24 rounded-md" />
            <Skeleton className="h-9 w-9 sm:w-20 rounded-md" />
            <Skeleton className="h-9 w-9 sm:w-20 rounded-md" />
            <Skeleton className="h-9 w-9 sm:w-20 rounded-md" />
            <Skeleton className="h-9 w-9 sm:w-20 rounded-md" />
          </div>
        </div>

        {/* Badges and date row */}
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-32 rounded-full" />
          <Skeleton className="h-4 w-40 ml-auto rounded-md" />
        </div>
      </div>

      {/* Main Content Box Skeleton */}
      <div className="bg-card border rounded-lg p-6 lg:p-8 shadow-sm space-y-4">
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-11/12 rounded-md" />
        <Skeleton className="h-5 w-4/5 rounded-md" />
        <Skeleton className="h-5 w-full rounded-md" />
        <Skeleton className="h-5 w-3/4 rounded-md" />
        <Skeleton className="h-5 w-5/6 rounded-md" />
      </div>

      {/* Attachments Section Skeleton */}
      <div className="space-y-4">
        <Skeleton className="h-7 w-36 rounded-md" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden bg-card shadow-sm space-y-3">
              <Skeleton className="w-full h-48" />
              <div className="p-3">
                <Skeleton className="h-4 w-3/4 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
