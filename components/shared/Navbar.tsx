"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, ChevronRight, Star, Play, CheckCircle2, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavbarProps { }

function BrandLogo({ height = 88, mobileHeight = 48, theme = "dark" }: { height?: number; mobileHeight?: number; theme?: "light" | "dark" }) {
  return (
    <div className="flex items-center group">
      <div
        className="logo-container w-auto transition-all duration-500 flex items-center pl-2 md:pl-4"
        style={{ height: `var(--logo-h, ${mobileHeight}px)` }}
      >
        <img
          src="/db-logo.png"
          alt="Dolphin Builders Logo"
          className="h-full w-auto object-contain origin-left scale-[1.4] md:scale-110"
        />
        <style jsx>{`
          .logo-container { --logo-h: ${mobileHeight * 2.2}px; max-height: 96px; }
          @media (min-width: 768px) { .logo-container { --logo-h: ${height * 1.6}px; max-height: 100px; } }
        `}</style>
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

  const isLightPage = (pathname.startsWith("/projects/") && pathname !== "/projects") ||
    pathname === "/faqs";
  const activeTheme = isLightPage ? "light" : "dark";

  return (
    <div className="w-full transition-all duration-300 pointer-events-none relative z-[100]">
      <header
        className={cn(
          "max-w-[1240px] mx-3 md:mx-6 lg:mx-8 xl:mx-auto transition-all duration-500 pointer-events-auto origin-top mt-3 md:mt-2 rounded-[20px] md:rounded-[3rem]",
          "h-[106px] md:h-[104px]",
          "bg-white backdrop-blur-xl border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.04)]",
          scrolled ? "md:shadow-xl" : "md:shadow-md"
        )}
      >
        <div className="h-full px-5 md:px-10 flex items-center justify-between">
          <Link href="/" prefetch={false} className="hover:opacity-90 transition-opacity flex items-center h-full py-1">
            <BrandLogo height={106} mobileHeight={68} theme="light" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
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
                      "px-5 py-3 font-sans text-[17px] font-semibold transition-all duration-300 relative flex items-center gap-2 text-black"
                    )}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {link.hasDropdown && (
                      <ChevronRight size={14} className={cn("relative z-10 transition-transform duration-300", activeDropdown === link.name && "rotate-90")} />
                    )}

                    {(hoveredPath === link.href || (!hoveredPath && pathname === link.href)) && (
                      <motion.div
                        layoutId="navHighlight"
                        className="absolute bottom-1 left-5 right-5 h-[3px] bg-brand-blue rounded-full z-0"
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
                                <span className="font-heading text-[15px] font-bold text-black/80 group-hover:text-black transition-colors">{item.name}</span>
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
              className="bg-brand-blue text-black px-8 py-3.5 font-sans text-[16px] font-bold uppercase tracking-[0.2em] rounded-xl transition-all hover:bg-black hover:text-white hover:scale-95 active:translate-y-0 whitespace-nowrap shadow-lg"
            >
              Contact Us
            </Link>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "md:hidden w-11 h-11 flex flex-col items-center justify-center gap-[5px] rounded-[14px] transition-all duration-300 active:scale-90 shadow-sm",
              isOpen ? "bg-brand-blue/10 border border-brand-blue/20" : "bg-white border border-gray-200 hover:bg-gray-50"
            )}
            aria-label="Toggle Menu"
          >
            <span className={cn("w-5 h-[2px] rounded-full transition-all duration-300 origin-center", isOpen ? "rotate-45 translate-y-[7px] bg-brand-blue" : "bg-[#111]")} />
            <span className={cn("w-5 h-[2px] rounded-full transition-all duration-300", isOpen ? "opacity-0 translate-x-2" : "bg-[#111] opacity-100")} />
            <span className={cn("w-5 h-[2px] rounded-full transition-all duration-300 origin-center", isOpen ? "-rotate-45 -translate-y-[7px] bg-brand-blue" : "bg-[#111]")} />
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
                <div className="relative px-6 py-8 flex items-center justify-center border-b border-black/5 text-black">
                  <div className="scale-[0.8] sm:scale-90 origin-center">
                    <BrandLogo mobileHeight={70} theme="light" />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-4 w-10 h-10 flex items-center justify-center bg-brand-blue/5 border border-brand-blue/20 rounded-xl text-brand-blue shadow-sm z-10"
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
                          "flex items-center justify-between px-8 py-6 rounded-2xl font-heading text-[22px] font-bold transition-all",
                          pathname === link.href
                            ? "text-brand-blue bg-brand-blue/5 border border-brand-blue/30"
                            : "text-[#111] hover:text-brand-blue hover:bg-brand-blue/[0.04]"
                        )}
                      >
                        {link.name}
                        <ChevronRight size={22} className={cn("opacity-40", pathname === link.href && "opacity-100")} />
                      </Link>
                    </div>
                  ))}
                </nav>

                <div className="mt-auto p-8 pb-12 border-t border-black/5 flex flex-col gap-6">
                  <Link
                    href="/contact"
                    prefetch={false}
                    className="w-full bg-brand-blue text-black py-5 rounded-2xl text-center font-sans text-[16px] font-semibold uppercase tracking-[0.15em] shadow-xl hover:bg-black hover:text-white transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
