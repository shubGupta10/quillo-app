import { getProject } from "@/features/projects/actions/get-project";
import { ProjectHeader } from "@/features/projects/components/project-header";
import { ProjectTabs } from "@/features/projects/components/project-tabs";
import { getDailyUpdates } from "@/features/daily-updates/actions/get-daily-updates";
import { UpdateList } from "@/features/daily-updates/components/update-list";
import { AddUpdateDialog } from "@/features/daily-updates/components/add-update-dialog";
import { GenerateContentForm } from "@/features/content/components/generate-content-form";
import { getSettings } from "@/features/settings/actions/get-settings";
import { getSubscriptionStatus } from "@/features/subscriptions/actions/get-subscription-status";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { USAGE_QUOTAS } from "@/lib/constants/limits";
import { PlanType } from "@/features/subscriptions/model/subscriptions.interface";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const [projectRes, updatesRes, generateUpdatesRes, settingsRes, subscriptionStatus] = await Promise.all([
    getProject(projectId),
    getDailyUpdates(projectId, 1, 5),
    getDailyUpdates(projectId, 1, 50),
    getSettings(),
    getSubscriptionStatus(),
  ]);

  const project = projectRes.success ? projectRes.data : null;
  const updates = updatesRes.success && updatesRes.data ? updatesRes.data : [];
  const generateUpdates = generateUpdatesRes.success && generateUpdatesRes.data ? generateUpdatesRes.data : [];
  const preferences = settingsRes.success && settingsRes.data ? settingsRes.data.preferences : undefined;
  const limitReached = subscriptionStatus ? !subscriptionStatus.allowed : false;
  const generationsUsed = subscriptionStatus?.used ?? 0;
  const generationsLimit = subscriptionStatus?.limit ?? USAGE_QUOTAS.AI_GENERATIONS_PER_MONTH[PlanType.FREE];

  if (!project) {
    return (
      <div className="p-8 border rounded-lg bg-card text-center space-y-4">
        <h2 className="text-xl font-semibold">Project not found</h2>
        <p className="text-muted-foreground">The project you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Back Navigation */}
      <div>
        <Link href="/projects" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Link>
      </div>

      {/* Project Header */}
      <ProjectHeader project={project} />

      <ProjectTabs
        updatesContent={
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-2">
              <div>
                <h2 className="text-xl font-semibold tracking-tight">Recent Updates</h2>
                <p className="text-sm text-muted-foreground mt-1">Log what you worked on today.</p>
              </div>
              <div className="flex items-center gap-4">
                <AddUpdateDialog projectId={projectId} />
              </div>
            </div>

            <UpdateList
              initialUpdates={updates}
              projectId={projectId}
              initialHasMore={updatesRes.success && updatesRes.pagination?.hasMore ? true : false}
            />
          </div>
        }
        generateContent={
          <div className="space-y-6">
            <div className="pb-2">
              <h2 className="text-xl font-semibold tracking-tight">Generate Content</h2>
              <p className="text-sm text-muted-foreground mt-1">Select your updates and use AI to create a post.</p>
            </div>

            <GenerateContentForm
              projectId={projectId}
              updates={generateUpdates}
              preferences={preferences}
              limitReached={limitReached}
              generationsUsed={generationsUsed}
              generationsLimit={generationsLimit}
            />
          </div>
        }
      />
    </div>
  )
}