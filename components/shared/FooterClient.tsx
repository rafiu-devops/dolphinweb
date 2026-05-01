"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Mail, MapPin, Phone, ArrowRight, Bell, ShieldCheck as Shield } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import { ContactInfo } from "@/types";

interface FooterClientProps {
  contact: ContactInfo;
}

export function FooterClient({ contact }: FooterClientProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
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
          <div className="flex flex-col lg:grid lg:grid-cols-[2.5fr_1.1fr_1.1fr_1.1fr_2.2fr] gap-8 md:gap-12 lg:gap-24">
            
            {/* 1. Identity & Logo Area */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:-ml-20">
              <Link href="/" className="inline-block transform hover:scale-105 transition-all duration-500 mb-6 md:mb-10">
                <img
                  src="/db-logo.png"
                  alt="Dolphin Builders Logo"
                  className="h-[100px] md:h-[180px] w-auto object-contain brightness-0 invert opacity-100"
                />
              </Link>
              <p className="text-[14px] md:text-[15px] leading-relaxed text-white max-w-[320px] font-medium opacity-90 mb-8 line-clamp-2">
                Premium real estate developers delivering high-end projects with surgical precision across Karachi.
              </p>
              
              {/* 2. Primary CTA Button */}
              <div className="w-full sm:w-auto mb-10 lg:mb-0">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-4 bg-white text-brand-blue px-10 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-white transition-all w-full sm:w-auto active:scale-95 shadow-xl"
                >
                  View Projects <ArrowRight size={14} />
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
                  <h4 className="text-[14px] font-black text-white uppercase tracking-[0.15em]">{section.title}</h4>
                  <ChevronDown className={cn("text-white transition-transform duration-300", openSection === section.title && "rotate-180")} size={18} />
                </button>
                
                {/* Desktop Heading */}
                <div className="hidden lg:block mb-10">
                  <h4 className="text-[16px] font-black text-white uppercase tracking-[0.16em] mb-3">{section.title}</h4>
                  <div className="w-10 h-[2px] bg-white rounded-full" />
                </div>

                <ul className={cn(
                  "overflow-hidden transition-all duration-300 lg:h-auto lg:opacity-100",
                  openSection === section.title ? "max-h-[500px] pb-6 opacity-100" : "max-h-0 opacity-0 lg:max-h-none"
                )}>
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="group py-3 text-[14px] md:text-[15px] text-white/90 flex items-center gap-0 transition-all hover:text-black lg:hover:pl-2 lg:border-b lg:border-white/10"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* 4. Newsletter Section */}
            <div className="space-y-10 lg:space-y-12 py-8 lg:py-0">
              <div className="text-center lg:text-left">
                <div className="hidden lg:block mb-10">
                  <h4 className="text-[16px] font-black text-white uppercase tracking-[0.16em] mb-3">Project Updates</h4>
                  <div className="w-10 h-[2px] bg-white rounded-full" />
                </div>
                <h4 className="lg:hidden text-[14px] font-black text-white uppercase tracking-[0.15em] mb-6">Project Updates</h4>
                
                <p className="text-[12px] text-white/75 uppercase tracking-widest leading-relaxed mb-8 mx-auto lg:mx-0 max-w-[280px]">
                  Subscribe for real-time property deployment alerts.
                </p>
                
                <div className="relative group max-w-sm mx-auto lg:mx-0">
                  <input
                    type="email"
                    suppressHydrationWarning
                    placeholder="EMAIL ADDRESS"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-[11px] font-black text-white outline-none focus:border-white transition-all placeholder:text-white/40 focus:bg-white/[0.15]"
                  />
                  <button 
                    suppressHydrationWarning
                    className="absolute right-2 top-2 bottom-2 bg-white hover:bg-black text-brand-blue hover:text-white px-5 rounded-lg transition-all active:scale-95 shadow-2xl group-hover:px-6"
                  >
                    <Bell size={16} />
                  </button>
                </div>
              </div>

              {/* 5. Social Icons */}
              <div className="flex flex-col items-center lg:items-start gap-6 pt-4 lg:pt-0">
                <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em] mb-2 opacity-60 text-center lg:text-left">Social Presence</h4>
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  {[
                    { icon: FaFacebookF, href: contact.social.facebook, brand: "#1877F2" },
                    { icon: FaInstagram, href: contact.social.instagram, brand: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" },
                    { icon: FaLinkedinIn, href: contact.social.linkedin, brand: "#0077B5" },
                    { icon: FaTiktok, href: contact.social.tiktok, brand: "#010101" },
                  ].map((social, idx) => (
                    <Link
                      key={idx}
                      href={social.href || "#"}
                      target="_blank"
                      className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-white hover:border-white transition-all duration-500 hover:-translate-y-2 shadow-2xl overflow-hidden group"
                    >
                      <div
                        className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                        style={{ background: social.brand }}
                      />
                      <social.icon size={20} className="relative z-10 transition-transform duration-300 group-hover:scale-125 md:size-[24px]" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* 8. Footer Bottom Bar (Copyright Bar) */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-12 flex flex-col items-center justify-center gap-6 text-center">
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-black font-black tracking-widest uppercase leading-tight">
            © <span suppressHydrationWarning>{currentYear}</span> <Link href={contact.social.facebook || "#"} target="_blank" className="text-brand-blue font-black hover:scale-105 transition-transform inline-block">Dolphin Builders</Link>. <br className="md:hidden" /> All Rights Reserved.
          </p>
          <p className="text-[13px] sm:text-[15px] md:text-[16px] font-black uppercase tracking-[0.2em] text-black/80">
            DEVELOPED BY <Link href="/marketing-partner" className="text-brand-blue font-black hover:scale-105 transition-transform inline-block">ANZI & .CO</Link>
          </p>
        </div>
      </div>
    </>
  );
}
