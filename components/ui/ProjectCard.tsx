"use client";

import React from "react";
import Link from "next/link";
import { MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { ImageSlider } from "./ImageSlider";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
  onEnquire?: (project: Project) => void;
}

export function ProjectCard({ project, className, onEnquire }: ProjectCardProps) {
  const statusColors: Record<string, string> = {
    "Under Construction": "bg-brand-blue text-black shadow-[0_0_20px_rgba(90,161,255,0.4)]",
    "Completed": "bg-[#25D366] text-white shadow-[0_0_20px_rgba(37,211,102,0.3)]",
    "Upcoming": "bg-white text-black border border-border/40",
    "Launching Soon": "bg-black text-brand-blue border border-brand-blue shadow-[0_0_15px_rgba(90,161,255,0.3)]",
    "New Launch": "bg-brand-blue text-black animate-pulse",
  };

  const currentStatusStyle = statusColors[project.status] || statusColors["Upcoming"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className={cn("glass-card-premium group relative gpu-accelerated flex flex-col h-full", className)}
    >
      {/* Hover Edge Highlight Overlay */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand-blue/40 to-transparent -translate-y-full group-hover:animate-[scan_2s_linear_infinite] z-20 pointer-events-none" />
      
      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <ImageSlider 
          images={project.projectCard?.images || []} 
          autoPlay={true}
          interval={2000}
          showArrows={true}
          showDots={false} 
          objectFit="contain"
          className="h-full bg-black/95 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent z-10" />
        
        <div className={cn(
          "absolute top-4 right-4 px-3 py-1.5 rounded-sm tactical-label shadow-2xl z-20",
          currentStatusStyle
        )}>
          {project.status}
        </div>

        {/* Location Tag */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="tactical-label text-foreground drop-shadow-md">{project.city} Central</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-7 space-y-6 relative overflow-hidden flex flex-col flex-grow">
        {/* Subtle Background Icon removed */}

        <div className="space-y-2">
          <h3 className="text-2xl font-black uppercase tracking-tighter italic text-foreground group-hover:text-brand-blue transition-colors duration-500">
            {project.name}
          </h3>
          <div className="flex items-center gap-2 tactical-label text-muted-foreground/80">
            <MapPin size={12} className="text-brand-blue" />
            <span>{project.location}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed font-medium flex-grow">
          {project.projectCard?.shortDescription}
        </p>

        {/* Feature Tags removed for cleaner aesthetic */}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 mt-auto">
          <Link 
            suppressHydrationWarning
            href={`/projects/${project.slug}`}
            prefetch={false}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-[1.2] btn-brand py-2 md:py-2.5 tactical-label shadow-[0_0_20px_rgba(90,161,255,0.15)] group-hover:shadow-[0_0_30px_rgba(90,161,255,0.3)] transition-all text-[9px] md:text-[10px] whitespace-nowrap flex items-center justify-center gap-1"
          >
            View Details <ArrowRight size={11} />
          </Link>
          <button 
            suppressHydrationWarning
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onEnquire?.(project);
            }}
            className="flex-1 bg-muted/10 border border-border/40 text-muted-foreground hover:text-foreground hover:bg-muted/20 hover:border-brand-blue/30 transition-all py-2 md:py-2.5 rounded-lg tactical-label text-[9px] md:text-[10px] whitespace-nowrap"
          >
            Contact Us
          </button>
        </div>
      </div>
    </motion.div>
  );
}
