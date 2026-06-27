import { getDashboardData } from "@/features/dashboard/actions/get-dashboard-data";
import { ProjectDailog } from "@/features/projects/components/project-dailog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Folder, FileText, CheckCircle2, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const result = await getDashboardData();

  if (!result.success || !result.data) {
    redirect("/sign-in");
  }

  const { stats, timeline, recentProjects, recentContent } = result.data;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
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
            <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.weeklyPosts}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">

          {/* Recent Projects */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">Recent Projects</h2>
              <div className="flex items-center gap-3">
                <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  View all
                </Link>
                <ProjectDailog />
              </div>
            </div>

            <div className="divide-y divide-border border rounded-lg bg-card">
              {recentProjects.length === 0 ? (
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground text-sm mb-4">No projects yet. Create one to get started.</p>
                  <ProjectDailog />
                </div>
              ) : (
                recentProjects.map((project: any) => (
                  <Link
                    key={project._id}
                    href={`/projects/${project._id}`}
                    className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    <div className="min-w-0">
                      <p className="font-medium truncate">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.updatesCount} updates · {project.contentCount} posts · Updated {project.updatedAt && !isNaN(new Date(project.updatedAt).getTime()) ? new Date(project.updatedAt).toLocaleDateString() : "Unknown"}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Recent Content */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold tracking-tight">Recent Content</h2>
              <Link href="/content" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                View all
              </Link>
            </div>

            <div className="divide-y divide-border border rounded-lg bg-card">
              {recentContent.length === 0 ? (
                <div className="p-8 flex flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground text-sm mb-4">No content generated yet.</p>
                  <Link href="/projects">
                    <Button variant="outline" size="sm">Go To Projects</Button>
                  </Link>
                </div>
              ) : (
                recentContent.map((content: any) => {
                  const title = content.title || "Untitled Content";
                  return (
                    <Link
                      key={content._id}
                      href={`/content/${content._id}`}
                      className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                    >
                      <div className="min-w-0">
                        <p className="font-medium truncate">{title}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <Badge variant="secondary" className="text-[11px] h-5 font-normal">
                            {content.platform}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {content.createdAt && !isNaN(new Date(content.createdAt).getTime()) ? new Date(content.createdAt).toLocaleDateString() : "Unknown date"}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Activity */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Recent Activity</h2>
          <div className="border rounded-lg bg-card p-4">
            {timeline.length === 0 ? (
              <p className="text-center text-muted-foreground text-sm py-4">No activity yet.</p>
            ) : (
              <div className="relative border-l border-border ml-2 space-y-5">
                {timeline.map((item: any, i: number) => (
                  <div key={i} className="relative pl-5">
                    <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                    <p className="text-sm font-medium leading-tight">{item.title}</p>
                    <span className="text-xs text-muted-foreground">
                      {item.date && !isNaN(new Date(item.date).getTime()) 
                        ? `${new Date(item.date).toLocaleDateString()} · ${new Date(item.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                        : "Unknown date"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
