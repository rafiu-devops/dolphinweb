"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

import { Aperture, Share2, User, Globe } from "lucide-react";

const socialLinks = [
  { icon: Aperture, href: "#" },
  { icon: Share2, href: "#" },
  { icon: User, href: "#" },
  { icon: Globe, href: "#" },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social, i) => (
        <motion.a 
          key={i} 
          href={social.href} 
          whileHover={{ y: -5, color: "#5aa1ff" }}
          className="w-10 h-10 bg-muted/10 border border-border/40 rounded-lg flex items-center justify-center text-muted-foreground transition-all hover:border-brand-blue/30 hover:shadow-[0_0_15px_rgba(90,161,255,0.1)]"
        >
          <social.icon size={18} />
        </motion.a>
      ))}
    </div>
  );
}
