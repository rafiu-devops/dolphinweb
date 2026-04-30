"use client";

import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";

interface FloatingContactProps {
  whatsapp: string;
  phone?: string;
}

export function FloatingContact({ whatsapp }: FloatingContactProps) {
  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100]">
      <motion.a
        href={whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.4)] relative group"
      >
        <FaWhatsapp className="w-6 h-6 md:w-8 md:h-8" />
        
        {/* Ripple Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest opacity-0 md:group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
