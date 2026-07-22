import { getDashboardData } from "@/features/dashboard/actions/get-dashboard-data";
import { ProjectDialog } from "@/features/projects/components/project-dailog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Folder, FileText, CheckCircle2, Calendar, ArrowRight, FolderOpen, Loader2, Flame } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ClientDate } from "@/components/ui/client-date";

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center flex-1 h-full min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}

async function DashboardContent() {
  const result = await getDashboardData();

  if (!result.success || !result.data) {
    redirect("/sign-in");
  }

  const { stats, recentProjects, upcomingScheduleContent, recentContent } = result.data;
  const streak = stats.streak;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projects</CardTitle>
            <Folder className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.projects}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily Updates</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.updates}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Generated Posts</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.generatedContent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{streak?.current || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Longest: {streak?.longest || 0}</p>
          </CardContent>
        </Card>

      </div>

      {/* Content Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Recent Projects */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Recent Projects</h2>
            <div className="flex items-center gap-3">
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View all
              </Link>
              <ProjectDialog />
            </div>
          </div>

          {recentProjects.length === 0 ? (
            <EmptyState
              icon={FolderOpen}
              title="No projects yet"
              description="Create one to get started."
              className="min-h-[250px]"
            >
              <ProjectDialog />
            </EmptyState>
          ) : (
            <div className="divide-y divide-border border rounded-lg bg-card shadow-sm">
              {recentProjects.map((project: any) => (
                <Link
                  key={project._id}
                  href={`/projects/${project._id}`}
                  className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="min-w-0 space-y-0.5">
                    <p className="font-medium text-base truncate">{project.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center flex-wrap">
                      {project.updatesCount} updates · {project.contentCount} posts · Updated
                      {project.updatedAt && !isNaN(new Date(project.updatedAt).getTime()) ? (
                        <ClientDate className="ml-1" date={project.updatedAt} options={{ year: 'numeric', month: 'numeric', day: 'numeric' }} />
                      ) : " Unknown"}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Schedule */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight">Upcoming Schedule</h2>
            <Link href="/content" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              View all
            </Link>
          </div>

          {(!upcomingScheduleContent || upcomingScheduleContent.length === 0) ? (
            <EmptyState
              icon={FileText}
              title="No upcoming schedule"
              description="Schedule your first post to see it here."
              className="min-h-[250px]"
            >
              <Link href="/projects">
                <Button variant="outline" size="sm">Go To Projects</Button>
              </Link>
            </EmptyState>
          ) : (
            <div className="divide-y divide-border border rounded-lg bg-card shadow-sm">
              {upcomingScheduleContent.map((content: any) => {
                const title = content.title || "Untitled Content";
                return (
                  <Link
                    key={content._id}
                    href={`/content/${content._id}`}
                    className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="font-medium text-base truncate">{title}</p>
                      <div className="text-sm text-muted-foreground">
                        {content.scheduledAt && !isNaN(new Date(content.scheduledAt).getTime()) ? (
                          <ClientDate date={content.scheduledAt} options={{ year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }} />
                        ) : "Unknown date"}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-medium">
                        {content.platform}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Recent Content */}
      <div className="space-y-6 mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Recent Content</h2>
          <Link href="/content" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            View all
          </Link>
        </div>

        {(!recentContent || recentContent.length === 0) ? (
          <EmptyState
            icon={FileText}
            title="No recent content"
            description="Generate some content to see it here."
            className="min-h-[250px]"
          >
            <Link href="/projects">
              <Button variant="outline" size="sm">Go To Projects</Button>
            </Link>
          </EmptyState>
        ) : (
          <div className="divide-y divide-border border rounded-lg bg-card shadow-sm">
            {recentContent.map((content: any) => {
              const title = content.title || "Untitled Content";
              return (
                <Link
                  key={content._id}
                  href={`/content/${content._id}`}
                  className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="font-medium text-base truncate">{title}</p>
                    <div className="text-sm text-muted-foreground">
                      {content.createdAt && !isNaN(new Date(content.createdAt).getTime()) ? (
                        <ClientDate date={content.createdAt} options={{ year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }} />
                      ) : "Unknown date"}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider font-medium">
                      {content.platform}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

