"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Building, Ruler, Tag, Shield, Zap, Home,
  Camera, WavesLadder, Coffee, Trees, Car, ArrowLeft,
  Download, Crosshair, Box, TrendingUp, Heart, Info,
  Phone, Mail, Globe, Send, Loader2, CheckCircle2,
  Calendar, Layers, Map as MapIcon, Star
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
    Mail, Phone, Send, Loader2, CheckCircle2, Crosshair, Box, FaWhatsapp, FaFacebook
  };

  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"exterior" | "interior" | "layouts">("exterior");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = project.detailsPage.galleryCategories || {
    exterior: project.detailsPage.gallery || [],
    interior: [],
    layouts: []
  };

  const currentGalleryImages = useMemo(() => {
    const raw = categories[activeCategory] || [];
    return raw.filter((img): img is string => typeof img === 'string' && img.trim().length > 0);
  }, [categories, activeCategory]);

  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const heroImages = useMemo(() => {
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
      <section className="pt-40 md:pt-48 pb-16 bg-background">
        <div className="container mx-auto px-6 space-y-12">
          {/* Breadcrumbs */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 tactical-label text-muted-foreground/80">
            <Link href="/" prefetch={false} className="hover:text-brand-blue transition-colors">Home</Link>
            <div className="w-4 h-[1px] bg-border" />
            <Link href="/projects" prefetch={false} className="hover:text-brand-blue transition-colors">Strategic Portfolio</Link>
            <div className="w-4 h-[1px] bg-border" />
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
              <h1 className="text-3xl sm:text-5xl md:text-8xl font-black tracking-tighter text-foreground uppercase italic leading-[0.85]">
                {project.name.split(' ').slice(0, -1).join(' ')} <br />
                <span className="text-brand-blue">{project.name.split(' ').slice(-1)}</span>
              </h1>
              <p className="text-lg md:text-2xl text-muted-foreground font-bold italic tracking-tight max-w-3xl">
                {project.detailsPage.introduction || project.projectCard.shortDescription}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-bg-card border border-border/40 px-6 sm:px-8 py-4 sm:py-5 rounded-2xl shadow-xl">
                <MapPin size={24} className="text-brand-blue" />
                <div className="flex flex-col">
                  <span className="tactical-label text-muted-foreground/80">Operational Zone</span>
                  <span className="text-[12px] sm:text-sm font-black uppercase tracking-tight text-foreground">{project.location}, {project.city}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image Showcase Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[500px] md:h-[750px]">
            <div className="lg:col-span-9 relative rounded-[3rem] overflow-hidden border border-border/40 group bg-black shadow-4xl">
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
              <div className="absolute bottom-10 right-10 flex gap-4 z-20">
                <button onClick={() => setActiveHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)} className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-brand-blue hover:text-black transition-all">
                  <ArrowLeft size={20} />
                </button>
                <button onClick={() => setActiveHeroIndex((prev) => (prev + 1) % heroImages.length)} className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 flex items-center justify-center text-white hover:bg-brand-blue hover:text-black transition-all rotate-180">
                  <ArrowLeft size={20} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-3 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar pr-2 pb-4 lg:pb-0">
              {heroImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveHeroIndex(idx)}
                  className={cn(
                    "relative min-w-[150px] lg:min-w-0 aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all shrink-0",
                    activeHeroIndex === idx ? "border-brand-blue scale-[0.98] shadow-glow-sm" : "border-transparent opacity-50 hover:opacity-100"
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

            <div className="flex flex-wrap gap-8 pt-6">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Investment Potential</span>
                <span className="text-2xl font-black italic text-brand-blue">High ROI Target</span>
              </div>
              <div className="w-[1px] h-12 bg-border/40 hidden md:block" />
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Asset Class</span>
                <span className="text-2xl font-black italic text-foreground uppercase">{project.projectCard.badges[1] || "Premium"}</span>
              </div>
            </div>
          </motion.div>

          <motion.div {...fadeInUp} className="relative aspect-square rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden border border-border/40 shadow-4xl group">
            <img
              src={project.detailsPage.heroImage || project.detailsPage.gallery[0] || "/assets/projects/placeholder.png"}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-brand-blue/5 pointer-events-none group-hover:bg-transparent transition-colors duration-1000" />
          </motion.div>
        </div>
      </section>

      {/* 3. WHAT THIS PROJECT OFFERS (OFFERINGS) */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 space-y-20">
          <div className="text-center space-y-6">
            <h2 className="section-heading tracking-tighter">What This Project <span className="text-brand-blue">Offers</span></h2>
            <p className="tactical-label text-muted-foreground/80">Strategic Asset Classes for Diversified Portfolios</p>
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
                  <div className="w-20 h-20 bg-brand-blue/10 text-brand-blue rounded-3xl flex items-center justify-center mx-auto transition-all group-hover:bg-brand-blue group-hover:text-black shadow-glow-sm">
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
      <section className="py-32 bg-bg-card border-y border-border/40">
        <div className="container mx-auto px-6 space-y-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-6">
              <h2 className="section-heading">Available <span className="text-brand-blue">Spaces</span></h2>
              <p className="tactical-label text-muted-foreground/80">Operational Blueprint & Inventory Specs</p>
            </div>
            <button onClick={() => handleEnquire(project)} className="btn-brand px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl text-[10px] md:text-[12px] w-full md:w-auto">Download Full Price Plan</button>
          </div>

          <div className="overflow-hidden rounded-[3rem] border border-border/40 shadow-4xl bg-background">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="p-6 md:p-10 tactical-label">Unit Classification</th>
                    <th className="p-6 md:p-10 tactical-label">Area Footprint</th>
                    <th className="p-6 md:p-10 tactical-label text-right">Acquisition State</th>
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
                      <td className="p-6 md:p-10 text-lg md:text-xl text-muted-foreground">{unit.size}</td>
                      <td className="p-6 md:p-10 text-right">
                        <span className="text-brand-blue text-[10px] md:text-sm border border-brand-blue/20 px-4 md:px-6 py-1.5 md:py-2 rounded-full bg-brand-blue/5">Available</span>
                      </td>
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
                <div key={idx} className="flex flex-col sm:flex-row gap-6 sm:gap-8 p-8 sm:p-10 rounded-3xl bg-bg-card border-l-4 border-brand-blue shadow-lg hover:shadow-2xl transition-all">
                  <div className="text-brand-blue"><Icon size={32} /></div>
                  <div className="space-y-1">
                    <span className="tactical-label text-muted-foreground/80">{spec.label}</span>
                    <p className="text-lg font-black uppercase italic tracking-tight text-foreground">{spec.value}</p>
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {project.detailsPage.amenities.map((amenity, idx) => {
              const Icon = iconMap[amenity.icon] || Shield;
              return (
                <div key={idx} className="flex flex-col gap-6 p-8 sm:p-10 rounded-[2rem] sm:rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
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
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Direct Sector <span className="text-brand-blue">Comm-Link</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.location.href = `tel:${project.detailsPage.projectContact?.phone}`}>
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-black transition-all"><Phone size={20} /></div>
                    <div className="flex flex-col">
                      <span className="tactical-label text-white/60">Contact Hot-line</span>
                      <span className="text-lg font-black tracking-widest">{project.detailsPage.projectContact?.phone || "+92 347 0139661"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group cursor-pointer" onClick={() => window.location.href = `mailto:${project.detailsPage.projectContact?.email}`}>
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-black transition-all"><Mail size={20} /></div>
                    <div className="flex flex-col">
                      <span className="tactical-label text-white/60">Transmission Email</span>
                      <span className="text-sm font-black tracking-widest truncate max-w-[200px]">{project.detailsPage.projectContact?.email || "ops@dolphinbuilders.pk"}</span>
                    </div>
                  </div>
                  {project.detailsPage.projectContact?.whatsapp && (
                    <div
                      className="flex items-center gap-6 group cursor-pointer"
                      onClick={() => {
                        const wa = project.detailsPage.projectContact?.whatsapp;
                        if (wa) window.open(`https://wa.me/${wa.replace(/\D/g, '')}`, '_blank');
                      }}
                    >
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-[#25D366] group-hover:text-white transition-all"><FaWhatsapp size={20} /></div>
                      <div className="flex flex-col">
                        <span className="tactical-label text-white/60">WhatsApp Sync</span>
                        <span className="text-lg font-black tracking-widest text-[#25D366]">Chat Now</span>
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
                      <div className="flex flex-col">
                        <span className="tactical-label text-white/60">Field Intelligence</span>
                        <span className="text-lg font-black tracking-widest text-[#1877F2]">Facebook Page</span>
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
      <section id="enquire" className="py-32 bg-black overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-10">
              <div className="space-y-6">
                <h3 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">Contact <span className="text-brand-blue text-glow">Us</span></h3>
                <p className="text-base md:text-lg text-white/60 font-bold uppercase tracking-[0.1em] leading-relaxed max-w-xl">Our high-tier asset management team will process your strategic interest within 24 operational hours.</p>
              </div>
            </div>

            <div className="glass-premium p-8 sm:p-12 md:p-20 rounded-[2.5rem] sm:rounded-[4rem] border-white/10 relative">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center space-y-8">
                    <div className="w-24 h-24 bg-brand-blue text-black rounded-[2rem] flex items-center justify-center mx-auto shadow-glow-md animate-bounce"><CheckCircle2 size={48} /></div>
                    <div className="space-y-2">
                      <h3 className="text-3xl font-black uppercase italic text-white">Encrypted Transmission Received</h3>
                      <p className="tactical-label text-white/60">Stand by for tactical agent follow-up.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Agent Name</label>
                        <input required type="text" placeholder="IDENTITY" className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white font-bold tracking-widest focus:border-brand-blue outline-none transition-all" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Comm-Channel</label>
                        <input required type="email" placeholder="SECURE EMAIL" className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white font-bold tracking-widest focus:border-brand-blue outline-none transition-all" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-4">Mission Objective</label>
                      <textarea rows={4} placeholder="ASSET PREFERENCE / ACQUISITION GOALS" className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-white font-bold tracking-widest focus:border-brand-blue outline-none resize-none transition-all"></textarea>
                    </div>
                    <button disabled={isSubmitting} className="w-full btn-brand py-8 text-[14px] font-black shadow-glow-md">
                       {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Send Message</>}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <EnquireModal isOpen={isEnquireOpen} onClose={() => setIsEnquireOpen(false)} projectName={selectedProject?.name} />
    </div>
  );
}
