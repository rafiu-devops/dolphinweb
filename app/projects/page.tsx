import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ProjectsHero } from "@/components/sections/ProjectsHero";

export default async function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <ProjectsHero />
      <ProjectsSection />
    </div>
  );
}
