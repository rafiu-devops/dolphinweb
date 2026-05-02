"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Layout,
  Smartphone,
  Target,
  Zap,
  ShieldCheck,
  TrendingUp,
  MousePointer2,
  ArrowRight,
  Code2,
  Palette,
  Globe,
  CheckCircle2,
  Rocket
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ImageSlider } from "@/components/ui/ImageSlider";

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

export default function MarketingPartnerPage() {
  const coverImages = [
    "/cover-image1.png",
    "/cover-image2.png",
    "/cover-image3.png",
  ];

  return (
    <div className="flex flex-col bg-background overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[500px] md:min-h-[700px] lg:min-h-screen flex items-center overflow-hidden bg-white pt-40 md:pt-60 pb-12 md:pb-20">
        <div className="absolute inset-0 z-0">
          <ImageSlider
            images={coverImages}
            autoPlay={true}
            showArrows={false}
            showDots={true}
            interval={5000}
            className="h-full w-full grayscale-0 opacity-100 transition-all duration-1000 [&_div.flex>div:nth-child(1)_img]:object-cover"
          />
        </div>
        {/* Overlays removed for clear visibility as requested */}

        <div className="container mx-auto px-6 md:px-20 relative z-10 pt-32">
          {/* Hero Content Removed as requested */}
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="py-24 md:py-32 bg-bg-card/30">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-center">
            <motion.div {...fadeInUp} className="space-y-6 md:space-y-8 text-center lg:text-left">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tighter leading-[1.1] md:leading-none italic uppercase">
                A little about <br />
                <span className="text-brand-blue drop-shadow-sm">Anzi & .Co</span>
              </h2>

              <p className="text-lg md:text-xl font-medium text-foreground/70 leading-relaxed max-w-md">
                We are a team of innovators, strategists, and creators dedicated to helping businesses grow, scale, and lead in the digital era. At Anzi & .Co., we bring together expertise to deliver complete, one-window solutions.
              </p>

              <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                <Link
                  href="/contact"
                  className="bg-brand-blue text-black px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] md:text-[13px] hover:shadow-[0_10px_30px_rgba(90,161,255,0.3)] transition-all active:scale-95 flex-1 sm:flex-none text-center"
                >
                  Contact Us
                </Link>
                <Link
                  href="#"
                  className="bg-white text-black border-2 border-border/40 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] md:text-[13px] hover:border-brand-blue hover:text-brand-blue transition-all active:scale-95 flex-1 sm:flex-none text-center"
                >
                  Join Our Team
                </Link>
              </div>
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="relative aspect-video lg:aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-border/40 shadow-2xl group"
            >
              <img
                src="/anzi-team-cover.webp"
                alt="Anzi & Co Team"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. OUR CONTRIBUTION */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-20">
          <motion.div {...fadeInUp} className="mb-20 text-center lg:text-left">
            <h2 className="section-heading italic">Our Contribution</h2>
            <p className="tactical-label text-brand-blue mt-4">
              Strategic Deployment for Dolphin Builders
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Palette,
                title: "UI/UX Design",
                desc: "Crafted a bespoke visual identity and intuitive user journey that emphasizes luxury and trust."
              },
              {
                icon: Code2,
                title: "Frontend Development",
                desc: "High-performance implementation using Next.js for lightning-fast speeds and seamless transitions."
              },
              {
                icon: Smartphone,
                title: "Responsive Design",
                desc: "Pixel-perfect adaptation across all devices, ensuring a premium experience on mobile, tablet, and desktop."
              },
              {
                icon: Target,
                title: "Lead Generation",
                desc: "Integrated strategic forms and WhatsApp protocols to convert visitors into high-value prospects."
              },
              {
                icon: Zap,
                title: "Performance Optimization",
                desc: "Surgical-grade code optimization for maximum efficiency, SEO performance, and user retention."
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="p-8 md:p-10 rounded-3xl bg-bg-card border border-border/40 hover:border-brand-blue/30 transition-all duration-500 group shadow-lg"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-blue/10 text-brand-blue rounded-xl flex items-center justify-center group-hover:bg-brand-blue group-hover:text-black transition-all mb-6">
                  <item.icon size={20} />
                </div>
                <h3 className="text-lg md:text-xl font-black uppercase tracking-tight italic mb-3 text-foreground">{item.title}</h3>
                <p className="text-[14px] md:text-[15px] text-muted-foreground leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. EXPERTISE SECTION */}
      <section className="py-24 md:py-32 bg-[#0a0f1e] text-white">
        <div className="container mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-20 items-center">
            <motion.div {...fadeInUp} className="space-y-8">
              <h2 className="section-heading italic text-white">Our Expertise</h2>
              <p className="text-white/60 text-lg leading-relaxed uppercase tracking-wide font-medium">
                We leverage cutting-edge technology and creative strategy to help brands dominate their digital landscape.
              </p>
              <ul className="space-y-4">
                {["Data-Driven Strategy", "Creative Innovation", "Technical Excellence"].map((list, i) => (
                  <li key={i} className="flex items-center gap-3 text-brand-blue font-black uppercase tracking-widest text-sm">
                    <CheckCircle2 size={18} />
                    {list}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                { icon: Monitor, title: "Web Development", desc: "Building scalable, high-performance web applications." },
                { icon: Layout, title: "UI/UX Design", desc: "User-centric designs that drive engagement and conversion." },
                { icon: TrendingUp, title: "Real Estate Platforms", desc: "Specialized solutions for property developers & builders." },
                { icon: Rocket, title: "Digital Branding", desc: "Elevating brands through cohesive visual storytelling." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-blue/50 transition-all duration-500 hover:-translate-y-1"
                >
                  <item.icon size={28} className="text-brand-blue mb-6" />
                  <h3 className="text-lg font-black uppercase tracking-tight mb-3 italic">{item.title}</h3>
                  <p className="text-[13px] text-white/50 leading-relaxed font-medium">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. PROJECT HIGHLIGHTS */}
      <section className="py-24 md:py-32 overflow-hidden bg-background">
        <div className="container mx-auto px-6 md:px-20">
          <motion.div {...fadeInUp} className="text-center mb-24">
            <h2 className="section-heading italic">Project Highlights</h2>
            <div className="w-20 h-1.5 bg-brand-blue rounded-full mx-auto mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { title: "Modern Design", accent: "Aesthetic Excellence" },
              { title: "Mobile Friendly", accent: "Omnichannel Access" },
              { title: "High Performance", accent: "Optimized Core" },
              { title: "Conversion Focused", accent: "ROI Centric" }
            ].map((highlight, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="text-center space-y-4 p-8 rounded-3xl group"
              >
                <h4 className="text-2xl font-black uppercase tracking-tighter italic text-foreground group-hover:text-brand-blue transition-colors">
                  {highlight.title}
                </h4>
                <p className="tactical-label text-muted-foreground group-hover:text-foreground transition-colors">
                  {highlight.accent}
                </p>
                <div className="flex justify-center">
                  <div className="w-10 h-1 bg-border/40 group-hover:w-20 group-hover:bg-brand-blue transition-all duration-500 rounded-full" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="container mx-auto px-6 py-24 mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-brand-blue rounded-[3rem] p-12 md:p-24 shadow-[0_0_80px_rgba(90,161,255,0.25)] overflow-hidden relative group text-center"
        >
          {/* Animated Glows */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-1000" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2 group-hover:scale-125 transition-transform duration-1000" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-3xl sm:text-4xl md:text-7xl font-black uppercase tracking-tighter italic leading-tight text-white/40">
              Looking to build a <br />
              <span className="text-white drop-shadow-2xl">Premium</span> Digital Presence?
            </h2>
            <p className="text-lg md:text-2xl font-black text-black/60 uppercase tracking-widest leading-relaxed">
              Partner with Anzi & Co to elevate your brand.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-black text-white px-12 py-6 rounded-2xl tactical-label text-[15px] hover:bg-black/90 transition-all shadow-3xl"
              >
                Get in Touch <ArrowRight size={20} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
