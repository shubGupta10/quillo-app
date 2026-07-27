import { Skeleton } from "@/components/ui/skeleton";

export default function ContentLoading() {
  return (
    <div className="space-y-6 w-full">
      {/* Search and Filters Bar Skeleton */}
      <div className="flex flex-col gap-4">
        <Skeleton className="h-11 w-full rounded-md" />
        
        <div className="flex flex-wrap items-center gap-3">
          <Skeleton className="h-9 w-[140px] rounded-md" />
          <Skeleton className="h-9 w-[140px] rounded-md" />
          <div className="flex-1" />
          <Skeleton className="h-9 w-[140px] rounded-md" />
        </div>
      </div>

      {/* Vertical Content Card List Skeleton */}
      <div className="flex flex-col">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col py-6 border-b border-border last:border-0 space-y-3">
            {/* Title */}
            <Skeleton className="h-6 w-3/4 max-w-md rounded-md" />

            {/* Meta Row (Project • Platform • Date • Status) */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-4 w-16 rounded-md" />
            </div>

            {/* Content Preview Lines */}
            <div className="space-y-2 py-1">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-11/12 rounded-md" />
              <Skeleton className="h-4 w-4/5 rounded-md" />
            </div>

            {/* Action Buttons Row */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
              <Skeleton className="h-8 w-16 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
