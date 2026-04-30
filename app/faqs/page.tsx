import { getFAQs, getProjects } from "@/lib/data";
import FAQsClient from "@/components/sections/FAQsClient";

export default async function FAQsPage() {
  const faqs = await getFAQs();
  const projects = await getProjects();
  const featuredProjects = projects.filter(p => p.featured);

  return <FAQsClient faqs={faqs} featuredProjects={featuredProjects} />;
}
