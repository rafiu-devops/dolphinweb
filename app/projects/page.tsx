import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProjectsHero } from "@/components/sections/ProjectsHero";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();
  
  return (
    <div className="min-h-screen">
      <ProjectsHero />
      <ProjectsSection projects={projects} />
    </div>
  );
}
