"use client";

import React, { useState, useMemo } from "react";
import { Project } from "@/types";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { EnquireModal } from "@/components/ui/EnquireModal";
import { ChevronDown, Filter, Search, Grid, LayoutGrid } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectsClientProps {
  initialProjects: Project[];
  initialStatus?: string;
  initialFeatured?: boolean;
}

export function ProjectsClient({ 
  initialProjects, 
  initialStatus = "All", 
  initialFeatured = false 
}: ProjectsClientProps) {
  const [filterFeatured, setFilterFeatured] = useState(initialFeatured);
  const [filterStatus, setFilterStatus] = useState(initialStatus);
  const [filterCity, setFilterCity] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleEnquire = (project: Project) => {
    setSelectedProject(project);
    setIsEnquireOpen(true);
  };

  const normalizedProjects = useMemo(() => {
    return initialProjects.map(p => ({
      ...p,
      city: p.city.charAt(0).toUpperCase() + p.city.slice(1).toLowerCase()
    }));
  }, [initialProjects]);

  const cities = useMemo(() => {
    const allCities = normalizedProjects.map((p) => p.city);
    return ["All", ...Array.from(new Set(allCities))];
  }, [normalizedProjects]);

  const statuses = ["All", "Upcoming", "Under Construction", "Completed"];

  const filteredProjects = useMemo(() => {
    return normalizedProjects.filter((project) => {
      const matchFeatured = !filterFeatured || project.featured.isFeatured;
      
      // Flexible status matching
      const projectStatus = project.status.toLowerCase();
      const targetStatus = filterStatus.toLowerCase();
      
      let matchStatus = targetStatus === "all" || projectStatus === targetStatus;
      
      // Status aliases (Bi-directional)
      if (!matchStatus) {
        // Upcoming / Launching Soon
        const upcomingAliases = ["upcoming", "launching soon", "new launch"];
        if (upcomingAliases.includes(targetStatus) && upcomingAliases.includes(projectStatus)) {
          matchStatus = true;
        }
        
        // Ongoing / Under Construction
        const ongoingAliases = ["ongoing", "under construction"];
        if (ongoingAliases.includes(targetStatus) && ongoingAliases.includes(projectStatus)) {
          matchStatus = true;
        }
      }

      const matchCity = filterCity === "All" || project.city === filterCity;
      const matchSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFeatured && matchStatus && matchCity && matchSearch;
    });
  }, [normalizedProjects, filterFeatured, filterStatus, filterCity, searchQuery]);

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-16 pb-24"
    >
      {/* Dynamic Filter Tags */}
      <div className="bg-background pt-12 pb-8 sticky top-[88px] z-30 border-b border-border/40 backdrop-blur-xl">
        <div className="container mx-auto px-6 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setFilterStatus(status);
                    setVisibleCount(6);
                  }}
                  className={cn(
                    "px-8 py-3 rounded-2xl tactical-label transition-all duration-300",
                    filterStatus === status 
                      ? "bg-brand-blue text-white shadow-[0_10px_30px_rgba(90,161,255,0.3)] scale-105" 
                      : "bg-bg-card border border-border/40 text-muted-foreground hover:border-brand-blue/30 hover:text-foreground"
                  )}
                >
                  {status === "Under Construction" ? "Under Construction" : status}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Secondary City Filter */}
              <div className="relative">
                <button
                  onClick={() => setOpenDropdown(openDropdown === "City" ? null : "City")}
                  className="flex items-center gap-4 bg-bg-card border border-border/40 rounded-xl px-5 py-3 tactical-label transition-all hover:border-brand-blue/30 text-foreground group"
                >
                  <LayoutGrid size={14} className="text-brand-blue" />
                  <span>{filterCity === "All" ? "All Cities" : filterCity}</span>
                  <ChevronDown className={cn("transition-transform duration-300", openDropdown === "City" && "rotate-180")} size={12} />
                </button>
                
                <AnimatePresence>
                  {openDropdown === "City" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 min-w-[200px]"
                    >
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => {
                            setFilterCity(city);
                            setOpenDropdown(null);
                          }}
                          className={cn(
                            "w-full text-left px-5 py-3 rounded-xl tactical-label transition-all",
                            filterCity === city ? "bg-brand-blue text-white" : "hover:bg-brand-blue/5"
                          )}
                        >
                          {city === "All" ? "All Cities" : city}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Bar */}
              <div className="relative flex-grow md:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/30" size={14} />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-bg-card border border-border/40 rounded-xl pl-10 pr-4 py-3 tactical-label outline-none focus:border-brand-blue/50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="container mx-auto px-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {displayedProjects.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {displayedProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <ProjectCard project={project} onEnquire={handleEnquire} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-48 text-center space-y-8"
            >
              <div className="w-24 h-24 bg-brand-blue/5 border border-brand-blue/10 rounded-full flex items-center justify-center mx-auto">
                <Filter size={32} className="text-brand-blue/20" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black uppercase tracking-tighter italic text-foreground">No Projects Found</h3>
                <p className="tactical-label text-muted-foreground/80">Try adjusting your search filters.</p>
              </div>
              <button 
                onClick={() => { 
                  setFilterStatus("All"); 
                  setFilterCity("All"); 
                  setSearchQuery(""); 
                  setFilterFeatured(false);
                }}
                className="tactical-label text-brand-blue hover:text-foreground transition-colors"
              >
                [ Reset Filters ]
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load More */}
        {visibleCount < filteredProjects.length && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-32 text-center"
          >
            <button 
              onClick={() => setVisibleCount(v => v + 6)}
              className="btn-brand px-16 py-5 text-[12px] shadow-[0_0_40px_rgba(90,161,255,0.2)] group relative overflow-hidden"
            >
              <span className="relative z-10">Load More Projects</span>
              <div className="absolute inset-0 bg-brand-blue/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
            </button>
          </motion.div>
        )}
      </div>

      <EnquireModal 
        isOpen={isEnquireOpen} 
        onClose={() => setIsEnquireOpen(false)} 
        projectName={selectedProject?.name}
      />
    </motion.div>
  );
}
