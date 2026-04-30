import { getTeam, getProjects } from "@/lib/data";
import AboutClient from "@/components/sections/AboutClient";

export default async function About() {
  const team = await getTeam();
  const allProjects = await getProjects();
  const featuredProjects = allProjects.filter(p => p.featured?.isFeatured).slice(0, 3);

  return <AboutClient team={team} featuredProjects={featuredProjects} />;
}
