"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const locations = [
  { 
    name: "Dubai Marina", 
    images: [
      "https://images.unsplash.com/photo-1582672093812-7801be68198b?q=80&w=1200",
      "https://images.unsplash.com/photo-1546412414-e1885261bb9b?q=80&w=1200",
      "https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=1200"
    ],
    properties: 12,
    slug: "dubai-marina"
  },
  { 
    name: "Palm Jumeirah", 
    images: [
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200",
      "https://images.unsplash.com/photo-1574676163346-641570776a39?q=80&w=1200",
      "https://images.unsplash.com/photo-1590490359683-658d3d23f972?q=80&w=1200"
    ],
    properties: 8,
    slug: "palm-jumeirah"
  },
  { 
    name: "Downtown Dubai", 
    images: [
      "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1200",
      "https://images.unsplash.com/photo-1528702748617-c64d49f918af?q=80&w=1200",
      "https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=1200"
    ],
    properties: 15,
    slug: "downtown-dubai"
  },
  { 
    name: "Business Bay", 
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200",
      "https://images.unsplash.com/photo-1565967511849-76a60a516170?q=80&w=1200",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
    ],
    properties: 24,
    slug: "business-bay"
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
};

function LocationCard({ loc, isStaggered }: { loc: typeof locations[0], isStaggered: boolean }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % loc.images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [loc.images.length]);

  return (
    <motion.div
      {...fadeInUp}
      className={isStaggered ? "lg:mt-32" : ""}
    >
      <Link 
        href={`/projects?location=${loc.slug}`}
        className="group relative block aspect-[16/10] lg:aspect-[16/11] rounded-[3.5rem] overflow-hidden border border-white/10 hover:border-brand-blue/40 transition-all duration-700 shadow-3xl bg-[#0a0f1a]"
      >
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            src={loc.images[currentImageIndex] && loc.images[currentImageIndex].trim() !== "" ? loc.images[currentImageIndex] : "/assets/projects/placeholder.png"} 
            alt={loc.name}
            className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0"
            onError={(e) => (e.currentTarget.src = "/assets/projects/placeholder.png")}
          />
        </AnimatePresence>
        
        {/* Overlays */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-brand-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-[11]" />
        
        {/* Content */}
        <div className="absolute inset-0 p-12 flex flex-col justify-end gap-3 z-20">
          <div className="flex items-center gap-3 text-brand-blue">
            <div className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
            <span className="tactical-label">{loc.properties} Operational Hubs</span>
          </div>
          <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-white group-hover:text-brand-blue transition-all duration-500 transform group-hover:-translate-y-2">
            {loc.name}
          </h3>
          
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {loc.images.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 rounded-full transition-all duration-500 ${i === currentImageIndex ? "w-8 bg-brand-blue" : "w-2 bg-white/20"}`} 
                />
              ))}
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 group-hover:bg-brand-blue group-hover:text-black shadow-[0_0_30px_rgba(90,161,255,0.3)]">
              <ArrowUpRight size={24} />
            </div>
          </div>
        </div>

        {/* Tactical Edge Scan Effect */}
        <div className="absolute inset-0 border-2 border-brand-blue/0 group-hover:border-brand-blue/20 rounded-[3.5rem] transition-all duration-700 pointer-events-none z-30" />
      </Link>
    </motion.div>
  );
}

export function LocationSection() {
  return (
    <section className="container mx-auto px-6 py-16">
      <motion.div 
        {...fadeInUp}
        className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10 mb-24 text-center md:text-left"
      >
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue mb-4 mx-auto md:mx-0">
             <MapPin size={14} />
             <span className="tactical-label">Strategic Geolocation</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
            Explore <span className="text-brand-blue text-glow-blue italic">Location</span>
          </h2>
          <p className="tactical-label text-muted-foreground/80 max-w-xl">
            Signature neighborhoods. Tactical urban placement. Elite real estate assets across Dubai's most profitable operational zones.
          </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {locations.map((loc, idx) => (
          <LocationCard 
            key={loc.name} 
            loc={loc} 
            isStaggered={idx % 2 !== 0} 
          />
        ))}
      </div>
    </section>
  );
}
