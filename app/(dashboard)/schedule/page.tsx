import { getScheduledContent } from "@/features/schedule/actions/get-scheduled-content";
import { Badge } from "@/components/ui/badge";
import { CalendarClock } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SchedulePage() {
    const result = await getScheduledContent();

    if (!result.success && result.error === "Unauthorized") {
        redirect("/sign-in");
    }

    const scheduledPosts = result.data || [];

    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 space-y-8">
            <div className="border-b pb-4">
                <h1 className="text-3xl font-semibold tracking-tight">Scheduled Posts</h1>
                <p className="text-muted-foreground mt-2">Content queued to be automatically published.</p>
            </div>

            {scheduledPosts.length === 0 ? (
                <div className="text-center py-20 border rounded-lg bg-card text-muted-foreground">
                    <CalendarClock className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>You have no scheduled posts.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {scheduledPosts.map((post: any) => (
                        <Link href={`/content/${post._id}`} key={post._id}>
                            <div className="p-6 border rounded-lg bg-card hover:bg-accent/50 transition-colors flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
                                <div className="space-y-1 min-w-0">
                                    <h3 className="font-medium truncate">{post.title || "Untitled Post"}</h3>
                                    <p className="text-sm text-muted-foreground truncate">{post.content.substring(0, 100)}...</p>
                                </div>
                                <div className="flex items-center gap-3 shrink-0">
                                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                                        {post.platform}
                                    </Badge>
                                    <div className="text-sm font-medium bg-muted px-3 py-1.5 rounded-md flex items-center">
                                        <CalendarClock className="w-4 h-4 mr-2" />
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
