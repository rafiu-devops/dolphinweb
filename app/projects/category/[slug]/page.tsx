import { getProjects } from "@/lib/data";
import { ProjectsClient } from "@/components/sections/ProjectsClient";
import { ProjectsHero } from "@/components/sections/ProjectsHero";
import { notFound } from "next/navigation";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const projects = await getProjects();

  const categoryMap: Record<string, { status: string; title: string; italic: string; subtitle: string; featured?: boolean }> = {
    upcoming: {
      status: "Upcoming",
      title: "Upcoming",
      italic: "Deployments",
      subtitle: "Strategic preview of our high-potential real estate assets currently in the planning and pre-launch phase."
    },
    featured: {
      status: "All",
      featured: true,
      title: "Featured",
      italic: "Portfolio",
      subtitle: "Elite, high-performance tactical deployments selected for their exceptional value and premium potential."
    },
    ongoing: {
      status: "Ongoing",
      title: "Current",
      italic: "Construction",
      subtitle: "Active operational zones where our high-end architectural concepts are becoming physical reality."
    },
    completed: {
      status: "Completed",
      title: "Completed",
      italic: "Operations",
      subtitle: "Successfully deployed assets representing the pinnacle of our tactical luxury real estate vision."
    }
  };

  const config = categoryMap[slug];

  if (!config) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <ProjectsHero 
        title={config.title} 
        italicTitle={config.italic} 
        subtitle={config.subtitle} 
      />
      <ProjectsClient 
        initialProjects={projects} 
        initialStatus={config.status} 
        initialFeatured={config.featured}
      />
    </div>
  );
}
