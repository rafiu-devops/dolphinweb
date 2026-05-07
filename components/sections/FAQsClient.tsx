"use client";

import React, { useState, useMemo } from "react";
import { FAQ, Project } from "@/types";
import { AccordionItem } from "@/components/ui/AccordionItem";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { EnquireModal } from "@/components/ui/EnquireModal";
import { Search, HelpCircle, MessageCircle, Database, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }
};

const staggerContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { staggerChildren: 0.1 }
};

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
      const matchSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [faqs, activeCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-32 pt-44 md:pt-60 pb-32 bg-background overflow-x-hidden">

      {/* Hero */}
      <section className="container mx-auto px-6 text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/10 mb-2">
            <span className="tactical-label text-brand-blue">Information Center</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-[0.9]">
            Information <span className="text-brand-blue text-glow-blue underline decoration-brand-blue/20 underline-offset-[10px]">Portal</span>
          </h1>
          <p className="tactical-label text-muted-foreground/80 max-w-xl mx-auto">
            Find answers to commonly asked questions about our properties and services.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto relative group"
        >
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 group-focus-within:text-brand-blue transition-colors" size={20} />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card/40 border border-border/40 rounded-2xl px-16 py-6 text-[15px] font-black outline-none focus:border-brand-blue/30 shadow-2xl focus:shadow-[0_0_40px_rgba(90,161,255,0.1)] transition-all uppercase tracking-tight placeholder:text-muted-foreground/30 backdrop-blur-xl text-foreground"
          />
          <div className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-brand-blue/10 rounded border border-brand-blue/20 tactical-label text-brand-blue">SEARCH</div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 max-w-4xl space-y-16">
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={cn(
                "px-8 py-3.5 rounded-xl tactical-label transition-all border",
                activeCategory === cat
                  ? "bg-brand-blue text-black border-brand-blue shadow-[0_0_25px_rgba(90,161,255,0.4)]"
                  : "bg-muted/10 border-border/40 text-muted-foreground hover:border-brand-blue/30 hover:text-foreground"
              )}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Accordion List */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-6 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <motion.div key={faq.question} layout variants={fadeInUp}>
                  <AccordionItem
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === idx}
                    onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                {...fadeInUp}
                className="text-center py-32 space-y-6 opacity-30"
              >
                <div className="w-16 h-16 rounded-full border border-brand-blue/20 flex items-center justify-center mx-auto">
                  <ShieldCheck size={32} className="text-brand-blue" />
                </div>
                <p className="text-lg font-black uppercase tracking-widest italic">No matching questions found.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Support Link Card */}
        <motion.div
          {...fadeInUp}
          className="bg-card/40 border border-border/40 rounded-[2.5rem] p-12 md:p-20 text-center space-y-10 relative overflow-hidden group backdrop-blur-xl shadow-xl"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-gradient-to-r from-transparent via-brand-blue to-transparent group-hover:w-full transition-all duration-1000" />

          <div className="space-y-6">
            <div className="w-20 h-20 bg-brand-blue/10 rounded-2xl flex items-center justify-center mx-auto transition-transform duration-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(90,161,255,0.2)]">
              <MessageCircle className="text-brand-blue" size={32} />
            </div>
            <div className="space-y-4">
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground leading-tight">Need More Help?</h3>
              <p className="tactical-label text-muted-foreground/80 max-w-lg mx-auto">
                If you couldn't find the answer you were looking for, please get in touch with our support team.
              </p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} className="pt-6">
            <Link href="/contact" className="btn-brand px-16 py-6 text-[13px] shadow-[0_0_40px_rgba(90,161,255,0.3)]">
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Featured Context */}
      <section className="container mx-auto px-6 py-20">
        <motion.div {...fadeInUp} className="flex items-center gap-6 mb-20 overflow-hidden">
          <h2 className="section-heading whitespace-nowrap">Featured Projects</h2>
          <div className="h-[1px] w-full bg-border/40" />
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          {featuredProjects.slice(0, 3).map((project) => (
            <motion.div key={project.id} variants={fadeInUp}>
              <ProjectCard project={project} onEnquire={handleEnquire} />
            </motion.div>
          ))}
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
