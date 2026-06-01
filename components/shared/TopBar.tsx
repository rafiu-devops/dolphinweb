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
    <div className="hidden md:block w-full pt-2 pointer-events-none">
      <div className="max-w-[1240px] mx-4 md:mx-6 lg:mx-8 xl:mx-auto bg-brand-blue/80 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2rem] border border-white/15 shadow-xl pointer-events-auto py-3 md:py-3.5">
        <div className="px-6 md:px-10 flex items-center justify-between">
          {/* Left: Address */}
          <div className="flex-1 flex justify-start">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all">
                <MapPin size={16} />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-black group-hover:text-black/70 transition-colors">
                {address}
              </span>
            </div>
          </div>

          {/* Right: FB & Phone aligned together */}
          <div className="flex items-center gap-6 justify-end flex-1">
            {/* Facebook Icon */}
            {[
              { icon: FaFacebookF, href: social.facebook, brand: "#1877F2" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                className="relative w-9 h-9 rounded-xl flex items-center justify-center text-white overflow-hidden group shadow-md"
              >
                <div
                  className="absolute inset-0 transition-transform duration-500 group-hover:scale-110"
                  style={{ background: social.brand }}
                />
                <social.icon size={15} className="relative z-10 transition-transform duration-300 group-hover:scale-125" />
              </a>
            ))}

            {/* Phone Number */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-9 h-9 rounded-xl bg-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-white transition-all">
                <Phone size={17} />
              </div>
              <a href="tel:03702502769" className="text-[13px] font-black uppercase tracking-[0.1em] text-black group-hover:text-black/70 transition-colors">
                0370 2502769
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
