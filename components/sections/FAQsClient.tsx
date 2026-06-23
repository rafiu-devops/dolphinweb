"use client";

import React, { useState, useMemo } from "react";
import { FAQ, Project } from "@/types";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { EnquireModal } from "@/components/ui/EnquireModal";
import { Search, X, ArrowRight, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface FAQsClientProps {
  faqs: FAQ[];
  featuredProjects: Project[];
}

export default function FAQsPage({ faqs, featuredProjects }: FAQsClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleEnquire = (project: Project) => {
    setSelectedProject(project);
    setIsEnquireOpen(true);
  };

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];
  }, [faqs]);

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchCategory = activeCategory === "All" || faq.category === activeCategory;
      const matchSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [faqs, activeCategory, searchQuery]);

  return (
    <div className="flex flex-col bg-background overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="pt-[100px] md:pt-[130px] pb-16 md:pb-24 border-b border-border/30">
        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[2px] bg-brand-blue" />
              <span className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-blue">
                Help Centre
              </span>
            </div>
            <h1 className="font-heading text-[48px] sm:text-[64px] md:text-[80px] font-black uppercase leading-[0.92] tracking-tight text-foreground mb-7">
              Frequently <br /> Asked <br />
              <span className="text-brand-blue">Questions</span>
            </h1>
            <p className="font-sans text-[17px] md:text-[19px] text-muted-foreground leading-relaxed max-w-xl">
              Answers to the questions we hear most from buyers, investors, and tenants. Can't find what you need? Call us directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── MAIN CONTENT ─── */}
      <section className="container mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 md:gap-16 items-start">

          {/* ── LEFT SIDEBAR: categories + search ── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-28 flex flex-col gap-8"
          >
            {/* Search */}
            <div className="relative">
              <Search
                size={15}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setOpenIndex(null); }}
                className="w-full bg-[#f6f8fb] border border-gray-200 rounded-xl pl-10 pr-10 py-3 font-sans text-[14px] text-foreground placeholder:text-muted-foreground/40 outline-none focus:border-brand-blue/40 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setOpenIndex(null); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground transition-colors"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Category list */}
            <div className="flex flex-col gap-1">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.25em] text-muted-foreground/50 mb-2 px-1">
                Categories
              </p>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
                  className={cn(
                    "text-left px-4 py-3 rounded-xl font-sans text-[14px] font-medium transition-all",
                    activeCategory === cat
                      ? "bg-brand-blue text-white font-semibold"
                      : "text-muted-foreground hover:bg-[#f6f8fb] hover:text-foreground"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Contact nudge — desktop only (hidden on mobile) */}
            <div className="hidden lg:block bg-[#f6f8fb] border border-gray-100 rounded-2xl p-6 mt-2">
              <p className="font-sans text-[13px] font-semibold text-foreground mb-1">
                Still have questions?
              </p>
              <p className="font-sans text-[13px] text-muted-foreground mb-4 leading-snug">
                Our team is available to walk you through any project details.
              </p>
              <a
                href="tel:03702502769"
                className="inline-flex items-center gap-2 font-sans text-[13px] font-bold text-brand-blue hover:text-foreground transition-colors"
              >
                <Phone size={13} />
                0370 2502769
              </a>
            </div>
          </motion.div>

          {/* ── RIGHT: FAQ accordion ── */}
          <div>
            {/* Mobile-only contact nudge */}
            <div className="lg:hidden flex items-center justify-between bg-[#f6f8fb] border border-gray-100 rounded-2xl px-5 py-4 mb-8 gap-4">
              <p className="font-sans text-[13px] text-muted-foreground leading-snug">
                Can't find what you need?
              </p>
              <a
                href="tel:03702502769"
                className="shrink-0 inline-flex items-center gap-2 font-sans text-[13px] font-bold text-brand-blue hover:text-foreground transition-colors"
              >
                <Phone size={13} />
                Call us
              </a>
            </div>

            {/* Result count */}
            <div className="flex items-center justify-between mb-8">
              <p className="font-sans text-[13px] text-muted-foreground">
                {filteredFaqs.length === faqs.length
                  ? `${faqs.length} questions`
                  : `${filteredFaqs.length} of ${faqs.length} questions`}
              </p>
              {(searchQuery || activeCategory !== "All") && (
                <button
                  onClick={() => { setSearchQuery(""); setActiveCategory("All"); setOpenIndex(null); }}
                  className="font-sans text-[12px] font-semibold text-brand-blue hover:text-foreground transition-colors uppercase tracking-[0.15em]"
                >
                  Clear filters
                </button>
              )}
            </div>

            <AnimatePresence mode="popLayout" initial={false}>
              {filteredFaqs.length > 0 ? (
                <motion.div
                  key={activeCategory + searchQuery}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="divide-y divide-border/40"
                >
                  {filteredFaqs.map((faq, idx) => (
                    <div key={faq.question}>
                      <AccordionItem
                        question={faq.question}
                        answer={faq.answer}
                        index={idx + 1}
                        isOpen={openIndex === idx}
                        onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                      />
                    </div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-24 text-center"
                >
                  <p className="font-sans text-[15px] text-muted-foreground mb-2">
                    No questions match your search.
                  </p>
                  <button
                    onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                    className="font-sans text-[13px] font-semibold text-brand-blue hover:text-foreground transition-colors"
                  >
                    Clear and show all
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ─── CTA BAND ─── */}
      <section className="bg-brand-blue">
        <div className="container mx-auto px-6 md:px-10 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-white/55 mb-2">
              Didn't find your answer?
            </p>
            <h2 className="font-heading text-[28px] md:text-[36px] font-black uppercase text-white leading-tight tracking-tight">
              Talk to Our Team Directly
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-sans font-bold uppercase tracking-[0.18em] text-[12px] hover:bg-white hover:text-brand-blue transition-all active:scale-95"
            >
              Send a message <ArrowRight size={14} />
            </Link>
            <a
              href="tel:03702502769"
              className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/25 text-white px-8 py-4 rounded-xl font-sans font-bold uppercase tracking-[0.18em] text-[12px] hover:bg-white hover:text-brand-blue transition-all active:scale-95"
            >
              <Phone size={14} />
              0370 2502769
            </a>
          </div>
        </div>
      </section>

      {/* ─── FEATURED PROJECTS ─── */}
      {featuredProjects.length > 0 && (
        <section className="container mx-auto px-6 md:px-10 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-14"
          >
            <div>
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-brand-blue mb-3">
                Our Work
              </p>
              <h2 className="font-heading text-[32px] md:text-[48px] font-black uppercase tracking-tight text-foreground leading-[1]">
                Active Developments
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-sans text-[13px] font-bold uppercase tracking-[0.18em] text-brand-blue hover:text-foreground transition-colors shrink-0"
            >
              All projects <ArrowRight size={14} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 3).map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} onEnquire={handleEnquire} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <EnquireModal
        isOpen={isEnquireOpen}
        onClose={() => setIsEnquireOpen(false)}
        projectName={selectedProject?.name}
      />
    </div>
  );
}