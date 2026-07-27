import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Skeleton className="h-8 w-40 rounded-md" />
        <Skeleton className="h-4 w-64 rounded-md" />
      </div>

      <div className="border rounded-lg bg-card p-6 lg:p-8 space-y-6">
        <Skeleton className="h-6 w-48 rounded-md" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
        <Skeleton className="h-10 w-28 rounded-md ml-auto" />
      </div>
    </div>
  );
}
