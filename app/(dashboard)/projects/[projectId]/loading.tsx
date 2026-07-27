import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectDetailsLoading() {
  return (
    <div className="space-y-8">
      {/* Project Nav Header Skeleton */}
      <div className="shrink-0 border-b pb-4 space-y-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-8 w-48 rounded-md" />
        </div>
        <div className="flex items-center gap-6 pt-2">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-8 w-24 rounded-md" />
        </div>
      </div>

      {/* Project Updates Card List Skeleton */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-7 w-36 rounded-md" />
          <Skeleton className="h-9 w-32 rounded-md" />
        </div>

        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-6 border rounded-lg bg-card space-y-3">
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-5 w-full rounded-md" />
              <Skeleton className="h-5 w-3/4 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
