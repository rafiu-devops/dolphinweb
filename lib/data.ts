import fs from 'fs';
import path from 'path';
import { Project, FAQ, ContactInfo, Testimonial, Stat, TeamMember } from '@/types';

const dataDirectory = path.join(process.cwd(), 'data');

const projectsDirectory = path.join(dataDirectory, 'projects');

function getJsonData<T>(fileName: string, defaultValue: any = []): T {
  const filePath = path.join(dataDirectory, fileName);
  if (!fs.existsSync(filePath)) {
    console.warn(`Warning: Data file ${fileName} not found at ${filePath}. Using default value.`);
    return defaultValue as T;
  }
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error parsing JSON from ${fileName}:`, error);
    return defaultValue as T;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!fs.existsSync(projectsDirectory)) return [];
  
  const files = fs.readdirSync(projectsDirectory);
  const jsonFiles = files.filter(file => file.endsWith('.json'));
  
  const projects = jsonFiles.map(file => {
    const filePath = path.join(projectsDirectory, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content) as Project;
  });
  
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const filePath = path.join(projectsDirectory, `${slug}.json`);
  if (!fs.existsSync(filePath)) return undefined;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as Project;
}

export async function getFAQs(): Promise<FAQ[]> {
  return getJsonData<FAQ[]>('faqs.json', []);
}

export async function getContactInfo(): Promise<ContactInfo> {
  return getJsonData<ContactInfo>('contact.json', {});
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return getJsonData<Testimonial[]>('testimonials.json', []);
}

export async function getStats(): Promise<Stat[]> {
  return getJsonData<Stat[]>('stats.json', []);
}

export async function getTeam(): Promise<TeamMember[]> {
  return getJsonData<TeamMember[]>('team.json', []);
}
