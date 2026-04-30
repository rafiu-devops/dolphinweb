"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface StickyHeaderProps {
  children: React.ReactNode;
}

export function StickyHeader({ children }: StickyHeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    let ticking = false;

    const updateVisibility = () => {
      const currentScrollY = window.scrollY;
      const isHome = pathname === "/";
      const isMobile = window.innerWidth < 768;
      
      if (isHome && !isMobile) {
        setIsVisible(currentScrollY >= 120);
      } else {
        setIsVisible(true);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -200, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 30,
              opacity: { duration: 0.2 }
            }}
            className="pointer-events-auto w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 
        Optional: Sub-optimal but maybe helpful - 
        If we want it to be "partially" visible or transparent at top instead of hidden?
        The user specifically said "remain hide".
      */}
    </div>
  );
}
