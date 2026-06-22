"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  MapPin,
  Phone,
  ArrowRight,
  Bell,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { ContactInfo } from "@/types";

interface FooterClientProps {
  contact: ContactInfo;
}

export function FooterClient({ contact }: FooterClientProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email,
          message: "Newsletter Subscription from Footer",
          projectName: "Newsletter",
        }),
      });
      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact", href: "/contact" },
  ];

  const projects = [
    { name: "Dolphin Tower", href: "/projects/dolphin-tower" },
    { name: "Dolphin Plaza", href: "/projects/dolphin-plaza" },
    { name: "Dream City Sukkur", href: "/projects/dream-city" },
    { name: "Dolphin River View Plaza", href: "/projects/river-view" },
  ];

  const ColHeading = ({ title }: { title: string }) => (
    <div className="mb-7">
      <h4 className="font-heading text-[13px] font-bold text-white uppercase tracking-[0.22em] mb-3">
        {title}
      </h4>
      <div className="w-8 h-[2px] bg-white/60 rounded-full" />
    </div>
  );

  const MobileAccordion = ({
    title,
    id,
    children,
  }: {
    title: string;
    id: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-white/10">
      <button
        onClick={() => toggleSection(id)}
        className="w-full flex items-center justify-between py-4"
      >
        <span className="font-heading text-[13px] font-bold text-white uppercase tracking-[0.22em]">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "text-white/70 transition-transform duration-300",
            openSection === id && "rotate-180"
          )}
          size={18}
        />
      </button>
      <AnimatePresence initial={false}>
        {openSection === id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* ─── TOP BAND: CTA strip ─── */}
      <div className="bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-heading text-[12px] font-bold uppercase tracking-[0.25em] text-white/60">
            Premium Real Estate · Sukkur, Sindh
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 bg-brand-blue text-white px-7 py-3 rounded-lg font-sans font-bold uppercase tracking-[0.18em] text-[12px] hover:bg-white hover:text-brand-blue transition-all active:scale-95"
          >
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* ─── MAIN FOOTER ─── */}
      <footer className="bg-brand-blue relative overflow-hidden">
        {/* Subtle grid watermark */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 md:pt-20 pb-12 relative z-10">

          {/* ── DESKTOP LAYOUT ── */}
          <div className="hidden lg:grid lg:grid-cols-[2fr_1fr_1.2fr_1fr_1.8fr] gap-x-12 gap-y-0 items-start">

            {/* Col 1 — Brand */}
            <div className="pr-6">
              <Link href="/" className="inline-block mb-8 hover:opacity-80 transition-opacity">
                <img
                  src="/db-logo.png"
                  alt="Dolphin Builders"
                  className="h-[120px] w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="text-[15px] leading-relaxed text-white/80 font-sans font-normal mb-8 max-w-[280px]">
                Delivering high-end real estate projects with precision and integrity across Sindh.
              </p>
            </div>

            {/* Col 2 — Quick Links */}
            <div>
              <ColHeading title="Quick Links" />
              <ul className="flex flex-col gap-0">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 py-[10px] border-b border-white/10 text-[14px] font-sans text-white/80 hover:text-white transition-all last:border-0"
                    >
                      <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 opacity-0 group-hover:opacity-100">
                        <ArrowRight size={11} />
                      </span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Our Projects */}
            <div>
              <ColHeading title="Our Projects" />
              <ul className="flex flex-col gap-0">
                {projects.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="group flex items-center gap-2 py-[10px] border-b border-white/10 text-[14px] font-sans text-white/80 hover:text-white transition-all last:border-0"
                    >
                      <span className="w-0 group-hover:w-3 overflow-hidden transition-all duration-200 opacity-0 group-hover:opacity-100">
                        <ArrowRight size={11} />
                      </span>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4 — Contact */}
            <div>
              <ColHeading title="Contact Us" />
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-white/10 flex items-center justify-center mt-0.5">
                    <MapPin size={14} className="text-white" />
                  </div>
                  <p className="text-[13px] font-sans text-white/80 leading-relaxed">
                    {contact.address}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                    <Phone size={14} className="text-white" />
                  </div>
                  <a
                    href="tel:03702502769"
                    className="text-[13px] font-sans font-semibold text-white hover:text-white/70 transition-colors tracking-wide"
                  >
                    0370 2502769
                  </a>
                </div>
                {/* Social icons */}
                <div className="flex items-center gap-3 mt-1">
                  <a
                    href={contact.social.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#1877F2] hover:scale-110 transition-transform shadow-md"
                    aria-label="Facebook"
                  >
                    <FaFacebookF size={15} />
                  </a>
                  <a
                    href={contact.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#E4405F] hover:scale-110 transition-transform shadow-md"
                    aria-label="Instagram"
                  >
                    <FaInstagram size={16} />
                  </a>
                </div>
              </div>
            </div>

            {/* Col 5 — Newsletter */}
            <div>
              <ColHeading title="Project Updates" />
              <p className="text-[13px] font-sans text-white/75 leading-relaxed mb-6">
                Get real-time property alerts and exclusive investor access straight to your inbox.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="relative">
                <input
                  required
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  suppressHydrationWarning
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 pr-14 font-sans text-[13px] text-white placeholder:text-white/40 outline-none focus:border-white/60 focus:bg-white/15 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  suppressHydrationWarning
                  className="absolute right-2 top-2 bottom-2 w-9 bg-white hover:bg-black rounded-lg flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                  ) : isSuccess ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <Bell size={15} className="text-brand-blue" />
                  )}
                </button>
              </form>
              <AnimatePresence>
                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-[11px] font-sans font-semibold uppercase tracking-widest text-white/70"
                  >
                    ✓ Subscribed successfully
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-12 pt-6 border-t border-white/10">
                <p className="font-sans text-[11px] font-bold text-white/50 uppercase tracking-[0.2em]">
                  Developed by{" "}
                  <Link
                    href="https://www.anziandco.com/?refer=dolphinbuilders"
                    target="_blank"
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    Anzi & .Co
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* ── MOBILE LAYOUT ── */}
          <div className="lg:hidden flex flex-col gap-0">
            {/* Brand block */}
            <div className="flex flex-col items-center text-center pb-8 mb-4 border-b border-white/10">
              <Link href="/" className="inline-block mb-5 hover:opacity-80 transition-opacity">
                <img
                  src="/db-logo.png"
                  alt="Dolphin Builders"
                  className="h-[90px] w-auto object-contain brightness-0 invert"
                />
              </Link>
              <p className="text-[14px] text-white/75 font-sans leading-relaxed max-w-[300px] mb-5">
                Delivering high-end real estate projects across Sindh.
              </p>
            </div>

            {/* Quick Links accordion */}
            <MobileAccordion title="Quick Links" id="quick">
              <ul className="flex flex-col gap-0">
                {quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="flex items-center gap-2 py-3 text-[15px] font-sans text-white/80 hover:text-white border-b border-white/10 last:border-0 transition-colors">
                      <ArrowRight size={13} className="opacity-50" /> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </MobileAccordion>

            {/* Our Projects accordion */}
            <MobileAccordion title="Our Projects" id="projects">
              <ul className="flex flex-col gap-0">
                {projects.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href} className="flex items-center gap-2 py-3 text-[15px] font-sans text-white/80 hover:text-white border-b border-white/10 last:border-0 transition-colors">
                      <ArrowRight size={13} className="opacity-50" /> {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </MobileAccordion>

            {/* Contact accordion */}
            <MobileAccordion title="Contact Us" id="contact">
              <div className="flex flex-col gap-4 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-white/10 flex items-center justify-center mt-0.5">
                    <MapPin size={14} className="text-white" />
                  </div>
                  <p className="text-[14px] font-sans text-white/80 leading-relaxed">{contact.address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-lg bg-white/10 flex items-center justify-center">
                    <Phone size={14} className="text-white" />
                  </div>
                  <a href="tel:03702502769" className="text-[14px] font-sans font-semibold text-white">0370 2502769</a>
                </div>
                {/* Social icons */}
                <div className="flex items-center gap-3 mt-2">
                  <a href={contact.social.facebook} target="_blank" rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#1877F2] hover:scale-110 transition-transform shadow-md">
                    <FaFacebookF size={16} />
                  </a>
                  <a href={contact.social.instagram} target="_blank" rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#E4405F] hover:scale-110 transition-transform shadow-md">
                    <FaInstagram size={18} />
                  </a>
                </div>
              </div>
            </MobileAccordion>

            {/* Newsletter — always visible on mobile */}
            <div className="pt-7 pb-4">
              <h4 className="font-heading text-[13px] font-bold text-white uppercase tracking-[0.22em] mb-2">
                Project Updates
              </h4>
              <div className="w-8 h-[2px] bg-white/60 rounded-full mb-5" />
              <p className="text-[13px] font-sans text-white/75 leading-relaxed mb-4">
                Get real-time property alerts and exclusive investor access.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="relative">
                <input
                  required
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  suppressHydrationWarning
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3.5 pr-14 font-sans text-[14px] text-white placeholder:text-white/40 outline-none focus:border-white/60 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  suppressHydrationWarning
                  className="absolute right-2 top-2 bottom-2 w-9 bg-white hover:bg-black rounded-lg flex items-center justify-center transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin text-brand-blue" />
                  ) : isSuccess ? (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  ) : (
                    <Bell size={15} className="text-brand-blue" />
                  )}
                </button>
              </form>
              <AnimatePresence>
                {isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 text-[11px] font-sans font-semibold uppercase tracking-widest text-white/70"
                  >
                    ✓ Subscribed successfully
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="mt-6">
                <p className="font-sans text-[11px] font-bold text-white/50 uppercase tracking-[0.2em] text-center">
                  Developed by{" "}
                  <Link
                    href="https://www.anziandco.com/?refer=dolphinbuilders"
                    target="_blank"
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    Anzi & .Co
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* ── DIVIDER ── */}
          <div className="mt-8 lg:mt-14 pt-6 border-t border-white/10 flex items-center justify-center text-center">
            <p className="font-sans text-[12px] font-bold text-white tracking-widest uppercase">
              © {currentYear}{" "}
              <Link
                href={contact.social.facebook || "#"}
                target="_blank"
                className="text-white hover:text-white/80 transition-colors"
              >
                Dolphin Builders
              </Link>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}