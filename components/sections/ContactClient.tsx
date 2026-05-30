"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Radio, Loader2, ShieldCheck, CheckCircle2, Building2, Users2, Zap, ArrowRight, MessageCircle, FileText, Headset } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.15 }
};

interface ContactClientProps {
  contact: any;
}

export default function ContactClient({ contact }: ContactClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "General Inquiry",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", inquiryType: "General Inquiry", message: "" });
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-32 pb-32 bg-background overflow-x-hidden">

      {/* Hero Banner */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000"
            className="w-full h-full object-cover grayscale-0"
          />
          <div className="absolute inset-0 bg-black/20 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-[2]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center gap-4 md:gap-8"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-brand-blue/90 backdrop-blur-md text-black shadow-[0_0_30px_rgba(90,161,255,0.2)]">
              <Radio size={12} className="animate-pulse" />
              <span className="text-[10px] md:tactical-label font-black uppercase tracking-widest">Active Communication Channel</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[1] drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-wrap justify-center gap-x-4 md:gap-x-8">
              <span className="text-white">Get in</span>
              <span className="text-brand-blue text-glow-blue">Touch</span>
            </h1>
          </motion.div>
        </div>
      </section>


      {/* NEW CONTACT INTRODUCTION SECTION */}
      <section className="bg-white pt-16 pb-24 relative overflow-hidden -mt-32">
        {/* Subtle blueprint grid pattern / background texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16 space-y-5">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter text-[#0a0f1a]">
              Connect With Our Team
            </h2>
            <div className="w-20 h-1 bg-brand-blue mx-auto rounded-full" />
            <p className="text-[#333] max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-medium">
              We're here to assist with project inquiries, booking information, site visits, and partnership opportunities.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {[
              {
                icon: Building2,
                title: "Project Details",
                desc: "Discover project specifications, amenities, locations, and development highlights."
              },
              {
                icon: FileText,
                title: "Booking Assistance",
                desc: "Receive information about availability, payment plans, and booking procedures."
              },
              {
                icon: MapPin,
                title: "Site Visit Scheduling",
                desc: "Arrange a guided visit to explore our developments and experience the project firsthand."
              },
              {
                icon: Headset,
                title: "Customer Support",
                desc: "Connect with our team for inquiries, updates, and additional assistance."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(90,161,255,0.15)] transition-all duration-300 group relative overflow-hidden flex flex-col h-full border border-gray-100 hover:border-brand-blue/20"
              >
                {/* Top blue accent line on hover */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-brand-blue scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                
                <div className="w-16 h-16 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue mb-8 transition-colors duration-500 group-hover:bg-brand-blue group-hover:text-white shrink-0">
                  <div className="transition-transform duration-500 group-hover:scale-110">
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>
                </div>
                
                <div className="flex-grow space-y-4">
                  <h3 className="text-xl font-bold text-[#0a0f1a] tracking-tight group-hover:text-brand-blue transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-[#4a5568] leading-relaxed text-[15px] font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Form & Map */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Enquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="bg-card/40 border border-border/40 p-10 md:p-16 rounded-[3rem] shadow-2xl space-y-12 relative overflow-hidden backdrop-blur-2xl group"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-blue border-brand-blue/30 group-hover:via-brand-blue transition-all duration-1000" />

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic text-foreground">Send Us a <span className="text-brand-blue">Message</span></h2>
              <p className="tactical-label text-muted-foreground/80 max-w-sm">
                Our expert mission control team is ready to assist with your strategic property requirements. Expect a tactical brief within 24 hours.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-brand-blue/10 text-brand-blue rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(90,161,255,0.2)]">
                    <ShieldCheck size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-black uppercase tracking-tighter italic text-foreground">Message Transmitted</h3>
                    <p className="tactical-label text-muted-foreground/80 leading-relaxed max-w-xs mx-auto">Our tactical team has received your link. We will respond shortly.</p>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[12px] font-black uppercase tracking-[0.3em] text-[#0a0f1a]/70 pl-2">Full Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="ENTER YOUR NAME"
                      className="w-full bg-muted/20 border border-border/60 rounded-2xl px-8 py-6 focus:border-brand-blue/60 outline-none transition-all placeholder:text-[#0a0f1a]/50 font-black text-base uppercase tracking-wider italic focus:bg-brand-blue/[0.04] text-[#0a0f1a]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[12px] font-black uppercase tracking-[0.3em] text-[#0a0f1a]/70 pl-2">Phone Number</label>
                      <input
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 --- -------"
                        className="w-full bg-muted/20 border border-border/60 rounded-2xl px-8 py-6 focus:border-brand-blue/60 outline-none transition-all placeholder:text-[#0a0f1a]/50 font-black text-base uppercase tracking-wider italic focus:bg-brand-blue/[0.04] text-[#0a0f1a]"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[12px] font-black uppercase tracking-[0.3em] text-[#0a0f1a]/70 pl-2">Contact Type</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-muted/20 border border-border/60 rounded-2xl px-8 py-6 focus:border-brand-blue/60 outline-none transition-all font-black text-base uppercase tracking-wider italic focus:bg-brand-blue/[0.04] text-[#0a0f1a] appearance-none cursor-pointer"
                      >
                        <option value="Buy Property">Buy Property</option>
                        <option value="Investment">Investment</option>
                        <option value="Project Details">Project Details</option>
                        <option value="General Contact">General Contact</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[12px] font-black uppercase tracking-[0.3em] text-[#0a0f1a]/70 pl-2">Email Address</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="EXAMPLE@GMAIL.COM"
                      className="w-full bg-muted/20 border border-border/60 rounded-2xl px-8 py-6 focus:border-brand-blue/60 outline-none transition-all placeholder:text-[#0a0f1a]/50 font-black text-base uppercase tracking-wider italic focus:bg-brand-blue/[0.04] text-[#0a0f1a]"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[12px] font-black uppercase tracking-[0.3em] text-[#0a0f1a]/70 pl-2">Message Details</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can we help you today?"
                      className="w-full bg-muted/20 border border-border/60 rounded-2xl px-8 py-6 focus:border-brand-blue/60 outline-none transition-all resize-none placeholder:text-[#0a0f1a]/50 font-black text-base uppercase tracking-wider italic focus:bg-brand-blue/[0.04] text-[#0a0f1a]"
                    />
                  </div>
                  <motion.button
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full btn-brand py-6 text-[15px] font-black uppercase tracking-[0.25em] shadow-[0_0_40px_rgba(90,161,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} /> Transmitting...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={18} className="ml-3" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </AnimatePresence>

            <div className="pt-10 border-t border-border/20">
              <Link
                href={contact.social.whatsapp}
                target="_blank"
                className="flex items-center gap-4 text-[#25D366] hover:text-[#25D366]/80 transition-colors group"
              >
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
                <span className="tactical-label">Need quick response? Chat with us on WhatsApp</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 h-full"
          >
            <div className="rounded-[3.5rem] overflow-hidden border border-white/10 shadow-3xl flex-grow relative group min-h-[400px]">
              <div className="absolute inset-0 bg-brand-blue/5 pointer-events-none z-10 opacity-40 group-hover:opacity-0 transition-all duration-1000" />
              {contact.mapEmbedUrl && contact.mapEmbedUrl.trim() !== "" ? (
                <iframe
                  src={contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(185deg) brightness(85%) contrast(120%)' }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-card/40 backdrop-blur-md text-muted-foreground p-10 text-center">
                  <MapPin size={48} className="mb-4 opacity-20" />
                  <p className="tactical-label">Operations Center Location Data Offline</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-card border border-border/40 rounded-[2.5rem] space-y-2">
                <h4 className="tactical-label text-brand-blue whitespace-nowrap text-[12px] md:text-[15px] tracking-[0.15em]">Location Context</h4>
                <p className="text-[14px] font-black uppercase tracking-tight italic text-foreground leading-tight">Located on Race Course Road, Sukkur</p>

              </div>
              <div className="p-8 bg-card border border-border/40 rounded-[2.5rem] flex items-center gap-6">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="tactical-label whitespace-nowrap text-[12px] md:text-[15px] tracking-[0.15em]">Office Hours</h4>
                  <p className="text-[14px] font-black uppercase tracking-tight italic text-foreground">{contact.officeHours}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Step 3: FINAL CTA SECTION */}
      <section className="container mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-brand-blue rounded-[3rem] p-12 md:p-20 shadow-[0_0_60px_rgba(90,161,255,0.2)] overflow-hidden relative group"
        >
          {/* Decorative Glows */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2 group-hover:scale-150 transition-transform duration-1000" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tighter italic text-white leading-tight">
                Ready to Invest in <br />
                <span className="text-black/40">Your Property?</span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href={`tel:${contact.phone}`}
                className="px-8 md:px-10 py-5 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[11px] md:text-[12px] flex items-center justify-center gap-3 hover:bg-black/80 transition-all shadow-2xl whitespace-nowrap"
              >
                <Phone size={18} /> Call Now
              </Link>
              <button
                onClick={() => {
                  const form = document.querySelector('form');
                  form?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 md:px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[11px] md:text-[12px] flex items-center justify-center gap-3 hover:bg-white/80 transition-all shadow-2xl whitespace-nowrap"
              >
                <Send size={18} /> Contact Us
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
