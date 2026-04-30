"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SLIDE_IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop", // Modern Skyscraper
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop", // Corporate Office
  "https://images.unsplash.com/photo-1503387762-592dee58c160?q=80&w=2000&auto=format&fit=crop", // Luxury Development
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop"  // Commercial Hub
];

interface ProjectsHeroProps {
  title?: string;
  italicTitle?: string;
  subtitle?: string;
}

export function ProjectsHero({ 
  title = "Project Portfolio", 
  italicTitle = "Strategic Developments in Sukkur", 
  subtitle = "Explore our curated collection of residential, commercial, and mixed-use developments — from landmark towers to modern housing schemes, built to deliver long-term value and premium living experiences." 
}: ProjectsHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-[65vh] md:min-h-[75vh] flex items-center pt-32 md:pt-44 pb-20 overflow-hidden bg-black">
      {/* Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-10" />
          <img
            src={SLIDE_IMAGES[currentIndex]}
            alt="Sector Deployment Area"
            className="w-full h-full object-contain"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl space-y-8">
          <motion.nav 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white tactical-label hover:bg-brand-blue hover:text-black hover:border-brand-blue transition-all"
            >
              Home
            </Link>
            <div className="w-4 h-[1px] bg-white/20" />
            <Link 
              href="/projects" 
              className="px-4 py-2 rounded-lg bg-brand-blue/10 border border-brand-blue/30 text-brand-blue tactical-label"
            >
              Our Projects
            </Link>
          </motion.nav>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-tight"
            >
              {title} <br />
              <span className="text-brand-blue italic drop-shadow-[0_0_20px_rgba(90,161,255,0.3)] text-3xl md:text-5xl block mt-4">
                {italicTitle}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/60 font-medium max-w-2xl leading-relaxed italic"
            >
              {subtitle}
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center gap-6"
          >
            <div className="w-16 h-[2px] bg-brand-blue" />
            <span className="tactical-label text-white/60">
              ACTIVE PROJECT SHOWCASE
            </span>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 right-12 z-20 flex gap-3">
        {SLIDE_IMAGES.map((_, i) => (
          <div 
            key={i}
            className={`h-1 transition-all duration-500 rounded-full ${
              i === currentIndex ? "w-12 bg-brand-blue" : "w-4 bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
