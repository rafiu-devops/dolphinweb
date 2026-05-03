"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { EnquireModal } from "@/components/ui/EnquireModal";
import { StatCounter } from "@/components/ui/StatCounter";
import { Quote, CheckCircle2, ShieldCheck, Trophy, Headphones, ArrowRight, Star, Users, Briefcase, Zap, Phone, Send, MapPin, Building, TrendingUp, Loader2, Map, PenTool, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AdvancedSearch } from "@/components/ui/AdvancedSearch";
import { FaWhatsapp } from "react-icons/fa6";

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
  transition: { staggerChildren: 0.2 }
};

import { Project, PropertyUnit } from "@/types";

interface HomeClientProps {
  featuredProjects: Project[];
  allProjects: Project[];
  stats: any[];
  testimonials: any[];
  agents: any[];
}

export default function HomeClient({
  featuredProjects,
  allProjects,
  stats,
  testimonials,
  agents
}: HomeClientProps) {
  const sortedFeatured = [...featuredProjects].sort((a, b) => {
    const order = ["dolphin-tower", "river-view", "dream-city", "dolphin-plaza"];
    return order.indexOf(a.slug) - order.indexOf(b.slug);
  });

  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(allProjects);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [expressFormData, setExpressFormData] = useState({
    name: "",
    phone: "",
    email: ""
  });
  const [isExpressSubmitting, setIsExpressSubmitting] = useState(false);
  const [isExpressSuccess, setIsExpressSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const handleFilterChange = (filter: { type: string; area: string; propertyType: string }) => {
    let results = allProjects;

    // Filter by Type (Buy / Rent / Commercial)
    if (filter.type) {
      results = results.filter(p => p.projectCard.badges.includes(filter.type));
    }

    // Filter by Area
    if (filter.area && filter.area.length > 2) {
      const areaLower = filter.area.toLowerCase();
      results = results.filter(p =>
        p.location.toLowerCase().includes(areaLower) ||
        p.city.toLowerCase().includes(areaLower) ||
        p.name.toLowerCase().includes(areaLower)
      );
    }

    // Filter by Project Category (Residential, Commercial, Industrial)
    if (filter.propertyType && filter.propertyType !== "All Sectors" && filter.propertyType !== "All Types") {
      results = results.filter(p =>
        p.detailsPage.specifications.projectType.toLowerCase().includes(filter.propertyType.toLowerCase())
      );
    }

    setFilteredProjects(results);
  };

  const handleEnquire = (project: any) => {
    setSelectedProject(project);
    setIsEnquireOpen(true);
  };

  const handleExpressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expressFormData.name || !expressFormData.email) return;

    setIsExpressSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...expressFormData,
          message: "Quick Contact from Home Page",
          projectName: "Home Page Quick Form"
        }),
      });

      if (response.ok) {
        setIsExpressSuccess(true);
        setExpressFormData({ name: "", phone: "", email: "" });
        setTimeout(() => setIsExpressSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Express enquiry error:", error);
    } finally {
      setIsExpressSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col pb-20 bg-background overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[850px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageSlider
            images={featuredProjects.flatMap(p => p.featured?.images || [])}
            videoUrl="https://youtu.be/2Gd6cvbhQMs?si=1Xvh-KksRQLmIYc_"
            autoPlay={true}
            showArrows={false}
            showDots={false}
            interval={6000}
            className="h-full w-full grayscale-0 opacity-100 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-black/40 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-[2]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-[2]" />
        </div>

        <div className="container mx-auto px-6 md:px-20 pt-32 sm:pt-48 md:pt-64 pb-12 md:pb-20 relative z-[10]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full flex flex-col gap-6 md:gap-10"
          >
            {/* Branding Text - Left Aligned */}
            <div className="max-w-4xl text-left space-y-4 md:space-y-8">
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-brand-blue/80 backdrop-blur-md text-black shadow-[0_0_20px_rgba(90,161,255,0.2)]">
                <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                <span className="text-[10px] md:tactical-label font-black uppercase tracking-widest">Premium Asset Management</span>
              </div>

              <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.9] italic drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <span className="text-white block">Dolphin Builder's </span>
                <span className="text-brand-blue text-glow-blue block">&  Developer's</span>
              </h1>


              <div className="flex flex-col sm:flex-row gap-3 md:gap-5 pt-2 md:pt-4 items-center sm:items-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Link
                    href="/projects"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brand bg-brand-blue/80 backdrop-blur-md px-6 md:px-10 py-3 md:py-5 text-[11px] md:text-[13px] border-2 border-transparent shadow-[0_0_30px_rgba(90,161,255,0.3)] w-full block text-center"
                  >
                    View Projects
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full sm:w-auto">
                  <Link
                    href="/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 md:px-10 py-3 md:py-5 text-[11px] md:text-[13px] border-2 border-white/20 hover:border-brand-blue hover:text-brand-blue transition-all rounded-xl font-black uppercase tracking-widest backdrop-blur-md bg-white/5 text-white w-full block text-center"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 hidden md:flex"
        >
          <span className="tactical-label text-muted-foreground/60">Scroll for more</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-brand-blue to-transparent" />
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          {...fadeInUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20"
        >
          <div className="space-y-6">
            <h2 className="section-heading">Featured Projects</h2>
            <p className="tactical-description max-w-xl">
              Our current standout developments across prime urban Quick Links. Exceptional precision in every masterplan.
            </p>
          </div>
          <Link
            href="/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-6 bg-brand-blue text-white px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] hover:bg-black hover:shadow-[0_10px_40px_rgba(90,161,255,0.3)] transition-all hover:-translate-y-1 active:scale-95 shadow-xl"
          >
            Browse All Projects
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-brand-blue group-hover:text-black transition-all">
              <ArrowRight size={16} />
            </div>
          </Link>
        </motion.div>

        <div className="space-y-24 md:space-y-40 pb-32 flex flex-col">
          {sortedFeatured.map((project, idx) => {
            const isLeft = idx % 2 === 0;
            const projectNumber = (idx + 1).toString().padStart(2, '0');

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "flex w-full px-6 md:px-0 relative",
                  isLeft ? "justify-start" : "justify-end"
                )}
              >
                {/* Large Background Index - Side Centered Positioning - Hidden on Mobile */}
                <div className={cn(
                  "hidden md:block absolute top-1/2 -translate-y-1/2 opacity-[0.15] text-black text-[6rem] sm:text-[15rem] md:text-[25rem] font-black italic select-none pointer-events-none transition-all duration-1000 group-hover:opacity-[0.25] z-0 will-change-transform",
                  isLeft ? "left-[85%] md:left-[90%] -translate-x-1/2" : "left-[15%] md:left-[10%] -translate-x-1/2"
                )}>
                  {projectNumber}
                </div>

                <div className={cn(
                  "w-full md:w-11/12 lg:w-9/12 relative z-10",
                  isLeft ? "md:pr-20" : "md:pl-20"
                )}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative group will-change-transform"
                  >
                    {/* Shadow Glow Accent */}
                    <div className="absolute -inset-6 bg-brand-blue/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    {/* Mobile-Only Project Number Tag (Circular Messenger Style - Partially Outside) */}
                    <div className="md:hidden absolute -top-5 -right-5 z-[70] pointer-events-none">
                      <div className="w-14 h-14 bg-brand-blue text-black rounded-full font-black italic text-xl shadow-[0_10px_30px_rgba(90,161,255,0.4)] flex items-center justify-center border-4 border-white dark:border-background">
                        {projectNumber}
                      </div>
                    </div>

                    <div className="relative aspect-[4/5] sm:aspect-[16/10] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-border/40 glass-card-premium shadow-4xl group-hover:border-brand-blue/40 transition-colors">
                      {/* Image Slider Section */}
                      <ImageSlider
                        images={project.featured?.images || []}
                        autoPlay={true}
                        interval={5000}
                        showArrows={false}
                        showDots={false}
                        objectFit="cover"
                        className="h-full transition-transform duration-[3s] group-hover:scale-110 ease-out"
                      />

                      {/* High Contrast HUD Gradient - Deeper on mobile */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 pointer-events-none" />

                      <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between pointer-events-none">
                        {/* Header HUD - Solid Visibility */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                          <div className="space-y-3 sm:space-y-4">
                            <h3 className="text-xl sm:text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-tight sm:leading-[0.85] drop-shadow-[0_10px_40px_rgba(0,0,0,1)] max-w-2xl">
                              {project.name}
                            </h3>
                            <div className="flex items-center gap-2 md:gap-4 bg-black/60 backdrop-blur-md px-3 md:px-4 py-1.5 rounded-lg w-fit border border-white/5">
                              <MapPin size={14} className="text-brand-blue" />
                              <span className="text-[11px] sm:text-[12px] md:tactical-label text-white/90 italic">{project.location}</span>
                            </div>
                          </div>

                          <div className={cn(
                            "px-4 sm:px-10 py-2 sm:py-3.5 rounded-xl md:rounded-2xl tactical-label shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-2xl border-2 transition-all text-[10px] md:text-[12px] shrink-0",
                            project.status === "Completed"
                              ? "bg-black border-[#25D366]/40 text-[#25D366]"
                              : project.status === "Launching Soon" || project.status === "New Launch"
                                ? "bg-black border-white text-white animate-pulse"
                                : "bg-black border-brand-blue/40 text-brand-blue"
                          )}>
                            {project.status === "Under Construction" ? (
                              <>
                                <span className="sm:hidden">Const.</span>
                                <span className="hidden sm:inline">Construction</span>
                              </>
                            ) : project.status}
                          </div>
                        </div>

                        {/* Footer HUD Layer - Only Buttons */}
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-6 group-hover:translate-y-0 flex flex-col gap-6 pointer-events-auto">
                          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 p-4 md:p-6 bg-black/40 backdrop-blur-xl rounded-2xl md:rounded-[2rem] border border-white/10 shadow-2xl">
                            <Link
                              suppressHydrationWarning
                              prefetch={false}
                              href={`/projects/${project.slug}`}
                              className="btn-brand px-6 md:px-10 py-3 md:py-4 text-[10px] md:text-[11px] shadow-[0_0_30px_rgba(90,161,255,0.3)] flex-1 text-center"
                            >
                              View Details
                            </Link>
                            <button
                              suppressHydrationWarning
                              onClick={() => handleEnquire(project)}
                              className="px-6 md:px-10 py-3 md:py-4 bg-white text-black text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-brand-blue transition-all flex-1"
                            >
                              Contact Us
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why Invest With Us Section */}
      <section className="relative overflow-hidden py-16 bg-background">
        {/* Subtle Architectural Background Visual */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }} />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-blue/5 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-20 space-y-4">
            <h2 className="section-heading italic">Why Invest With Us</h2>
            <p className="text-brand-blue max-w-2xl mx-auto tactical-label">
              Across Karachi • Premier Real Estate Standard
            </p>
          </motion.div>

          {/* Stats Sub-section */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={fadeInUp}>
                <StatCounter value={stat.value} label={stat.label} />
              </motion.div>
            ))}
          </motion.div>

          {/* Key Advantages Cards (Expanded to 4) */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {[
              { icon: MapPin, title: "Strategic Sukkur Locations", desc: "Projects positioned on key roads and high-growth areas across Sukkur." },
              { icon: Building, title: "Contemporary Developments", desc: "Designed with modern architecture, efficient layouts, and quality construction standards." },
              { icon: ShieldCheck, title: "Trusted Developments", desc: "Projects developed with a focus on reliability, transparency, and long-term value." },
              { icon: TrendingUp, title: "Strong Investment Value", desc: "Opportunities designed for sustainable growth and future returns in emerging areas." },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="p-8 sm:p-10 rounded-3xl bg-bg-card border border-border/40 hover:border-brand-blue/30 transition-all duration-300 group shadow-lg hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
              >
                <div className="w-14 h-14 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-black transition-all mb-6 shadow-glow-sm">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <item.icon size={24} />
                  </motion.div>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight italic mb-3 text-foreground">{item.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Line */}
          <motion.div
            {...fadeInUp}
            className="text-center pt-8 border-t border-border/40"
          >
            <p className="text-[16px] md:text-[18px] font-black uppercase tracking-[0.4em] text-foreground/80 italic leading-relaxed">
              Serving premium locations across Karachi with <span className="text-brand-blue font-black underline decoration-brand-blue/30 underline-offset-[10px]">trusted developments</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Development Journey (Interactive Development Flow) */}
      <section className="container mx-auto px-6 py-32 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-blue/[0.03] rounded-full blur-[120px] pointer-events-none" />

        <motion.div {...fadeInUp} className="text-center mb-32 relative z-10">
          <h2 className="section-heading italic">Project Development Journey</h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto tactical-label mt-4">
            From Vision to Landmark: Our Strategic Development Lifecycle
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
          {/* Left: Description Content */}
          <div className="lg:col-span-5 space-y-8 sticky top-32">
            <AnimatePresence mode="wait">
              {[
                {
                  title: "Land Planning",
                  subtitle: "Phase 01: Strategic Acquisition",
                  desc: "We identify and acquire prime locations with high growth potential. Our team conducts rigorous surveys and legal vetting to ensure a solid foundation for future developments.",
                  icon: MapPin
                },
                {
                  title: "Design & Architecture",
                  subtitle: "Phase 02: Conceptual Intelligence",
                  desc: "Collaborating with world-class architects to design modern, sustainable, and functional spaces. Every blueprint is engineered for aesthetic excellence and urban efficiency.",
                  icon: PenTool
                },
                {
                  title: "Infrastructure Development",
                  subtitle: "Phase 03: Ground Engineering",
                  desc: "Deploying high-fidelity infrastructure including roads, sewage systems, and utilities. We establish the essential framework that transforms raw land into a premium sector.",
                  icon: Zap
                },
                {
                  title: "Construction Execution",
                  subtitle: "Phase 04: Precision Engineering",
                  desc: "Our construction teams execute the vision with surgical precision, using top-tier materials and modern techniques to ensure structural integrity and premium finishes.",
                  icon: Building
                },
                {
                  title: "Sectors & Allocation",
                  subtitle: "Phase 05: Sector Optimization",
                  desc: "Strategic zoning and allocation of commercial hubs and residential sanctuaries. We create a balanced ecosystem designed for both business growth and elite living.",
                  icon: LayoutGrid
                },
                {
                  title: "Completion & Delivery",
                  subtitle: "Phase 06: Handover Success",
                  desc: "Final audits, quality checks, and legal handovers. We deliver ready-to-deploy assets that redefine urban living and offer significant long-term value.",
                  icon: CheckCircle2
                }
              ].map((step, idx) => (
                activeStep === idx && (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 30 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-8"
                  >
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[11px] font-black uppercase tracking-[0.25em]">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                      {step.subtitle}
                    </div>
                    <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic text-foreground flex items-center gap-6 leading-none">
                      <div className="w-20 h-20 rounded-2xl bg-brand-blue text-black flex items-center justify-center shadow-glow-sm">
                        <step.icon size={40} />
                      </div>
                      {step.title}
                    </h3>
                    <p className="text-xl text-muted-foreground leading-relaxed font-medium italic">
                      {step.desc}
                    </p>
                    

                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Right: Modern Vertical Timeline Diagram */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[600px] py-10">
              {/* Main Vertical Track */}
              <div className="absolute left-[39px] top-0 bottom-0 w-[2px] bg-border/40" />
              
              {/* Active Progress Track */}
              <motion.div 
                className="absolute left-[39px] top-0 w-[2px] bg-brand-blue shadow-[0_0_15px_rgba(90,161,255,0.5)]"
                initial={{ height: 0 }}
                animate={{ height: `${(activeStep / 5) * 100}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="space-y-16">
                {[
                  { title: "Land Planning", subtitle: "Strategic Acquisition", icon: MapPin },
                  { title: "Design & Architecture", subtitle: "Conceptual Intelligence", icon: PenTool },
                  { title: "Infrastructure", subtitle: "Ground Engineering", icon: Zap },
                  { title: "Construction", subtitle: "Precision Engineering", icon: Building },
                  { title: "Allocation", subtitle: "Sector Optimization", icon: LayoutGrid },
                  { title: "Delivery", subtitle: "Handover Success", icon: CheckCircle2 }
                ].map((step, idx) => (
                  <motion.button
                    key={idx}
                    suppressHydrationWarning
                    onClick={() => setActiveStep(idx)}
                    className={cn(
                      "relative flex items-center gap-10 w-full group text-left transition-all duration-500",
                      activeStep === idx ? "opacity-100" : "opacity-30 hover:opacity-60"
                    )}
                  >
                    {/* Node Container */}
                    <div className="relative z-10">
                      <div className={cn(
                        "w-20 h-20 rounded-[2rem] flex items-center justify-center transition-all duration-700",
                        activeStep === idx 
                          ? "bg-brand-blue text-black rotate-0 shadow-[0_20px_40px_rgba(90,161,255,0.3)]" 
                          : "bg-bg-card text-muted-foreground border border-border/40 -rotate-12 group-hover:rotate-0"
                      )}>
                        <step.icon size={activeStep === idx ? 32 : 24} className="transition-all duration-500" />
                      </div>
                      
                      {/* Active Ripple Effect */}
                      {activeStep === idx && (
                        <motion.div
                          layoutId="ripple"
                          className="absolute inset-0 rounded-[2rem] border-2 border-brand-blue"
                          initial={{ scale: 1, opacity: 0.5 }}
                          animate={{ scale: 1.4, opacity: 0 }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>

                    {/* Text Content */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <span className={cn(
                          "text-[12px] font-black italic transition-colors",
                          activeStep === idx ? "text-brand-blue" : "text-muted-foreground"
                        )}>
                          PHASE 0{idx + 1}
                        </span>
                        <div className={cn(
                          "h-[1px] w-8 transition-all duration-500",
                          activeStep === idx ? "bg-brand-blue w-12" : "bg-border/40"
                        )} />
                      </div>
                      <h4 className={cn(
                        "text-2xl md:text-3xl font-black uppercase italic tracking-tighter transition-all duration-500",
                        activeStep === idx ? "text-foreground translate-x-2" : "text-muted-foreground"
                      )}>
                        {step.title}
                      </h4>
                      <p className={cn(
                         "tactical-label text-[10px] tracking-[0.2em] transition-all",
                         activeStep === idx ? "text-brand-blue/80" : "text-muted-foreground/40"
                      )}>
                        {step.subtitle}
                      </p>
                    </div>

                    {/* Background Glow for Active Step */}
                    {activeStep === idx && (
                      <motion.div 
                        layoutId="active-bg-glow"
                        className="absolute inset-y-[-20px] inset-x-[-20px] bg-brand-blue/[0.03] rounded-[3rem] -z-10 blur-xl"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Step Indicators (Dots) */}
            <div className="flex gap-4 mt-20">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <button
                  key={idx}
                  suppressHydrationWarning
                  onClick={() => setActiveStep(idx)}
                  className={cn(
                    "h-1.5 transition-all duration-500 rounded-full",
                    activeStep === idx
                      ? "w-12 bg-brand-blue shadow-[0_0_15px_rgba(90,161,255,0.5)]"
                      : "w-3 bg-white/10 hover:bg-white/20"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="bg-bg-card/40 py-16 border-y border-border/40 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />

        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-24 space-y-4">
            <h2 className="section-heading underline decoration-brand-blue/20 underline-offset-[20px]">
              Client Testimonials
            </h2>
            <p className="tactical-label text-brand-blue/80 pt-6">Executive Success Stories</p>
          </motion.div>

          <div className="max-w-5xl mx-auto relative px-4 md:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonialIndex}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -20, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="bg-card p-8 sm:p-16 md:p-24 rounded-[2.5rem] sm:rounded-[3rem] backdrop-blur-md border border-border/40 relative group shadow-3xl flex flex-col items-center text-center"
              >
                <Quote className="text-brand-blue/10 absolute top-12 right-12" size={80} />

                <div className="space-y-8 sm:space-y-12 relative z-10 w-full">
                  <p className="text-xl sm:text-2xl md:text-3xl italic text-foreground leading-relaxed font-medium tracking-tight max-w-3xl mx-auto drop-shadow-sm">
                    "{testimonials[activeTestimonialIndex].quote}"
                  </p>

                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xl font-black text-foreground uppercase tracking-tight italic">
                        {testimonials[activeTestimonialIndex].name}
                      </h4>
                      <p className="tactical-label text-brand-blue">
                        {testimonials[activeTestimonialIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Tactical Navigation Dots */}
            <div className="flex justify-center gap-4 mt-16">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  suppressHydrationWarning
                  onClick={() => setActiveTestimonialIndex(idx)}
                  className="group relative px-2 py-4"
                >
                  <div className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    activeTestimonialIndex === idx
                      ? "w-12 bg-brand-blue shadow-[0_0_15px_rgba(90,161,255,0.5)]"
                      : "w-4 bg-border/40 group-hover:bg-brand-blue/30"
                  )} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section (Enhanced) */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-brand-blue rounded-[2.5rem] sm:rounded-[3rem] p-8 sm:p-16 md:p-24 shadow-[0_0_80px_rgba(90,161,255,0.25)] overflow-hidden relative group"
        >
          {/* Animated Glows */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-background/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-1000" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 group-hover:scale-125 transition-transform duration-1000" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-tight text-white/30">
                Secure Your <br />
                <span className="text-white drop-shadow-2xl">Future</span>
              </h2>
              <p className="text-lg md:text-2xl font-black text-black/60 uppercase tracking-widest leading-relaxed">
                Contact our expert team to secure your premium residential property today.
              </p>
            </div>

            {/* Quick Contact Form */}
            <div className="bg-white p-8 sm:p-12 md:p-16 rounded-[2.5rem] sm:rounded-[3.5rem] border border-gray-100 shadow-4xl relative overflow-hidden group">
              {/* Subtle background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="space-y-4 mb-12 text-center lg:text-left">
                <h4 className="text-2xl md:text-3xl font-black text-black italic uppercase tracking-tighter leading-none">
                  Quick <span className="text-brand-blue">Contact</span>
                </h4>
                <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">Operational response within 24 tactical hours.</p>
              </div>

              <AnimatePresence mode="wait">
                {isExpressSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-20 flex flex-col items-center text-center gap-6"
                  >
                    <div className="w-20 h-20 bg-brand-blue text-white rounded-[1.5rem] flex items-center justify-center shadow-glow-md animate-bounce">
                      <ShieldCheck size={40} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-lg font-black uppercase tracking-tighter text-black italic">Transmission Successful</p>
                      <p className="tactical-label text-gray-400">Stand by for tactical follow-up.</p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleExpressSubmit} className="space-y-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-4">Identity</label>
                        <input
                          required
                          suppressHydrationWarning
                          type="text"
                          placeholder="YOUR NAME"
                          value={expressFormData.name}
                          onChange={(e) => setExpressFormData({ ...expressFormData, name: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl text-black text-[12px] font-bold tracking-widest focus:ring-1 focus:ring-brand-blue focus:border-brand-blue outline-none placeholder:text-black/20 transition-all"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-4">Secure Email</label>
                        <input
                          required
                          suppressHydrationWarning
                          type="email"
                          placeholder="EMAIL ADDRESS"
                          value={expressFormData.email}
                          onChange={(e) => setExpressFormData({ ...expressFormData, email: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl text-black text-[12px] font-bold tracking-widest focus:ring-1 focus:ring-brand-blue focus:border-brand-blue outline-none placeholder:text-black/20 transition-all"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-black/40 ml-4">Tactical Number</label>
                        <input
                          suppressHydrationWarning
                          type="tel"
                          placeholder="PHONE / WHATSAPP"
                          value={expressFormData.phone}
                          onChange={(e) => setExpressFormData({ ...expressFormData, phone: e.target.value })}
                          className="w-full bg-gray-50 border border-gray-200 p-5 rounded-2xl text-black text-[12px] font-bold tracking-widest focus:ring-1 focus:ring-brand-blue focus:border-brand-blue outline-none placeholder:text-black/20 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      disabled={isExpressSubmitting}
                      suppressHydrationWarning
                      type="submit"
                      className="w-full bg-brand-blue text-white py-6 rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-glow-sm disabled:opacity-50 mt-4 group/btn"
                    >
                      {isExpressSubmitting ? (
                        <>Processing... <Loader2 size={16} className="animate-spin" /></>
                      ) : (
                        <>Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </section>

      <EnquireModal
        isOpen={isEnquireOpen}
        onClose={() => setIsEnquireOpen(false)}
        projectName={selectedProject?.name}
      />
    </div>
  );
}
