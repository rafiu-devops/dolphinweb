import { getProjects, getStats, getTestimonials, getTeam } from "@/lib/data";
import HomeClient from "@/components/sections/HomeClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allProjects = (await getProjects()) || [];
  const featuredProjects = allProjects.filter((p) => p.featured?.isFeatured) || [];
  const stats = (await getStats()) || [];
  const testimonials = (await getTestimonials()) || [];
  const agents = (await getTeam()) || [];

  return (
    <HomeClient 
      featuredProjects={featuredProjects}
      allProjects={allProjects}
      stats={stats} 
      testimonials={testimonials} 
      agents={agents}
    />
  );
}
