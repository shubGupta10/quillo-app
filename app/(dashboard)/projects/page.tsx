import { ProjectList } from "@/features/projects/components/project-list";
import { getProjects } from "@/features/projects/actions/get-projects";

export default async function ProjectsPage() {

  const response = await getProjects();
  const projects = response.success && response.data ? response.data : [];

  return (
    <div className="space-y-8">
      <ProjectList projects={projects} />
    </div>
  );
}
