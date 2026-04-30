"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ImageSlider } from "@/components/ui/ImageSlider";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { EnquireModal } from "@/components/ui/EnquireModal";
import { StatCounter } from "@/components/ui/StatCounter";
import { Quote, CheckCircle2, ShieldCheck, Trophy, Headphones, ArrowRight, Star, Users, Briefcase, Zap, Phone, Send, MapPin, Building, TrendingUp, Loader2 } from "lucide-react";
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
          message: "Express Enquiry from Home Page",
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

        <div className="container mx-auto px-6 md:px-20 pt-20 sm:pt-40 md:pt-64 pb-12 md:pb-20 relative z-[10]">
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
                    View Portfolio
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
                {/* Large Background Index - Side Centered Positioning */}
                <div className={cn(
                  "absolute top-1/2 -translate-y-1/2 opacity-[0.15] text-black text-[6rem] sm:text-[15rem] md:text-[25rem] font-black italic select-none pointer-events-none transition-all duration-1000 group-hover:opacity-[0.25] z-0 will-change-transform",
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

                    <div className="relative aspect-[4/5] sm:aspect-[16/10] rounded-[2rem] sm:rounded-[3rem] overflow-hidden border border-border/40 glass-card-premium shadow-4xl group-hover:border-brand-blue/40 transition-colors">
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

      {/* Our Process (Interactive Tactical Flow) */}
      <section className="container mx-auto px-6 py-16 relative overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />

        <motion.div {...fadeInUp} className="text-center mb-24 relative z-10">
          <h2 className="section-heading italic">Home Selling Process</h2>
          <p className="text-muted-foreground/80 max-w-2xl mx-auto tactical-label mt-4">
            A Strategic Deployment for Maximum Asset Valuation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
          {/* Left: Description Content */}
          <div className="lg:col-span-5 space-y-8">
            <AnimatePresence mode="wait">
              {[
                {
                  title: "Meet Agent",
                  subtitle: "Phase 01: Initial Consultation",
                  desc: "Connect with our elite agents for a strategic brief. We analyze your goals and market position to create a tailored deployment plan.",
                  icon: Users
                },
                {
                  title: "Pricing Strategy",
                  subtitle: "Phase 02: Value Optimization",
                  desc: "Utilizing data-driven analytics to determine the most competitive pricing strategy, ensuring your asset stands out in the marketplace.",
                  icon: TrendingUp
                },
                {
                  title: "Prepare Home",
                  subtitle: "Phase 03: Asset Staging",
                  desc: "Professional staging and surgical-grade repairs to enhance visual appeal. We ensure every square inch of your property is ready for deployment.",
                  icon: Zap
                },
                {
                  title: "Market Home",
                  subtitle: "Phase 04: Strategic Marketing",
                  desc: "Omnichannel deployment across premium real estate networks. Professional cinematography and high-precision listings to attract elite buyers.",
                  icon: Briefcase
                },
                {
                  title: "Receive Offer",
                  subtitle: "Phase 05: Negotiation & Vetting",
                  desc: "Comprehensive review of potential offers. We vet all prospects and negotiate with surgical precision to secure the best possible terms.",
                  icon: Headphones
                },
                {
                  title: "Sign & Close",
                  subtitle: "Phase 06: Terminal Success",
                  desc: "Legal precision in documentation and secure transaction logistics. Successful handover of your asset with maximum efficiency.",
                  icon: ShieldCheck
                }
              ].map((step, idx) => (
                activeStep === idx && (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                  >
                    <div className="inline-block px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-[10px] font-black uppercase tracking-[0.2em]">
                      {step.subtitle}
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground flex items-center gap-4">
                      <step.icon size={40} className="text-brand-blue" />
                      {step.title}
                    </h3>
                    <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                      {step.desc}
                    </p>
                    <div className="pt-6 border-t border-border/40">
                      <div className="flex items-center gap-6">
                        <div className="flex -space-x-4">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-bg-card flex items-center justify-center overflow-hidden">
                              <img
                                src={(`https://i.pravatar.cc/100?u=${idx}${i}`) || "/assets/projects/placeholder.png"}
                                alt="Agent"
                                className="w-full h-full object-cover grayscale"
                                onError={(e) => (e.currentTarget.src = "/assets/projects/placeholder.png")}
                              />
                            </div>
                          ))}
                        </div>
                        <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">
                          Dedicated <span className="text-brand-blue">Strategic Team</span> <br />
                          assigned to this phase.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              ))}
            </AnimatePresence>
          </div>

          {/* Right: Interactive Flow Diagram */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-[500px] aspect-square">
              {/* Circular Path SVG */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none overflow-visible" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="rgba(90, 161, 255, 0.1)"
                  strokeWidth="0.5"
                />
                {/* Active Path Segment */}
                <motion.circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#5aa1ff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 252" }}
                  animate={{ strokeDasharray: `${(activeStep / 5) * 252} 252` }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </svg>

              {/* Steps (Points around the circle) */}
              {[
                { id: 0, label: "Meet Agent" },
                { id: 1, label: "Pricing" },
                { id: 2, label: "Prepare" },
                { id: 3, label: "Market" },
                { id: 4, label: "Offer" },
                { id: 5, label: "Close" }
              ].map((step, idx) => {
                const angle = (idx / 6) * 360 - 90;
                const x = 50 + 40 * Math.cos((angle * Math.PI) / 180);
                const y = 50 + 40 * Math.sin((angle * Math.PI) / 180);

                return (
                  <motion.button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className={cn(
                      "absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 z-20 group shadow-2xl overflow-visible",
                      activeStep === idx
                        ? "bg-brand-blue text-black scale-125 shadow-[0_0_30px_rgba(90,161,255,0.5)]"
                        : "bg-bg-card text-muted-foreground hover:bg-brand-blue/20 hover:text-brand-blue"
                    )}
                    style={{ left: `${x}%`, top: `${y}%` }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-xs font-black italic">{idx + 1}</span>

                    {/* Floating Label */}
                    <div className={cn(
                      "absolute whitespace-nowrap tactical-label transition-all duration-500",
                      activeStep === idx ? "opacity-100 translate-y-12" : "opacity-0 translate-y-10 group-hover:opacity-100",
                      // Adjust label position based on side - hidden on very small screens to avoid overflow
                      "hidden sm:block",
                      x > 50 ? "left-full pl-4" : "right-full pr-4 text-right"
                    )}>
                      {step.label}
                    </div>

                    {/* Active Ripple */}
                    {activeStep === idx && (
                      <motion.div
                        className="absolute inset-0 rounded-full border border-brand-blue"
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 2, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                );
              })}

              {/* Center Element (Final SOLD) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  animate={{
                    scale: activeStep === 5 ? 1.1 : 0.95,
                    opacity: 1
                  }}
                  className={cn(
                    "w-32 h-32 md:w-48 md:h-48 rounded-full flex flex-col items-center justify-center relative transition-shadow duration-1000",
                    activeStep === 5 ? "shadow-[0_0_60px_rgba(90,161,255,0.3)]" : "shadow-none"
                  )}
                >
                  <img
                    src="/assets/process/sold-icon.png"
                    alt="SOLD"
                    className={cn(
                      "w-24 h-24 md:w-40 md:h-40 object-contain transition-all duration-1000",
                      activeStep === 5 ? "grayscale-0 scale-110 drop-shadow-[0_0_20px_rgba(90,161,255,0.8)]" : "grayscale opacity-40 scale-100"
                    )}
                    onError={(e) => (e.currentTarget.src = "/assets/projects/placeholder.png")}
                  />
                  {activeStep === 5 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-2 md:-bottom-4 bg-brand-blue text-black font-black uppercase tracking-[0.2em] md:tracking-[0.3em] px-4 md:px-6 py-1.5 md:py-2 rounded-lg italic text-[10px] md:text-[12px] shadow-2xl"
                    >
                      Deployed
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Step Indicators (Dots) */}
            <div className="flex gap-4 mt-20">
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <button
                  key={idx}
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
            <div className="bg-black/10 backdrop-blur-xl p-6 sm:p-10 rounded-3xl border border-white/10 space-y-6">
              <div className="space-y-2">
                <h4 className="text-xl font-black text-white italic uppercase tracking-tight">Express Enquiry</h4>
                <p className="tactical-label text-black/60">Guaranteed response in 24 tactical hours.</p>
              </div>

              <AnimatePresence mode="wait">
                {isExpressSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="py-12 flex flex-col items-center text-center gap-4"
                  >
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white">
                      <ShieldCheck size={32} />
                    </div>
                    <p className="text-sm font-black uppercase tracking-widest text-white italic">Deployed Successfully</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleExpressSubmit} className="space-y-4">
                    <input
                      required
                      type="text"
                      placeholder="FULL NAME"
                      value={expressFormData.name}
                      onChange={(e) => setExpressFormData({ ...expressFormData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-4 md:p-5 rounded-xl text-white text-[11px] md:text-[12px] font-bold tracking-widest focus:ring-brand-blue focus:border-brand-blue outline-none placeholder:text-black/30"
                    />
                    <input
                      required
                      type="email"
                      placeholder="EMAIL ADDRESS"
                      value={expressFormData.email}
                      onChange={(e) => setExpressFormData({ ...expressFormData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-4 md:p-5 rounded-xl text-white text-[11px] md:text-[12px] font-bold tracking-widest focus:ring-brand-blue focus:border-brand-blue outline-none placeholder:text-black/30"
                    />
                    <input
                      type="tel"
                      placeholder="PHONE NUMBER"
                      value={expressFormData.phone}
                      onChange={(e) => setExpressFormData({ ...expressFormData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 p-4 md:p-5 rounded-xl text-white text-[11px] md:text-[12px] font-bold tracking-widest focus:ring-brand-blue focus:border-brand-blue outline-none placeholder:text-black/30"
                    />
                    <button
                      disabled={isExpressSubmitting}
                      type="submit"
                      className="w-full bg-black text-white py-5 rounded-xl tactical-label text-[13px] flex items-center justify-center gap-3 hover:bg-black/90 transition-all shadow-3xl disabled:opacity-50"
                    >
                      {isExpressSubmitting ? (
                        <>Processing... <Loader2 size={16} className="animate-spin" /></>
                      ) : (
                        <>Deploy Enquiry <Send size={16} /></>
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
