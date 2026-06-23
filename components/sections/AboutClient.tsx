"use client";

import { motion } from "framer-motion";
import {
  MapPin, Building2, TrendingUp, ShieldCheck,
  ArrowRight, CheckCircle2, Home, Quote
} from "lucide-react";
import Link from "next/link";
import { Project } from "@/types";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { EnquireModal } from "@/components/ui/EnquireModal";
import { useState } from "react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

interface AboutClientProps {
  team: any[];
  featuredProjects?: Project[];
}

export default function AboutClient({ team, featuredProjects = [] }: AboutClientProps) {
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const expertise = [
    {
      icon: Building2,
      title: "Commercial Plazas",
      desc: "Retail outlets, shopping centres, and office floors in Sukkur's busiest corridors.",
    },
    {
      icon: Home,
      title: "Residential Towers",
      desc: "Apartments and family units built around light, space, and long-term liveability.",
    },
    {
      icon: TrendingUp,
      title: "Mixed-Use Developments",
      desc: "Single addresses that combine retail, residential, and business — reducing commute, increasing value.",
    },
    {
      icon: ShieldCheck,
      title: "Investor Assurance",
      desc: "Verified legal documentation and transparent payment structures on every project.",
    },
  ];

  const approachSteps = [
    { num: "01", title: "Site Selection", desc: "We shortlist only locations with demonstrable growth trajectory and road access." },
    { num: "02", title: "Design & Planning", desc: "Our architects balance visual identity with practical floor efficiency." },
    { num: "03", title: "Quality Build", desc: "Structural work uses Grade-A materials with third-party inspection at every phase." },
    { num: "04", title: "On-Time Delivery", desc: "Milestone-driven schedules are shared with investors from day one." },
    { num: "05", title: "Post-Handover", desc: "We remain the point of contact after possession — not just until it." },
  ];

  const founder = {
    name: "Ajeet Kumar Ahuja",
    role: "A vision behind Dolphin Builders",
    photo: "/team/founder.jpg",
    quote:
      "Sindh deserves world-class spaces. Everything we build at Dolphin is a commitment to that belief.",
    bio: "Ajeet Kumar Ahuja is one of Sindh's most recognised public figures best known as the vision behind the dolphin builders , dolphin backers and Sindh TV,  the region's leading Sindhi-language satellite channel, With deep roots across business and media in Sindh, Mr. Ahuja brought the same standards of quality and long-term thinking to real estate establishing Dolphin Builders & Developers to deliver modern commercial and residential projects that reflect Sukkur's and Karachi's growing potential. His vision is straightforward: build with integrity, choose locations that make sense, and stand behind every project after the keys are handed over."
  };

  const milestones = [
    { value: "15+", label: "Years in Sindh's market" },
    { value: "4", label: "Active developments" },
    { value: "500+", label: "Families housed" },
    { value: "100%", label: "Projects legally verified" },
  ];

  return (
    <div className="flex flex-col bg-background overflow-x-hidden">

      {/* ─── 1. HERO ─── */}
      <section className="relative min-h-[100vh] flex items-end pb-20 md:pb-32 overflow-hidden pt-[80px] md:pt-[100px]">
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
        >
          <img
            src="/about-db.png"
            className="w-full h-full object-cover"
            alt="Dolphin Builders"
            onError={(e) => (e.currentTarget.src = "/assets/projects/placeholder.png")}
          />
          {/* two-layer overlay: dark bottom, slight blue tint top */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        </motion.div>

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >

            <h1 className="font-heading text-[52px] sm:text-[72px] md:text-[96px] font-black text-white leading-[0.92] tracking-tight uppercase mb-8 mt-12">
              We Build <br />
              <span className="text-brand-blue">Places</span> <br />
              That Last.
            </h1>
            <p className="font-sans text-[17px] md:text-[20px] text-white/65 leading-relaxed max-w-xl">
              Dolphin Builders has been developing residential and commercial real estate in Sukkur and Karachi since the early 2000s with no shortcuts taken.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. NUMBERS BAND ─── */}
      <section className="bg-brand-blue">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {milestones.map((m, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="py-10 px-6 md:px-10 text-center md:text-left"
              >
                <p className="font-heading text-[40px] md:text-[52px] font-black text-white leading-none mb-1">
                  {m.value}
                </p>
                <p className="font-sans text-[12px] text-white/70 uppercase tracking-[0.18em] font-semibold">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. WHO WE ARE ─── */}
      <section className="container mx-auto px-6 md:px-10 py-24 md:py-36">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 md:gap-28 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/about-db.png"
                className="w-full h-full object-cover"
                alt="Dolphin Builders site"
                onError={(e) => (e.currentTarget.src = "/assets/projects/placeholder.png")}
              />
            </div>
            {/* Pull-quote card */}
            <div className="absolute -bottom-8 -right-4 md:-right-10 bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 max-w-[240px] hidden md:block">
              <Building2 className="text-brand-blue mb-3" size={22} />
              <p className="font-sans text-[13px] text-gray-700 leading-snug font-medium">
                Every Dolphin project is legal-verified before a single brick is placed.
              </p>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div {...fadeUp} className="space-y-8">
            <div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-brand-blue mb-4">
                About Dolphin Builders
              </p>
              <h2 className="font-heading text-[36px] md:text-[52px] font-black uppercase leading-[1] tracking-tight text-foreground mb-6">
                Sindh's Most <br /> Trusted Developer
              </h2>
              <div className="w-12 h-[3px] bg-brand-blue mb-8" />
            </div>

            <p className="font-sans text-[17px] md:text-[19px] text-muted-foreground leading-relaxed">
              Dolphin Builders & Developers was founded on a straightforward idea: that people in Sukkur deserve modern, well-built spaces at fair terms. We develop commercial plazas, residential towers, and mixed-use projects always in locations that make sense for buyers and tenants, not just for us.
            </p>
            <p className="font-sans text-[17px] md:text-[19px] text-muted-foreground leading-relaxed">
              Our projects are legally cleared, structurally inspected, and delivered on schedule. We don't over-promise. We show buyers documentation before they commit, and we stay reachable after they move in.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              {["Legally verified on every project", "Transparent payment plans from day one", "Local market knowledge built over 15 years"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={17} className="text-brand-blue shrink-0" />
                  <span className="font-sans text-[15px] text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 4. VISION & MISSION ─── */}
      <section className="bg-[#f6f8fb] border-y border-gray-100 py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {/* Vision */}
            <motion.div
              {...fadeUp}
              className="bg-white border border-gray-100 p-10 md:p-16 rounded-tl-2xl rounded-bl-2xl md:rounded-tr-none rounded-tr-2xl"
            >
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-blue mb-4">Our Vision</p>
              <h3 className="font-heading text-[28px] md:text-[36px] font-black uppercase tracking-tight text-foreground mb-6 leading-tight">
                A Name That <br /> Stands for Quality
              </h3>
              <p className="font-sans text-[16px] md:text-[18px] text-muted-foreground leading-relaxed">
                To become the most trusted real estate developer in Sindh recognised not just for the buildings we deliver, but for the integrity we bring to every transaction.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-brand-blue p-10 md:p-16 rounded-tr-2xl rounded-br-2xl md:rounded-tl-none rounded-tl-2xl"
            >
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-white/60 mb-4">Our Mission</p>
              <h3 className="font-heading text-[28px] md:text-[36px] font-black uppercase tracking-tight text-white mb-6 leading-tight">
                Built for People, <br /> Not Just Portfolios
              </h3>
              <p className="font-sans text-[16px] md:text-[18px] text-white/80 leading-relaxed">
                To develop spaces that genuinely improve the way people live and do business in Sukkur and Karachi through honest pricing, prime locations, and construction that holds up over time.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 5. MEET THE FOUNDERS ─── */}
      <section className="container mx-auto px-6 md:px-10 py-24 md:py-36">
        <motion.div {...fadeUp} className="mb-16">
          <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-brand-blue mb-3">
            The People Behind It
          </p>
          <h2 className="font-heading text-[36px] md:text-[56px] font-black uppercase tracking-tight text-foreground leading-[1]">
            Minds Behind <br /> Dolphin Builders
          </h2>
          <div className="w-12 h-[3px] bg-brand-blue mt-6" />
        </motion.div>

        <motion.div
          {...fadeUp}
          className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-12 md:gap-20 items-start"
        >
          {/* Photo column */}
          <div className="group">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-100 mb-6">
              <img
                src={founder.photo}
                alt={founder.name}
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                onError={(e) => (e.currentTarget.src = "/founder.jpg")}
              />
            </div>
            {/* Role badge below photo */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-[2px] bg-brand-blue" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-brand-blue">
                {founder.role}
              </span>
            </div>
            <h3 className="font-heading text-[28px] md:text-[34px] font-black uppercase tracking-tight text-foreground leading-tight">
              {founder.name}
            </h3>
          </div>

          {/* Content column */}
          <div className="flex flex-col justify-center gap-8 pt-0 lg:pt-4">
            {/* Sindh TV badge
            <div className="inline-flex items-center gap-3 self-start px-4 py-2 rounded-full border border-brand-blue/20 bg-brand-blue/5">
              <span className="w-2 h-2 rounded-full bg-brand-blue shrink-0" />
              <span className="font-sans text-[12px] font-bold uppercase tracking-[0.2em] text-brand-blue">
                Co-Founder & MD, Sindh TV Network
              </span>
            </div>
             */}

            {/* Pull quote */}
            <div className="pl-5 border-l-[3px] border-brand-blue">
              <p className="font-heading text-[22px] md:text-[28px] font-black text-foreground leading-snug tracking-tight">
                "{founder.quote}"
              </p>
            </div>

            {/* Bio */}
            <p className="font-sans text-[16px] md:text-[18px] text-muted-foreground leading-relaxed">
              {founder.bio}
            </p>


          </div>
        </motion.div>
      </section>

      {/* ─── 6. CORE EXPERTISE ─── */}
      <section className="bg-[#f6f8fb] border-y border-gray-100 py-50 md:py-5">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div {...fadeUp} className="mb-14">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-brand-blue mb-3">What We Build</p>
            <h2 className="font-heading text-[36px] md:text-[52px] font-black uppercase tracking-tight text-foreground leading-[1]">
              Four Areas, <br /> One Standard
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-2xl overflow-hidden">
            {expertise.map((e, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white p-8 md:p-10 group hover:bg-brand-blue transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 group-hover:bg-white/15 flex items-center justify-center mb-7 transition-colors">
                  <e.icon size={20} className="text-brand-blue group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-heading text-[18px] font-black uppercase tracking-tight text-foreground group-hover:text-white mb-3 transition-colors">
                  {e.title}
                </h4>
                <p className="font-sans text-[14px] text-muted-foreground group-hover:text-white/75 leading-relaxed transition-colors">
                  {e.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. HOW WE WORK ─── */}
      <section className="bg-black py-24 md:py-36 relative overflow-hidden">
        {/* faint blue glow top-right */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-10 relative z-10">
          <motion.div {...fadeUp} className="mb-16">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-brand-blue mb-3">How We Work</p>
            <h2 className="font-heading text-[36px] md:text-[56px] font-black uppercase tracking-tight text-white leading-[1]">
              From Site to Handover
            </h2>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-0">
            {approachSteps.map((step, i) => (
              <motion.div
                key={i}
                {...fadeUp}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="flex-1 border-t border-white/10 md:border-t-0 md:border-l md:border-white/10 pt-8 md:pt-0 md:pl-8 lg:pl-12 first:border-l-0 first:pl-0 pb-10 md:pb-0"
              >
                <span className="font-heading text-[48px] md:text-[56px] text-brand-blue leading-none block mb-4 select-none">
                  {step.num}
                </span>
                <h4 className="font-heading text-[17px] font-black uppercase tracking-tight text-white mb-3">
                  {step.title}
                </h4>
                <p className="font-sans text-[14px] text-white/55 leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. PROJECTS SHOWCASE ─── */}
      {featuredProjects.length > 0 && (
        <section className="py-24 md:py-36 border-b border-border/40">
          <div className="container mx-auto px-6 md:px-10">
            <motion.div {...fadeUp} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-brand-blue mb-3">Current Work</p>
                <h2 className="font-heading text-[36px] md:text-[52px] font-black uppercase tracking-tight text-foreground leading-[1]">
                  Active <br /> Developments
                </h2>
              </div>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 font-sans text-[13px] font-bold uppercase tracking-[0.18em] text-brand-blue hover:text-foreground transition-colors"
              >
                All projects <ArrowRight size={14} />
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((p, i) => (
                <motion.div
                  key={i}
                  {...fadeUp}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard
                    project={p}
                    onEnquire={(project) => {
                      setSelectedProject(project);
                      setIsEnquireOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 9. CTA ─── */}
      <section className="container mx-auto px-6 md:px-10 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-brand-blue rounded-3xl overflow-hidden"
        >
          {/* Background texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative z-10 px-10 md:px-20 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-white/55 mb-4">
                Ready to invest?
              </p>
              <h2 className="font-heading text-[36px] md:text-[56px] font-black uppercase text-white leading-[1] tracking-tight">
                Let's Find <br /> Your Space.
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-5 rounded-xl font-sans font-bold uppercase tracking-[0.18em] text-[13px] hover:bg-white hover:text-brand-blue transition-all active:scale-95"
              >
                Talk to us <ArrowRight size={15} />
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-3 bg-white/15 border border-white/30 text-white px-10 py-5 rounded-xl font-sans font-bold uppercase tracking-[0.18em] text-[13px] hover:bg-white hover:text-brand-blue transition-all active:scale-95"
              >
                Browse Projects
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