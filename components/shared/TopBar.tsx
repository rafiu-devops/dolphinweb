"use client";

import React from "react";
import { MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTiktok } from "react-icons/fa6";
import { motion } from "framer-motion";

interface TopBarProps {
  phone: string;
  email: string;
  address: string;
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    tiktok: string;
  };
}

export function TopBar({ phone, email, address, social }: TopBarProps) {
  return (
    <div className="bg-brand-blue text-black py-4 border-b border-black/5 hidden md:block w-full">
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        
        {/* Left: Address */}
        <div className="flex-1 flex justify-start">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all">
              <MapPin size={18} />
            </div>
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-black group-hover:text-black/70 transition-colors">
              {address}
            </span>
          </div>
        </div>

        {/* Center: Phone */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all">
              <Phone size={19} />
            </div>
            <a href={`tel:${phone.replace(/[^\d+]/g, '')}`} className="text-[12px] font-black uppercase tracking-[0.12em] text-black group-hover:text-black/70 transition-colors">
              {phone}
            </a>
          </div>
        </div>

        {/* Right: Socials & Status */}
        <div className="flex-1 flex items-center justify-end gap-6">
          <div className="flex items-center gap-3 border-r border-black/10 pr-6">
            {[
              { icon: FaFacebookF, href: social.facebook, brand: "#1877F2" },
              { 
                icon: FaInstagram, 
                href: social.instagram, 
                brand: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)" 
              },
              { icon: FaLinkedinIn, href: social.linkedin, brand: "#0077B5" },
              { icon: FaTiktok, href: social.tiktok, brand: "#010101" },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                className="relative w-8 h-8 rounded-lg flex items-center justify-center text-white overflow-hidden group shadow-lg"
              >
                <div 
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110" 
                  style={{ background: social.brand }} 
                />
                <social.icon size={14} className="relative z-10 transition-transform duration-300 group-hover:scale-125" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
