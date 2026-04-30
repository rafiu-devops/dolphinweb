import { getProjectBySlug, getProjects } from "@/lib/data";
import { notFound } from "next/navigation";
import ProjectDetailClient from "@/components/sections/ProjectDetailClient";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const allProjects = await getProjects();

  if (!project) notFound();

  return (
    <ProjectDetailClient 
      project={project} 
    />
  );
}
