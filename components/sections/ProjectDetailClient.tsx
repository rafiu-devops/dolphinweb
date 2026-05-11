"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Building, Ruler, Tag, Shield, Zap, Home,
  Camera, WavesLadder, Coffee, Trees, Car, ArrowLeft, ChevronLeft, ChevronRight,
  Download, Crosshair, Box, TrendingUp, Heart, Info,
  Phone, Mail, Globe, Send, Loader2, CheckCircle2,
  Calendar, Layers, Map as MapIcon, Star, X, Road, Trophy
} from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { EnquireModal } from "@/components/ui/EnquireModal";
import { Project } from "@/types";
import { FaWhatsapp, FaFacebook } from "react-icons/fa6";
import { useState, useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 }
};

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const iconMap: any = {
    WavesLadder, Home, Camera, Trees, Car, Coffee, Shield, Zap, Building, MapPin,
    Tag, Download, Globe, TrendingUp, Layers, Ruler, Calendar, Star, Info,
    Mail, Phone, Send, Loader2, CheckCircle2, Crosshair, Box, FaWhatsapp, FaFacebook, X, Road, Trophy
  };

  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"exterior" | "interior" | "layouts">("exterior");

  const categories = useMemo(() => project.detailsPage.galleryCategories || {
    exterior: project.detailsPage.gallery || [],
    interior: [],
    layouts: []
  }, [project]);

  const currentGalleryImages = useMemo(() => {
    const raw = categories[activeCategory] || [];
    return raw.filter((img): img is string => typeof img === 'string' && img.trim().length > 0);
  }, [categories, activeCategory]);
  const [mounted, setMounted] = useState(false);
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);

  // Gallery navigation handlers
  const handlePrevGallery = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedGalleryIndex === null) return;
    setSelectedGalleryIndex((prev) => 
      prev !== null ? (prev - 1 + currentGalleryImages.length) % currentGalleryImages.length : null
    );
  };

  const handleNextGallery = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedGalleryIndex === null) return;
    setSelectedGalleryIndex((prev) => 
      prev !== null ? (prev + 1) % currentGalleryImages.length : null
    );
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedGalleryIndex === null) return;
      if (e.key === "ArrowLeft") handlePrevGallery();
      if (e.key === "ArrowRight") handleNextGallery();
      if (e.key === "Escape") setSelectedGalleryIndex(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedGalleryIndex, currentGalleryImages.length]);

  useEffect(() => {
    setMounted(true);
  }, []);


  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const heroImages = useMemo(() => {
    // If heroThumbnails is manually provided in the JSON, use it exclusively
    if (project.detailsPage.heroThumbnails && project.detailsPage.heroThumbnails.length > 0) {
      return project.detailsPage.heroThumbnails;
    }

    const gallery = project.detailsPage.gallery || [];
    const exterior = project.detailsPage.galleryCategories?.exterior || [];
    const sources = Array.from(new Set([project.detailsPage.heroImage, ...gallery, ...exterior]))
      .filter((src): src is string => typeof src === 'string' && src.trim().length > 0);

    return sources.length > 0 ? sources : ["/assets/projects/placeholder.png"];
  }, [project]);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const timer = setInterval(() => {
      setActiveHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleEnquire = (p: Project) => {
    setSelectedProject(p);
    setIsEnquireOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 5000);
  };

  if (!mounted) return null;

  return (
    <div className="flex flex-col bg-background overflow-x-hidden">

      {/* 1. PROJECT HERO SHOWCASE */}
      <section className="pt-48 md:pt-64 pb-16 bg-background">
        <div className="container mx-auto px-6 space-y-12">
          {/* Breadcrumbs */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 tactical-label text-muted-foreground/80">
            <Link href="/" prefetch={false} className="hover:text-brand-blue transition-colors">Home</Link>
            <div className="w-[1px] h-3 bg-muted-foreground/30 mx-1" />
            <span className="text-brand-blue">{project.name}</span>
          </motion.div>

          {/* Header Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-12"
          >
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20">
                <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                <span className="tactical-label text-brand-blue">{project.status}</span>
              </div>
              <h1 className={cn(
                "text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase italic leading-[0.9] flex flex-wrap gap-x-4",
                project.name.length < 25 
                  ? "lg:text-7xl xl:text-8xl lg:flex-nowrap lg:whitespace-nowrap" 
                  : "lg:text-8xl"
              )}>
                {project.name.split(' ').slice(0, -1).join(' ')}
                <span className="text-brand-blue">{project.name.split(' ').slice(-1)}</span>
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground font-bold italic tracking-tight max-w-3xl">
                {project.detailsPage.introduction || project.projectCard.shortDescription}
              </p>
            </div>

            {/* Location Tag - Moved back to White Space */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-white border border-border/40 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <MapPin size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Located At</span>
                  <span className="text-[12px] sm:text-sm font-black uppercase tracking-tight text-foreground">{project.location}, {project.city}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Showcase Display */}
          {/* Image Showcase Display - Reduced Dimensions */}
          <div className="flex flex-col gap-6 max-w-6xl mx-auto">
            <div className="relative w-full h-[350px] md:h-[480px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-border/40 group bg-black shadow-4xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeHeroIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img
                      src={heroImages[activeHeroIndex] || "/assets/projects/placeholder.png"}
                      className="w-full h-full object-cover blur-3xl opacity-40 scale-110"
                      alt="Blur background"
                    />
                  </div>
                  <img
                    src={heroImages[activeHeroIndex] || "/assets/projects/placeholder.png"}
                    className="relative z-10 w-full h-full object-contain"
                    alt={project.name}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Navigation Arrows */}
              <div className="absolute bottom-8 left-8 hidden md:flex gap-4 z-20">
                <button onClick={() => setActiveHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)} className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-brand-blue hover:text-black transition-all">
                  <ArrowLeft size={16} />
                </button>
                <button onClick={() => setActiveHeroIndex((prev) => (prev + 1) % heroImages.length)} className="w-11 h-11 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-brand-blue hover:text-black transition-all rotate-180">
                  <ArrowLeft size={16} />
                </button>
              </div>
            </div>

            {/* Thumbnails Row - Small & Professional */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 px-2">
              {heroImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHeroIndex(idx)}
                  className={cn(
                    "relative w-16 h-12 md:w-24 md:h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0",
                    activeHeroIndex === idx ? "border-brand-blue scale-[0.95] shadow-glow-sm" : "border-transparent opacity-40 hover:opacity-100"
                  )}
                >
                  <img src={img || "/assets/projects/placeholder.png"} className="w-full h-full object-cover" alt={`Thumbnail ${idx}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROJECT INTRODUCTION & OVERVIEW */}
      <section className="py-16 sm:py-32 bg-bg-card border-y border-border/40">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeInUp} className="space-y-10">
            <div className="space-y-6">
              <h2 className="section-heading">Project <span className="text-brand-blue">Overview</span></h2>
              <div className="w-24 h-[2px] bg-brand-blue" />
            </div>
            <div className="text-xl text-foreground/80 leading-relaxed italic font-medium space-y-6">
              {project.detailsPage.fullDescription.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>


          </motion.div>

          <motion.div {...fadeInUp} className="relative aspect-square rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden border border-border/40 shadow-4xl group">
            <img
              src={project.detailsPage.overviewImage || project.detailsPage.heroImage || project.detailsPage.gallery[0] || "/assets/projects/placeholder.png"}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-blue/5 pointer-events-none group-hover:bg-transparent transition-colors duration-1000" />
          </motion.div>
        </div>
      </section>

      {/* 3. WHAT THIS PROJECT OFFERS (OFFERINGS) */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 space-y-20">
          <div className="text-center space-y-6">
            <h2 className="section-heading tracking-tighter">What This Project <span className="text-brand-blue">Offers</span></h2>
            <p className="tactical-label text-muted-foreground/80">Prime Location's Approved by government of sindh.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {(project.detailsPage.offerings || [
              { icon: "Building", label: "Corporate Offices" },
              { icon: "Tag", label: "Commercial Shops" },
              { icon: "Box", label: "Luxury Showrooms" },
              { icon: "Home", label: "Residential Suites" }
            ]).map((offer, idx) => {
              const Icon = iconMap[offer.icon] || Building;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -10 }}
                  className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(25%-2rem)] min-w-[280px] p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-bg-card border border-border/40 text-center space-y-6 hover:border-brand-blue/40 transition-all group"
                >
                  <div className="w-20 h-20 bg-white border-2 border-black text-brand-blue rounded-3xl flex items-center justify-center mx-auto transition-all group-hover:bg-brand-blue group-hover:text-black shadow-lg">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-xl font-black uppercase italic tracking-tight">{offer.label}</h3>
                  <p className="tactical-description text-xs">Engineered for high utility and maximum commercial visibility.</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ASSET INVENTORY (AVAILABLE SPACES) */}
      <section className="py-24 bg-bg-card border-y border-border/40">
        <div className="container mx-auto px-6 space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6">
              <h2 className="section-heading">
                {project.slug === "dolphin-tower" ? "What This Project " : "Available "}
                <span className="text-brand-blue">{project.slug === "dolphin-tower" ? "Includes" : "Spaces"}</span>
              </h2>
              <p className="tactical-label text-muted-foreground/80">
                {project.slug === "dolphin-tower"
                  ? "Key commercial, corporate, and residential facilities integrated within the Dolphin Tower development."
                  : "Operational Blueprint & Inventory Specs"}
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-[3rem] border border-border/40 shadow-4xl bg-background">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="p-6 md:p-10 tactical-label">
                      {project.slug === "dolphin-tower" ? "What This Project Includes" : "Unit Classification"}
                    </th>
                    <th className={cn(
                      "p-6 md:p-10 tactical-label",
                      project.slug === "dolphin-tower" ? "text-right" : ""
                    )}>
                      {project.slug === "dolphin-tower" ? "Details" : "Area Footprint"}
                    </th>
                    {project.slug !== "dolphin-tower" && <th className="p-6 md:p-10 tactical-label text-right">Acquisition State</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20 font-black uppercase tracking-tight italic">
                  {project.detailsPage.unitTypes.map((unit, idx) => (
                    <tr key={idx} className="hover:bg-brand-blue/[0.03] transition-colors group">
                      <td className="p-6 md:p-10">
                        <div className="flex items-center gap-4 md:gap-6">
                          <div className="w-1.5 md:w-2 h-8 md:h-10 bg-brand-blue/20 rounded-full group-hover:bg-brand-blue transition-colors" />
                          <span className="text-base md:text-lg text-foreground">{unit.type}</span>
                        </div>
                      </td>
                      <td className={cn(
                        "p-6 md:p-10 text-lg md:text-xl",
                        project.slug === "dolphin-tower" ? "text-right text-brand-blue" : "text-muted-foreground"
                      )}>{unit.size}</td>
                      {project.slug !== "dolphin-tower" && (
                        <td className="p-6 md:p-10 text-right">
                          <span className="text-brand-blue text-[10px] md:text-sm border border-brand-blue/20 px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-brand-blue/5">Available</span>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROJECT SPECIFICATIONS GRID */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 space-y-20">
          <h2 className="section-heading text-center">Project <span className="text-brand-blue">Specifications</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Building, label: "Asset Type", value: project.detailsPage.specifications.projectType },
              { icon: Layers, label: "Structural Levels", value: project.detailsPage.specifications.floors || "N/A" },
              { icon: Box, label: "Inventory Count", value: project.detailsPage.specifications.totalUnits || "N/A" },
              { icon: Calendar, label: "Deployment Year", value: project.detailsPage.specifications.completionYear || "N/A" },
              { icon: Ruler, label: "Total Terrain", value: project.detailsPage.specifications.totalArea || "N/A" },
              { icon: Crosshair, label: "Current Status", value: project.status },
              { icon: Shield, label: "Compliance", value: "LDA/SDA Verified" },
              { icon: Globe, label: "Investment Tier", value: "Executive" },
            ].map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div key={idx} className="flex flex-col gap-5 p-7 rounded-3xl bg-bg-card border-l-4 border-brand-blue shadow-lg hover:shadow-2xl transition-all h-full">
                  <div className="text-brand-blue"><Icon size={28} /></div>
                  <div className="space-y-2">
                    <span className="tactical-label text-[10px] text-muted-foreground/80 leading-none">{spec.label}</span>
                    <p className="text-base md:text-lg font-black uppercase italic tracking-tight text-foreground leading-tight">{spec.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FEATURES & AMENITIES */}
      <section className="py-32 bg-black text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-brand-blue/[0.02] pointer-events-none" />
        <div className="container mx-auto px-6 space-y-20 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Strategic <span className="text-brand-blue">Facilities</span></h2>
              <p className="tactical-label text-white/60">Mission-Critical Amenities for High-End Living</p>
            </div>
            <div className="h-[1px] flex-grow bg-white/10 hidden md:block" />
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {project.detailsPage.amenities.map((amenity, idx) => {
              const Icon = iconMap[amenity.icon] || Shield;
              return (
                <div key={idx} className="flex flex-col gap-6 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] min-w-[280px] p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                  <div className="w-16 h-16 bg-brand-blue text-black rounded-2xl flex items-center justify-center shadow-glow-sm transition-transform group-hover:scale-110">
                    <Icon size={28} />
                  </div>
                  <span className="tactical-label text-white/90 italic">{amenity.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. LOCATION & ACCESSIBILITY (WITH PROJECT CONTACT) */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <motion.div {...fadeInUp} className="space-y-12">
              <div className="space-y-6">
                <h2 className="section-heading">Location & <span className="text-brand-blue">Accessibility</span></h2>
                <p className="text-lg text-muted-foreground font-bold italic leading-relaxed">
                  Strategically positioned at {project.location}, {project.city}. This operational sector offers maximum visibility and optimized logistics.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <h3 className="tactical-label text-brand-blue mb-4">Tactical Landmarks</h3>
                {project.detailsPage.landmarks?.map((lm, i) => {
                  const Icon = iconMap[lm.icon] || MapPin;
                  return (
                    <div key={i} className="flex items-center justify-between p-8 rounded-3xl bg-bg-card border border-border/40 hover:border-brand-blue/30 transition-all">
                      <div className="flex items-center gap-6">
                        <Icon size={24} className="text-brand-blue" />
                        <span className="text-sm font-black uppercase tracking-widest text-foreground">{lm.name}</span>
                      </div>
                      <span className="text-xs font-black text-brand-blue italic">{lm.distance}</span>
                    </div>
                  );
                })}
              </div>

              {/* PROJECT SPECIFIC CONTACT */}
              <div className="p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-black text-white space-y-8 sm:space-y-10 shadow-4xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-brand-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Contact <span className="text-brand-blue">Information</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.location.href = `tel:${project.detailsPage.projectContact?.phone}`}>
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-black transition-all"><Phone size={20} /></div>
                    <div className="flex flex-col min-w-0">
                      <span className="tactical-label text-white/60 whitespace-nowrap">Contact Hot-line</span>
                      <span className="text-lg font-black tracking-widest whitespace-nowrap">{project.detailsPage.projectContact?.phone || "+92 347 0139661"}</span>
                    </div>
                  </div>
                  {project.detailsPage.projectContact?.email && (
                    <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.location.href = `mailto:${project.detailsPage.projectContact?.email}`}>
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-black transition-all"><Mail size={20} /></div>
                      <div className="flex flex-col min-w-0">
                        <span className="tactical-label text-white/60 whitespace-nowrap">Transmission Email</span>
                        <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-widest break-all">{project.detailsPage.projectContact?.email}</span>
                      </div>
                    </div>
                  )}
                  {project.detailsPage.projectContact?.whatsapp && (
                    <div
                      className="flex items-center gap-6 group cursor-pointer"
                      onClick={() => {
                        const wa = project.detailsPage.projectContact?.whatsapp;
                        if (wa) window.open(`https://wa.me/${wa.replace(/\D/g, '')}`, '_blank');
                      }}
                    >
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-all"><FaWhatsapp size={20} /></div>
                      <div className="flex flex-col min-w-0">
                        <span className="tactical-label text-white/60 whitespace-nowrap">WhatsApp Sync</span>
                        <span className="text-lg font-black tracking-widest text-[#25D366] whitespace-nowrap">Chat Now</span>
                      </div>
                    </div>
                  )}
                  {project.detailsPage.projectContact?.facebook && (
                    <div
                      className="flex items-center gap-6 group cursor-pointer"
                      onClick={() => {
                        const fb = project.detailsPage.projectContact?.facebook;
                        if (fb) window.open(fb, '_blank');
                      }}
                    >
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white transition-all"><FaFacebook size={20} /></div>
                      <div className="flex flex-col min-w-0">
                        <span className="tactical-label text-white/60 whitespace-nowrap">Digital Hub</span>
                        <span className="text-lg font-black tracking-widest text-[#1877F2] whitespace-nowrap">Facebook Page</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} className="h-[800px] rounded-[4rem] overflow-hidden border-8 border-bg-card shadow-4xl relative">
              {project.detailsPage.mapEmbedUrl && project.detailsPage.mapEmbedUrl.trim() !== "" ? (
                <iframe
                  src={project.detailsPage.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(185deg) contrast(120%) brightness(85%)' }}
                  allowFullScreen={true}
                  loading="lazy"
                ></iframe>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-card/40 backdrop-blur-md text-muted-foreground p-10 text-center">
                  <MapPin size={48} className="mb-4 opacity-20" />
                  <p className="tactical-label text-muted-foreground/80">Tactical Location Data Pending Deployment</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. WHY INVEST IN THIS PROJECT */}
      <section className="py-32 bg-bg-card border-y border-border/40">
        <div className="container mx-auto px-6 space-y-20">
          <div className="text-center space-y-6">
            <h2 className="section-heading tracking-tighter">Why <span className="text-brand-blue">Invest</span> Here?</h2>
            <p className="tactical-label text-muted-foreground/80">Strategic Rationale & Economic Forecast</p>
          </div>

          <div className="flex flex-wrap justify-center gap-12">
            {(project.detailsPage.investmentBenefits || [
              "High Yield Rental Demand",
              "Rapid Capital Appreciation",
              "Verified Secure Documentation",
              "Prime Urban Connectivity",
              "Eco-Sustainable Architecture"
            ]).slice(0, 3).map((benefit, i) => (
              <div key={i} className="w-full md:w-[calc(50%-3rem)] lg:w-[calc(33.33%-3rem)] min-w-[300px] p-12 rounded-[3.5rem] bg-background border border-border/40 hover:border-brand-blue/40 transition-all group relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-[10rem] font-black italic text-brand-blue/5 group-hover:text-brand-blue/10 transition-colors">{i + 1}</div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center shadow-glow-sm"><TrendingUp size={32} /></div>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-tight">{benefit}</h3>
                  <p className="text-sm text-muted-foreground font-medium italic leading-relaxed">A high-priority investment zone targeted for double-digit growth by 2026. Data-driven asset selection.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CATEGORIZED GALLERY */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 space-y-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4">
              <h2 className="section-heading"><span className="text-brand-blue">Gallery</span></h2>
              <p className="tactical-label text-muted-foreground/80">Categorized Architectural Intelligence</p>
            </div>

            <div className="flex flex-wrap p-2 bg-bg-card border border-border/40 rounded-2xl md:rounded-3xl shadow-xl">
              {(["exterior", "interior", "layouts"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "flex-1 px-4 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl tactical-label transition-all text-[10px] md:text-[12px]",
                    activeCategory === cat ? "bg-brand-blue text-white shadow-glow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {currentGalleryImages.length > 0 ? (
                currentGalleryImages.map((img, idx) => (
                  <motion.div
                    key={`${activeCategory}-${idx}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden border border-border/40 shadow-2xl cursor-zoom-in"
                    onClick={() => setSelectedGalleryIndex(idx)}
                  >
                    <img src={img || "/assets/projects/placeholder.png"} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={`Asset ${idx}`} />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute bottom-8 left-8 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                      <Camera size={18} />
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-40 text-center border-2 border-dashed border-border/40 rounded-[3rem] text-muted-foreground font-black uppercase tracking-[0.5em] italic opacity-40">
                  Visual data not yet deployed for this sub-sector.
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 10. INQUIRY FORM (LEAD GENERATION) */}
      <section id="enquire" className="py-20 bg-background overflow-hidden relative border-t border-border/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground">Contact <span className="text-brand-blue">Us</span></h3>
                <p className="text-base md:text-lg text-muted-foreground font-bold uppercase tracking-[0.1em] leading-relaxed max-w-xl">Our high-tier asset management team will process your strategic interest within 24 operational hours.</p>
              </div>
            </div>

            <div className="bg-brand-blue p-8 sm:p-12 md:p-16 rounded-[2.5rem] sm:rounded-[4rem] relative shadow-4xl">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center space-y-8">
                    <div className="w-24 h-24 bg-white text-brand-blue rounded-[2rem] flex items-center justify-center mx-auto shadow-glow-md animate-bounce"><CheckCircle2 size={48} /></div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black uppercase italic text-white">Transmission Received</h3>
                      <p className="tactical-label text-white/80">Stand by for tactical agent follow-up.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/70 ml-4">Identity</label>
                        <input required type="text" placeholder="YOUR NAME" className="w-full bg-white/10 border border-white/20 p-5 rounded-2xl text-white font-bold tracking-widest focus:border-white outline-none transition-all placeholder:text-white/30" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/70 ml-4">Secure Email</label>
                        <input required type="email" placeholder="EMAIL ADDRESS" className="w-full bg-white/10 border border-white/20 p-5 rounded-2xl text-white font-bold tracking-widest focus:border-white outline-none transition-all placeholder:text-white/30" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/70 ml-4">Tactical Number</label>
                        <input required type="tel" placeholder="PHONE / WHATSAPP" className="w-full bg-white/10 border border-white/20 p-5 rounded-2xl text-white font-bold tracking-widest focus:border-white outline-none transition-all placeholder:text-white/30" />
                      </div>
                    </div>
                    <button disabled={isSubmitting} className="w-full bg-white text-brand-blue hover:bg-black hover:text-white py-6 rounded-2xl text-[14px] font-black shadow-xl mt-4 transition-all flex items-center justify-center gap-3">
                      {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Send Message</>}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedGalleryIndex !== null && currentGalleryImages[selectedGalleryIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10"
            onClick={() => setSelectedGalleryIndex(null)}
          >
            {/* Header / Info */}
            <div className="absolute top-0 left-0 right-0 p-6 md:p-10 flex items-center justify-between z-[110] pointer-events-none">
              <div className="bg-black/20 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl pointer-events-auto">
                <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/60">
                  Sector: <span className="text-brand-blue">{activeCategory}</span> — Image <span className="text-white">{selectedGalleryIndex + 1} / {currentGalleryImages.length}</span>
                </span>
              </div>
              
              <button
                className="w-12 h-12 md:w-16 md:h-16 bg-white/5 hover:bg-brand-blue hover:text-black border border-white/10 rounded-2xl flex items-center justify-center text-white transition-all pointer-events-auto shadow-2xl"
                onClick={() => setSelectedGalleryIndex(null)}
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute inset-x-4 md:inset-x-10 top-1/2 -translate-y-1/2 flex justify-between items-center z-[110] pointer-events-none">
              <button
                onClick={handlePrevGallery}
                className="w-12 h-12 md:w-20 md:h-20 bg-white/5 hover:bg-brand-blue hover:text-black border border-white/10 rounded-full md:rounded-3xl flex items-center justify-center text-white transition-all pointer-events-auto shadow-2xl backdrop-blur-md group"
              >
                <ChevronLeft size={32} className="group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={handleNextGallery}
                className="w-12 h-12 md:w-20 md:h-20 bg-white/5 hover:bg-brand-blue hover:text-black border border-white/10 rounded-full md:rounded-3xl flex items-center justify-center text-white transition-all pointer-events-auto shadow-2xl backdrop-blur-md group"
              >
                <ChevronRight size={32} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>

            {/* Image Container */}
            <motion.div
              key={selectedGalleryIndex}
              initial={{ scale: 0.95, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.95, opacity: 0, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative group cursor-default flex items-center justify-center w-full h-full">


                <img
                  src={currentGalleryImages[selectedGalleryIndex]}
                  alt="Full Gallery View"
                  className="relative z-10 w-full h-full max-w-[95vw] md:max-w-[85vw] max-h-[85vh] md:max-h-[80vh] object-contain rounded-2xl md:rounded-3xl shadow-[0_50px_100px_rgba(0,0,0,0.5)] border border-white/10"
                />
                

              </div>
            </motion.div>


          </motion.div>
        )}
      </AnimatePresence>

      <EnquireModal isOpen={isEnquireOpen} onClose={() => setIsEnquireOpen(false)} projectName={selectedProject?.name} />
    </div>
  );
}
