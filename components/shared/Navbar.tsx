"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronRight, Star, Play, CheckCircle2, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavbarProps { }

function BrandLogo({ height = 88, mobileHeight = 48 }: { height?: number; mobileHeight?: number }) {
  return (
    <div className="flex items-center gap-4 group">
      <div
        className="logo-container w-auto transition-all duration-500 flex items-center"
        style={{ height: `var(--logo-h, ${mobileHeight}px)` }}
      >
        <img
          src="/db-logo.png"
          alt="Dolphin Builders Logo"
          className="h-full w-auto object-contain"
        />
        <style jsx>{`
          .logo-container { --logo-h: ${mobileHeight}px; }
          @media (min-width: 768px) { .logo-container { --logo-h: ${height}px; } }
        `}</style>
      </div>
      <div className="flex flex-col">
        <span className="text-base sm:text-lg md:text-[24px] font-bold text-black tracking-tight leading-none group-hover:text-brand-blue transition-colors whitespace-nowrap">
          Dolphin Builders
        </span>
        <span className="tactical-label text-brand-blue mt-1 whitespace-nowrap">
          & Developers
        </span>
      </div>
    </div>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const pathname = usePathname();

  interface NavLink {
    name: string;
    href: string;
    hasDropdown?: boolean;
    dropdownItems?: { name: string; href: string; icon: any }[];
  }

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "FAQs", href: "/faqs" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    setMounted(true);
    let ticking = false;

    const updateScroll = () => {
      setScrolled(window.scrollY > 20);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  return (
    <div className="w-full transition-all duration-300 pointer-events-none relative">
      <header
        className={cn(
          "max-w-7xl mx-auto transition-all duration-500 pointer-events-auto origin-top mt-2 md:mt-4 bg-white/95 backdrop-blur-xl border border-black/5 shadow-[0_20px_40px_rgba(0,0,0,0.1)] rounded-[1.5rem] md:rounded-[2.5rem]",
          scrolled ? "h-[90px] md:h-[100px]" : "h-[110px] md:h-[124px]"
        )}
      >
        <div className="h-full px-6 md:px-10 flex items-center justify-between">
          <Link href="/" prefetch={false} className="hover:opacity-90 transition-opacity">
            <BrandLogo height={scrolled ? 64 : 88} mobileHeight={48} />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <nav className="flex items-center gap-2">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative py-4"
                  onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={link.href}
                    prefetch={false}
                    onMouseEnter={() => setHoveredPath(link.href)}
                    onMouseLeave={() => setHoveredPath(null)}
                    className={cn(
                      "px-6 py-2.5 tactical-label text-[13px] rounded-2xl transition-all duration-300 relative flex items-center gap-1.5",
                      (hoveredPath === link.href || (!hoveredPath && pathname === link.href))
                        ? "text-white"
                        : "text-[#373635]/70"
                    )}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {link.hasDropdown && (
                      <ChevronRight size={14} className={cn("relative z-10 transition-transform duration-300", activeDropdown === link.name && "rotate-90")} />
                    )}

                    {(hoveredPath === link.href || (!hoveredPath && pathname === link.href)) && (
                      <motion.div
                        layoutId="navHighlight"
                        className="absolute inset-0 rounded-2xl bg-brand-blue shadow-[0_10px_20px_rgba(26,106,255,0.3)] z-0"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>

                  {/* Sub-menu Dropdown */}
                  <AnimatePresence>
                    {link.hasDropdown && activeDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-0 w-72 bg-white p-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-black/5 z-[110]"
                      >
                        <div className="flex flex-col gap-1">
                          {link.dropdownItems?.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="group flex items-center justify-between p-4 rounded-2xl hover:bg-brand-blue/5 transition-all"
                            >
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue group-hover:bg-brand-blue group-hover:text-black transition-all">
                                  <item.icon size={18} />
                                </div>
                                <span className="text-[13px] font-bold text-black/80 group-hover:text-black transition-colors">{item.name}</span>
                              </div>
                              <ChevronRight size={16} className="text-black/20 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            <Link
              href="/contact"
              prefetch={false}
              className="bg-brand-blue text-white px-8 py-4 tactical-label text-[13px] rounded-2xl transition-all hover:bg-black hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
            >
              Contact Us
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 border-1.5 border-brand-blue/40 rounded-lg transition-all active:scale-95"
            aria-label="Toggle Menu"
          >
            <span className={cn("w-6 h-[2px] bg-[#373635] rounded-full transition-all duration-300", isOpen && "rotate-45 translate-y-2 bg-brand-blue")} />
            <span className={cn("w-6 h-[2px] bg-[#373635] rounded-full transition-all duration-300", isOpen && "opacity-0")} />
            <span className={cn("w-6 h-[2px] bg-[#373635] rounded-full transition-all duration-300", isOpen && "-rotate-45 -translate-y-2 bg-brand-blue")} />
          </button>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence mode="wait">
          {mounted && isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-[3px] md:hidden"
              />
              <motion.aside
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-screen w-[320px] z-[100] bg-white border-l border-brand-blue/20 shadow-[-8px_0_40px_rgba(0,0,0,0.15)] flex flex-col md:hidden overflow-y-auto"
              >
                <div className="px-8 py-8 flex items-center justify-between border-b border-black/5 text-black">
                  <BrandLogo mobileHeight={40} />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 flex items-center justify-center bg-brand-blue/5 border border-brand-blue/20 rounded-xl text-brand-blue"
                  >
                    <X size={20} />
                  </button>
                </div>

                <nav className="flex-1 px-6 py-10 flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <div key={link.name}>
                      <Link
                        href={link.href}
                        prefetch={false}
                        className={cn(
                          "flex items-center justify-between px-6 py-5 rounded-2xl tactical-label text-[14px] transition-all",
                          pathname === link.href
                            ? "text-brand-blue bg-brand-blue/5 border border-brand-blue/20"
                            : "text-[#373635] hover:text-brand-blue hover:bg-brand-blue/[0.04]"
                        )}
                      >
                        {link.name}
                        <ChevronRight size={18} className={cn("opacity-40", pathname === link.href && "opacity-100")} />
                      </Link>


                    </div>
                  ))}
                </nav>

                <div className="mt-auto p-8 border-t border-black/5 flex flex-col gap-6">
                  <Link
                    href="/contact"
                    prefetch={false}
                    className="w-full bg-brand-blue text-white py-5 rounded-2xl text-center text-[15px] font-bold uppercase tracking-[0.1em] shadow-xl hover:bg-black transition-colors"
                  >
                    Contact Us
                  </Link>
                  <div className="flex items-center justify-center gap-3 tactical-label text-black/60">
                    <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                      <Phone size={16} />
                    </div>
                    +92 347 0139661
                  </div>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
