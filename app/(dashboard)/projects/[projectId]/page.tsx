import { getProject } from "@/features/projects/actions/get-project";
import { getDailyUpdates } from "@/features/daily-updates/actions/get-daily-updates";
import { getSettings } from "@/features/settings/actions/get-settings";
import { getSubscriptionStatus } from "@/features/subscriptions/actions/get-subscription-status";
import { ProjectTabsContainer } from "@/features/projects/components/project-tabs-container";
import { USAGE_QUOTAS } from "@/lib/constants/limits";
import { PlanType } from "@/features/subscriptions/model/subscriptions.interface";
import { redirect } from "next/navigation";

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;

  const [projectRes, updatesRes, generateUpdatesRes, settingsRes, subscriptionStatus] = await Promise.all([
    getProject(projectId),
    getDailyUpdates(projectId, 1, 10),
    getDailyUpdates(projectId, 1, 50),
    getSettings(),
    getSubscriptionStatus(),
  ]);

  const project = projectRes.success ? projectRes.data : null;
  
  if (!project) {
    redirect("/projects");
  }

  const updates = updatesRes.success && updatesRes.data ? updatesRes.data : [];
  const hasMoreUpdates = updatesRes.success && updatesRes.pagination?.hasMore ? true : false;
  
  const generateUpdates = generateUpdatesRes.success && generateUpdatesRes.data ? generateUpdatesRes.data : [];
  const preferences = settingsRes.success && settingsRes.data ? settingsRes.data.preferences : undefined;
  
  const limitReached = subscriptionStatus ? !subscriptionStatus.allowed : false;
  const generationsUsed = subscriptionStatus?.used ?? 0;
  const generationsLimit = subscriptionStatus?.limit ?? USAGE_QUOTAS.AI_GENERATIONS_PER_MONTH[PlanType.FREE];

  return (
    <ProjectTabsContainer
      project={project}
      updates={updates}
      hasMoreUpdates={hasMoreUpdates}
      generateUpdates={generateUpdates}
      preferences={preferences}
      limitReached={limitReached}
      generationsUsed={generationsUsed}
      generationsLimit={generationsLimit}
    />
  );
}