"use client";

import { motion } from "framer-motion";
import { Target, Eye, MapPin, Building, TrendingUp, ShieldCheck, ArrowRight, Users, CheckCircle2, Zap, Cpu, Trophy, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Project } from "@/types";
import { Tilt } from "@/components/ui/Tilt";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { EnquireModal } from "@/components/ui/EnquireModal";
import { useState } from "react";

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
  transition: { staggerChildren: 0.15 }
};

interface AboutClientProps {
  team: any[];
  featuredProjects?: Project[];
}

export default function AboutClient({ team, featuredProjects = [] }: AboutClientProps) {
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const visionMission = [
    {
      icon: Eye,
      title: "Our Vision",
      desc: "To become a trusted name in Pakistan’s real estate sector by developing high-quality projects that combine innovation, sustainability, and long-term investment value."
    },
    {
      icon: Target,
      title: "Our Mission",
      desc: "To design and deliver real estate developments that offer exceptional value, prime locations, and modern infrastructure while maintaining transparency, reliability, and customer satisfaction."
    },
  ];

  const expertise = [
    { icon: Building, title: "Commercial Projects", desc: "Shopping plazas, retail outlets, and office spaces engineered for business growth and maximum visibility." },
    { icon: Home, title: "Residential Developments", desc: "Modern apartments and living spaces designed for elite comfort, convenience, and family sanctuary." },
    { icon: Zap, title: "Mixed-Use Projects", desc: "Combining premium residential and commercial opportunities within a single high-fidelity development." },
    { icon: ShieldCheck, title: "Investment Strategy", desc: "Transparent legal frameworks and verified project documentation for secure asset appreciation." },
  ];

  const approachSteps = [
    { title: "Strategic Planning", desc: "Selecting prime locations with high growth potential and tactical advantages." },
    { title: "Modern Design", desc: "Incorporating contemporary architecture and efficient, ergonomic layouts." },
    { title: "Quality Construction", desc: "Ensuring durable materials and professional, high-fidelity execution." },
    { title: "Timely Delivery", desc: "Maintaining absolute commitment to project timelines and deployment schedules." },
    { title: "Investment Value", desc: "Creating strategic opportunities for significant long-term capital returns." },
  ];

  const whyChooseUs = [
    "Prime project locations",
    "Modern architectural design",
    "Strong investment potential",
    "Focus on quality and reliability",
    "Customer-centric development approach"
  ];

  return (
    <div className="flex flex-col pb-20 bg-background overflow-x-hidden">

      {/* 1. HERO BANNER */}
      <section className="relative min-h-[100vh] flex items-center justify-center pt-48 md:pt-64 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/about-db.png"
            className="w-full h-full object-cover"
            onError={(e) => (e.currentTarget.src = "/assets/projects/placeholder.png")}
          />
          <div className="absolute inset-0 bg-black/40 z-[1]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-brand-blue border border-brand-blue/20 mb-6 shadow-[0_0_20px_rgba(90,161,255,0.3)]">
              <span className="tactical-label text-white">Corporate Intelligence v.02</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter text-white uppercase italic leading-[0.85] drop-shadow-2xl">
              Building <br />
              <span className="text-brand-blue text-glow-blue underline decoration-brand-blue/40 underline-offset-[10px] md:underline-offset-[15px]">Legacies</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT INTRO */}
      <section className="container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeInUp} className="space-y-10">
            <div className="space-y-4">
              <h2 className="section-heading">About <span className="text-brand-blue">Dolphin Builders</span></h2>
              <div className="w-20 h-1 bg-brand-blue" />
            </div>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-medium italic">
              <p>
                Dolphin Builders & Developers is a forward-thinking real estate development company committed to delivering modern residential and commercial projects that redefine urban living standards in Sukkur and surrounding regions.
              </p>
              <p>
                With a focus on <span className="text-foreground font-black">quality construction, strategic locations, and long-term value creation</span>, we provide spaces that are not only functional but also investment-friendly. Each project is carefully planned to meet the evolving needs of modern lifestyles and businesses.
              </p>
            </div>

            <div className="flex flex-wrap gap-6 pt-6">
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-brand-blue/5 border border-brand-blue/20">
                <CheckCircle2 className="text-brand-blue" size={18} />
                <span className="tactical-label">Transparency & Professionalism</span>
              </div>
              <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-brand-blue/5 border border-brand-blue/20">
                <CheckCircle2 className="text-brand-blue" size={18} />
                <span className="tactical-label">Customer Trust Priority</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="aspect-square rounded-[2.5rem] overflow-hidden border border-border/40 glass-premium group bg-black">
              <img
                src="/about-db.png"
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 opacity-80"
                alt="Corporate Excellence"
                onError={(e) => (e.currentTarget.src = "/assets/projects/placeholder.png")}
              />
            </div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="absolute -bottom-10 -left-10 bg-brand-blue text-black p-10 rounded-[2rem] shadow-[0_30px_60px_rgba(90,161,255,0.4)] hidden lg:block max-w-xs"
            >
              <Building className="mb-4 w-8 h-8" />
              <p className="text-lg font-black uppercase tracking-tight italic leading-tight">
                "We provide spaces engineered for the future of modern lifestyles."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. VISION & MISSION */}
      <section className="bg-bg-card/50 py-32 border-y border-border/40 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {visionMission.map((v, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                className="bg-card p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-border/40 flex flex-col items-center text-center space-y-6 md:space-y-8 hover:border-brand-blue/40 transition-all duration-300 shadow-xl"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center">
                  <v.icon className="w-8 h-8 md:w-9 md:h-9" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic text-foreground">
                    {v.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-medium text-base md:text-lg max-w-md mx-auto">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CORE EXPERTISE */}
      <section className="container mx-auto px-6 py-32">
        <motion.div {...fadeInUp} className="text-center mb-16 space-y-4">
          <h2 className="section-heading italic">Core <span className="text-brand-blue">Expertise</span></h2>
          <p className="tactical-label text-muted-foreground/80">Strategic Real Estate Solutions</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertise.map((e, idx) => (
            <motion.div
              key={idx}
              {...fadeInUp}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[2.5rem] bg-bg-card border border-border/40 text-center space-y-6 group hover:border-brand-blue/30 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center mx-auto group-hover:bg-brand-blue group-hover:text-black transition-all shadow-glow-sm">
                <e.icon size={28} />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tight italic text-foreground">{e.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed font-medium">{e.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. PROJECT APPROACH (TIMELINE) */}
      <section className="bg-black py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-blue/[0.03] pointer-events-none" />
        <div className="container mx-auto px-6 space-y-20 relative z-10">
          <div className="text-center space-y-4">
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black uppercase italic tracking-tighter">Project <span className="text-brand-blue">Approach</span></h2>
            <p className="tactical-label text-white/60">Structured Development Lifecycle</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {approachSteps.map((step, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.1 }}
                className="relative space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-brand-blue flex items-center justify-center text-brand-blue font-black italic">0{idx + 1}</div>
                  {idx < 4 && <div className="hidden md:block h-[2px] flex-grow bg-brand-blue shadow-[0_0_10px_rgba(90,161,255,0.5)]" />}
                </div>
                <div className="space-y-3">
                  <h4 className="text-lg font-black uppercase italic tracking-tight text-white">{step.title}</h4>
                  <p className="tactical-description text-white/60 text-xs">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROJECTS SHOWCASE */}
      <section className="py-32 bg-background border-b border-border/40">
        <div className="container mx-auto px-6">
          <motion.div {...fadeInUp} className="text-center mb-20 space-y-4">
            <h2 className="section-heading italic">Signature <span className="text-brand-blue">Portfolios</span></h2>
            <p className="tactical-label text-muted-foreground/80">Active Tactical Deployments</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredProjects.map((p, idx) => (
              <motion.div
                key={idx}
                {...fadeInUp}
                transition={{ delay: idx * 0.15 }}
              >
                <ProjectCard project={p} onEnquire={(project) => {
                  setSelectedProject(project);
                  setIsEnquireOpen(true);
                }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="container mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeInUp} className="relative aspect-video rounded-[3rem] overflow-hidden border border-border/40 shadow-4xl group">
            <img
              src="/about-db.png"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              alt="Why Choose Us"
            />
            <div className="absolute inset-0 bg-brand-blue/20 mix-blend-overlay" />
          </motion.div>

          <motion.div {...fadeInUp} className="space-y-12">
            <div className="space-y-4">
              <h2 className="section-heading italic">Why Choose <br /> <span className="text-brand-blue">Dolphin Builders?</span></h2>
              <p className="tactical-label text-muted-foreground/80">Our Strategic Edge</p>
            </div>

            <div className="space-y-6">
              {whyChooseUs.map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-black transition-all">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-lg font-black uppercase italic tracking-tight text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Investment CTA */}
      <section className="container mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-brand-blue rounded-[4rem] p-16 md:p-32 shadow-[0_30px_90px_rgba(90,161,255,0.25)] relative overflow-hidden group text-center"
        >
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10 space-y-12">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-[1.1] md:leading-tight text-white drop-shadow-2xl">
              Partner with <br className="hidden md:block" />
              Pakistan’s Trusted Developers
            </h2>
            <p className="text-lg md:text-2xl font-black text-black/60 uppercase tracking-widest max-w-3xl mx-auto">
              Deployment ready assets in Sukkur’s most strategic urban sectors.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/contact"
                suppressHydrationWarning
                prefetch={false}
                className="px-16 py-6 bg-black text-white text-lg font-black uppercase tracking-widest rounded-2xl shadow-3xl hover:bg-black/90 hover:scale-105 transition-all"
              >
                Start Consultation
              </Link>
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
