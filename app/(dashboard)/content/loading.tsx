import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <Skeleton className="h-10 w-full sm:w-[300px]" />
        <Skeleton className="h-10 w-full sm:w-[180px]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card text-card-foreground shadow space-y-4 p-6">
            <div className="flex justify-between items-center">
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-6 rounded-full" />
            </div>
            <Skeleton className="h-6 w-48 mb-4" />
            <Skeleton className="h-20 w-full" />
            <div className="flex items-center justify-between pt-4 mt-4 border-t">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
         <Skeleton className="h-10 w-[300px]" />
      </div>
    </div>
  );
}
