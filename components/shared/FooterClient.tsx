"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, MapPin, Phone, ArrowRight, Bell, ShieldCheck as Shield, Loader2, CheckCircle2 } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";
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
          projectName: "Newsletter"
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

  const navSections = [
    {
      title: "Quick Links",
      items: [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/projects" },
        { name: "About", href: "/about" },
        { name: "FAQs", href: "/faqs" },
        { name: "Contact", href: "/contact" },
      ]
    },
    {
      title: "Our Projects",
      items: [
        { name: "Dolphin Tower", href: "/projects/dolphin-tower" },
        { name: "Dolphin Plaza", href: "/projects/dolphin-plaza" },
        { name: "Dream City Sukkur", href: "/projects/dream-city" },
        { name: "Dolphin River View Plaza", href: "/projects/river-view" },
      ]
    },
    {
      title: "Project Locations",
      items: [
        { name: "Minara Road, Sukkur", href: "/projects" },
        { name: "Main City Area, Sukkur", href: "/projects" },
        { name: "Dream City Location", href: "/projects" },
        { name: "River View Area, Sukkur", href: "/projects" },
      ]
    }
  ];

  return (
    <>
      <footer className="bg-brand-blue border-t-[3px] border-white/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-12 md:pt-24 pb-12 md:pb-20 relative z-10">

          {/* Mobile Hierarchy: Logo -> CTA -> Nav -> Newsletter -> Socials */}
          <div className="flex flex-col lg:grid lg:grid-cols-[2.2fr_1fr_1fr_1fr_2.8fr] gap-8 md:gap-12 lg:gap-16">

            {/* 1. Identity & Logo Area */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <Link href="/" className="inline-block transform hover:scale-105 transition-all duration-500 mb-6 md:mb-10">
                <img
                  src="/db-logo.png"
                  alt="Dolphin Builders Logo"
                  className="h-[100px] md:h-[180px] w-auto object-contain brightness-0 invert opacity-100"
                />
              </Link>
              <p className="text-[17px] md:text-[19px] leading-relaxed text-white max-w-[380px] font-medium opacity-95 mb-10">
                Premium real estate developers delivering high-end projects with precision across Sindh.
              </p>

              {/* 2. Primary CTA Button */}
              <div className="w-full sm:w-auto mb-10 lg:mb-0">
                <Link
                  href="/projects"
                  className="font-sans inline-flex items-center justify-center gap-4 bg-white text-brand-blue px-12 py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-[14px] hover:bg-black hover:text-white transition-all w-full sm:w-auto active:scale-95 shadow-2xl"
                >
                  View Projects <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* 3. Navigation Sections (Accordions on Mobile) */}
            {navSections.map((section) => (
              <div key={section.title} className="border-b border-white/10 lg:border-none">
                <button
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between py-5 lg:hidden"
                >
                  <h4 className="font-heading text-[22px] font-normal text-white uppercase tracking-[0.1em]">{section.title}</h4>
                  <ChevronDown className={cn("text-white transition-transform duration-300", openSection === section.title && "rotate-180")} size={22} />
                </button>

                {/* Desktop Heading */}
                <div className="hidden lg:block mb-10">
                  <h4 className="font-heading text-[28px] font-normal text-white uppercase tracking-[0.1em] mb-4">{section.title}</h4>
                  <div className="w-16 h-[3px] bg-white rounded-full" />
                </div>

                <ul className={cn(
                  "overflow-hidden transition-all duration-300 lg:h-auto lg:opacity-100",
                  openSection === section.title ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0 lg:max-h-none"
                )}>
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="group py-4 font-sans text-[16px] md:text-[18px] text-white font-medium flex items-center gap-0 transition-all hover:text-black lg:hover:pl-2 lg:border-b lg:border-white/10"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 4. Newsletter Section */}
            <div className="space-y-10 lg:space-y-12 py-8 lg:py-0 lg:col-span-1">
              <div className="text-center lg:text-left">
                <div className="hidden lg:block mb-8">
                  <h4 className="font-heading text-[32px] font-normal text-white uppercase tracking-[0.1em] mb-5">Project Updates</h4>
                  <div className="w-20 h-[4px] bg-white rounded-full" />
                </div>
                <h4 className="lg:hidden font-heading text-[22px] font-normal text-white uppercase tracking-[0.1em] mb-8">Project Updates</h4>

                <p className="text-[15px] md:text-[17px] text-white uppercase tracking-[0.15em] leading-relaxed mb-12 mx-auto lg:mx-0 max-w-[360px] font-bold">
                  Subscribe for real-time property deployment alerts and exclusive investor access.
                </p>

                <form
                  onSubmit={handleNewsletterSubmit}
                  className="relative group max-w-full lg:max-w-2xl mx-auto lg:mx-0"
                >
                  <input
                    required
                    type="email"
                    suppressHydrationWarning
                    placeholder="EMAIL ADDRESS"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white text-brand-blue border-2 border-white/20 rounded-2xl px-6 pr-24 md:pr-32 py-5 md:py-6 font-sans text-[13px] md:text-[15px] font-semibold outline-none focus:border-white transition-all placeholder:text-brand-blue/40 shadow-2xl"
                  />
                  <button
                    disabled={isSubmitting}
                    suppressHydrationWarning
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-black hover:bg-brand-blue text-white hover:text-black px-4 md:px-8 rounded-xl transition-all active:scale-95 shadow-2xl flex items-center justify-center disabled:opacity-50 min-w-[50px]"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : isSuccess ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Bell size={20} />
                    )}
                  </button>

                  {isSuccess && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -bottom-10 left-0 text-[11px] font-black uppercase tracking-widest text-white/90 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg"
                    >
                      Subscription Successful
                    </motion.p>
                  )}
                </form>
              </div>

            </div>
          </div>
        </div>
      </footer>

      {/* 8. Footer Bottom Bar (Copyright Bar) */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12 flex flex-col items-center justify-center gap-6 text-center">
          <p className="font-sans text-[14px] sm:text-[16px] md:text-[18px] text-black font-semibold tracking-widest uppercase leading-tight">
            © <span suppressHydrationWarning>{currentYear}</span> <Link href={contact.social.facebook || "#"} target="_blank" className="text-brand-blue font-bold hover:scale-105 transition-transform inline-block">Dolphin Builders</Link>. <br className="md:hidden" /> All Rights Reserved.
          </p>
          <p className="font-sans text-[13px] sm:text-[15px] md:text-[16px] font-semibold uppercase tracking-[0.2em] text-black/80">
            DEVELOPED BY <Link href="https://www.anziandco.com/?refer=dolphinbuilders" target="_blank" className="text-brand-blue font-bold hover:scale-105 transition-transform inline-block">ANZI & .CO</Link>
          </p>
        </div>
      </div>
    </>
  );
}
