"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Filter, 
  Search, 
  Grid, 
  Layout, 
  X, 
  MapPin, 
  ArrowRight, 
  Phone,
  Zap,
  ShieldCheck,
  Building2,
  Trees,
  Home,
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Static Data based on real project files
const PROJECTS_DATA = [
  {
    id: "dolphin-plaza",
    slug: "dolphin-plaza",
    name: "Dolphin Plaza",
    status: "Under Construction",
    city: "Sukkur",
    location: "Race Course Road, Sukkur",
    image: "/dp-images/dp-1.jpg",
    shortDescription: "A 10-story modern high-rise offering luxury apartments and prime commercial shops on Race Course Road, Sukkur.",
    amenities: [
      { icon: Building2, label: "10-Story Structure" },
      { icon: Tag, label: "Commercial Frontage" },
      { icon: ShieldCheck, label: "Privacy-Focused" },
      { icon: Trees, label: "Integrated Greenery" }
    ],
    contactPhone: "0370 2502769"
  },
  {
    id: "dolphin-tower",
    slug: "dolphin-tower",
    name: "Dolphin Tower & Shopping Mall",
    status: "Completed",
    city: "Sukkur",
    location: "Minara Road, Sukkur",
    image: "/dt-images/dt-1.jpg",
    shortDescription: "A premier mixed-use landmark in Sukkur, integrating one of the city's first multi-brand shopping malls with high-end residential living.",
    amenities: [
      { icon: Zap, label: "Standby Generators" },
      { icon: ShieldCheck, label: "24/7 Security" },
      { icon: Home, label: "Luxury Apartments" },
      { icon: Tag, label: "Shopping Mall" }
    ],
    contactPhone: "0370 2502769"
  },
  {
    id: "dream-city",
    slug: "dream-city",
    name: "Dream City Housing Scheme Sukkur",
    status: "Under Construction",
    city: "Sukkur",
    location: "Main Shikarpur Road near Dua Hotel, Sukkur",
    image: "/dc-images/dc-p1.jpg",
    shortDescription: "A premier gated housing scheme offering residential and commercial plots with modern infrastructure, family parks, and highway connectivity.",
    amenities: [
      { icon: Home, label: "Residential Plots" },
      { icon: Tag, label: "Commercial Plots" },
      { icon: ShieldCheck, label: "Gated Security" },
      { icon: Zap, label: "Modern Infrastructure" }
    ],
    contactPhone: "0310 2287402"
  },
  {
    id: "river-view",
    slug: "river-view",
    name: "Dolphin River View",
    status: "Under Construction",
    city: "Sukkur",
    location: "Bunder Road, Sukkur",
    image: "/river-view/rv-p1.png",
    shortDescription: "A high-end mixed-use development combining super luxury residential units with a flagship shopping destination and scenic river views.",
    amenities: [
      { icon: ShieldCheck, label: "Advanced Security" },
      { icon: Building2, label: "Premium Finishes" },
      { icon: Zap, label: "Commercial Hub" },
      { icon: Trees, label: "River Balconies" }
    ],
    contactPhone: "0370 2502769"
  }
];

export function ProjectsSection() {
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCity, setFilterCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [layoutView, setLayoutView] = useState<"magazine" | "grid">("magazine");
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle sticky bar state
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cities = ["All", ...Array.from(new Set(PROJECTS_DATA.map(p => p.city)))];
  const statuses = ["All", "Upcoming", "Under Construction", "Completed"];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter(project => {
      const matchStatus = filterStatus === "All" || project.status === filterStatus;
      const matchCity = filterCity === "All" || project.city === filterCity;
      const matchSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchCity && matchSearch;
    });
  }, [filterStatus, filterCity, searchQuery]);

  const activeFilters = useMemo(() => {
    const filters = [];
    if (filterStatus !== "All") filters.push({ type: "status", label: filterStatus });
    if (filterCity !== "All") filters.push({ type: "city", label: filterCity });
    if (searchQuery) filters.push({ type: "search", label: `Search: ${searchQuery}` });
    return filters;
  }, [filterStatus, filterCity, searchQuery]);

  const removeFilter = (filter: any) => {
    if (filter.type === "status") setFilterStatus("All");
    if (filter.type === "city") setFilterCity("All");
    if (filter.type === "search") setSearchQuery("");
  };

  return (
    <section className="bg-background pb-32">
      {/* Sticky Filter Bar */}
      <div className={cn(
        "sticky top-0 z-[100] transition-all duration-500",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-4" : "bg-transparent py-4 md:py-8"
      )}>
        <div className="container mx-auto px-6 space-y-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Status Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={cn(
                    "px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300",
                    filterStatus === status 
                      ? "bg-brand-blue text-white shadow-[0_10px_20px_rgba(26,106,255,0.3)]" 
                      : "bg-white border border-gray-200 text-[#373635]/60 hover:border-brand-blue/30"
                  )}
                >
                  {status}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 w-full lg:w-auto">
              {/* Result Count */}
              <div className="hidden lg:block text-[11px] font-black uppercase tracking-widest text-[#373635]/40 border-r border-gray-200 pr-6 mr-2">
                Showing {filteredProjects.length} of {PROJECTS_DATA.length} Projects
              </div>

              {/* City Dropdown */}
              <div className="relative flex-1 lg:flex-none">
                <select 
                  value={filterCity}
                  onChange={(e) => setFilterCity(e.target.value)}
                  className="w-full lg:w-48 bg-white border border-gray-200 rounded-xl px-5 py-3 text-[11px] font-black uppercase tracking-widest outline-none focus:border-brand-blue/30 transition-all appearance-none cursor-pointer"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city === "All" ? "All Cities" : city}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                  <Layout size={14} />
                </div>
              </div>

              {/* Search */}
              <div className="relative flex-1 lg:w-64">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-[11px] font-black uppercase tracking-widest outline-none focus:border-brand-blue/30 transition-all"
                />
              </div>

              {/* Layout Toggle */}
              <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setLayoutView("magazine")}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    layoutView === "magazine" ? "bg-white text-brand-blue shadow-sm" : "text-gray-400"
                  )}
                >
                  <Layout size={18} />
                </button>
                <button
                  onClick={() => setLayoutView("grid")}
                  className={cn(
                    "p-2 rounded-lg transition-all",
                    layoutView === "grid" ? "bg-white text-brand-blue shadow-sm" : "text-gray-400"
                  )}
                >
                  <Grid size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Pills */}
          <AnimatePresence>
            {activeFilters.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-wrap items-center gap-2 pt-2"
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-[#373635]/40 mr-2">Active Filters:</span>
                {activeFilters.map((filter, i) => (
                  <button
                    key={i}
                    onClick={() => removeFilter(filter)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-brand-blue/5 border border-brand-blue/20 text-brand-blue text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-brand-blue/10 transition-all"
                  >
                    {filter.label}
                    <X size={12} />
                  </button>
                ))}
                <button 
                  onClick={() => { setFilterStatus("All"); setFilterCity("All"); setSearchQuery(""); }}
                  className="text-[9px] font-black uppercase tracking-widest text-[#373635]/40 hover:text-brand-blue transition-colors ml-2"
                >
                  Clear All
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Listings */}
      <div className="container mx-auto px-6 mt-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-32 text-center"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter size={32} className="text-gray-300" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter italic text-gray-800">No results found</h3>
              <p className="text-gray-400 mt-2">Adjust your filters to see more projects.</p>
            </motion.div>
          ) : (
            <div className={cn(
              "transition-all duration-700",
              layoutView === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10" 
                : "grid grid-cols-1 lg:grid-cols-2 gap-10"
            )}>
              {filteredProjects.map((project, idx) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={idx}
                  layoutView={layoutView}
                  isFullWidth={layoutView === "magazine" && idx === 3}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, layoutView, isFullWidth }: { 
  project: any, 
  index: number, 
  layoutView: "magazine" | "grid",
  isFullWidth?: boolean 
}) {
  const isLarge = layoutView === "magazine" && index === 0;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "group bg-white rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden border border-gray-100 hover:border-brand-blue/20 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)]",
        isLarge && "lg:row-span-2",
        isFullWidth && "lg:col-span-2"
      )}
    >
      <div className={cn(
        "flex flex-col h-full",
        isFullWidth ? "lg:flex-row" : ""
      )}>
        {/* Image Section */}
        <div className={cn(
          "relative overflow-hidden",
          isLarge ? "h-[320px] sm:h-[420px] lg:h-full" : "h-[220px] sm:h-[240px]",
          isFullWidth ? "lg:w-[40%] lg:h-[400px]" : "w-full"
        )}>
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
          />
          
          {/* Status Badge */}
          <div className={cn(
            "absolute top-4 right-4 sm:top-6 sm:right-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg z-20",
            project.status === "Completed" ? "bg-[#25D366] text-white" : "bg-brand-blue text-white"
          )}>
            {project.status}
          </div>

          {/* Location Badge */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-20 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-lg">
              {project.city} Central
            </span>
          </div>

          {/* Hover Overlay & Slide-up Buttons */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-4 z-30">
            <Link 
              href={`/projects/${project.slug}`}
              className="bg-white text-black px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-0 shadow-2xl flex items-center gap-2 hover:bg-brand-blue hover:text-white"
            >
              View Details <ArrowRight size={14} />
            </Link>
            <button 
              className="bg-black/50 backdrop-blur-md text-white border border-white/20 px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75 shadow-2xl flex items-center gap-2 hover:bg-white hover:text-black"
            >
              Contact Us <Phone size={14} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className={cn(
          "p-6 sm:p-8 flex flex-col justify-between",
          isFullWidth ? "lg:w-[60%]" : "flex-1"
        )}>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter italic text-[#373635] group-hover:text-brand-blue transition-colors duration-500">
                {project.name}
              </h3>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-gray-400">
                <MapPin size={12} className="text-brand-blue" />
                <span>{project.location}</span>
              </div>
            </div>

            <p className={cn(
              "text-sm text-gray-500 leading-relaxed font-medium",
              !isFullWidth && "line-clamp-2"
            )}>
              {project.shortDescription}
            </p>

            {/* Amenity Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.amenities.slice(0, isFullWidth ? 4 : 2).map((amenity: any, i: number) => (
                <span 
                  key={i} 
                  className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[9px] font-black uppercase tracking-widest text-gray-400 group-hover:border-brand-blue/20 group-hover:text-[#373635] transition-all"
                >
                  <amenity.icon size={12} className="text-brand-blue/50" />
                  {amenity.label}
                </span>
              ))}
              {!isFullWidth && (
                <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 text-brand-blue/40">
                  +2 Assets
                </span>
              )}
            </div>
          </div>

          {/* Action Row - Mobile Visible only or Grid View */}
          <div className={cn(
            "pt-8 flex gap-4",
            isFullWidth || isLarge ? "lg:hidden" : ""
          )}>
            <Link 
              href={`/projects/${project.slug}`}
              className="flex-1 bg-brand-blue text-white py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all shadow-lg"
            >
              View Details <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 4 Specific View Details Button */}
          {isFullWidth && (
            <div className="hidden lg:block pt-8">
              <Link 
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-4 text-[13px] font-black uppercase tracking-widest text-black hover:text-brand-blue transition-all group/btn"
              >
                View Project Intelligence 
                <div className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center group-hover/btn:bg-brand-blue group-hover:text-white transition-all">
                  <ArrowRight size={18} />
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
