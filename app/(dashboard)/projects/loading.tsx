import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoading() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col p-6 lg:p-8 border rounded-lg bg-card shadow-sm h-full space-y-4">
          <div className="space-y-2 mb-4">
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-4/5 rounded-md" />
          </div>

          <div className="mt-auto pt-4 space-y-2 border-t border-border">
            <Skeleton className="h-4 w-48 rounded-md" />
            <Skeleton className="h-3 w-28 rounded-md" />
          </div>

          <div className="mt-4">
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
