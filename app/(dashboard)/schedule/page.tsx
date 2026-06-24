import { getScheduledContent } from "@/features/schedule/actions/get-scheduled-content";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SchedulePage() {
    const result = await getScheduledContent();

    if (!result.success && result.error === "Unauthorized") {
        redirect("/sign-in");
    }

    // Error state
    if (!result.success) {
        return (
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="border-b pb-4">
                    <h1 className="text-3xl font-semibold tracking-tight">Scheduled Posts</h1>
                    <p className="text-sm text-muted-foreground mt-2">Content queued to be automatically published.</p>
                </div>
                <div className="text-center py-20 border rounded-lg bg-card space-y-3">
                    <AlertCircle className="w-10 h-10 mx-auto text-destructive opacity-60" />
                    <p className="text-sm font-medium">Failed to load scheduled posts</p>
                    <p className="text-sm text-muted-foreground">Please refresh the page and try again.</p>
                </div>
            </div>
        );
    }

    const scheduledPosts = result.data || [];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="border-b pb-4">
                <h1 className="text-3xl font-semibold tracking-tight">Scheduled Posts</h1>
                <p className="text-sm text-muted-foreground mt-2">Content queued to be automatically published.</p>
            </div>

            {scheduledPosts.length === 0 ? (
                <div className="text-center py-20 border rounded-lg bg-card space-y-3">
                    <CalendarClock className="w-10 h-10 mx-auto text-muted-foreground opacity-30" />
                    <p className="text-sm font-medium">No scheduled posts</p>
                    <p className="text-sm text-muted-foreground">Posts you schedule will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {scheduledPosts.map((post: any) => (
                        <Link href={`/content/${post._id}`} key={post._id} className="block w-full min-w-0">
                            <div className="p-6 border rounded-lg bg-card hover:bg-accent/50 transition-colors space-y-3 overflow-hidden w-full">
                                <div className="space-y-1 min-w-0 overflow-hidden">
                                    <h3 className="font-medium truncate">{post.title || "Untitled Post"}</h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{post.content.substring(0, 100)}...</p>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 shrink-0">
                                        {post.platform}
                                    </Badge>
                                    <div className="text-sm font-medium bg-muted px-3 py-1.5 rounded-md flex items-center shrink-0">
                                        <CalendarClock className="w-4 h-4 mr-2 shrink-0" />
                                        {new Date(post.scheduledFor).toLocaleString(undefined, {
                                            month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
