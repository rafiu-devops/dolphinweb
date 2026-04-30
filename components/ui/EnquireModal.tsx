"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, ShieldCheck, Target, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName?: string;
}

export function EnquireModal({ isOpen, onClose, projectName }: EnquireModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, projectName }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => {
          setIsSuccess(false);
          onClose();
        }, 3000);
      } else {
        alert("Failed to send inquiry. Please check your connection.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-xl"
          />
          
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40, rotateX: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40, rotateX: 15 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="relative w-full max-w-xl glass-premium border border-border/40 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Tactical Scanner Line Animation */}
            <motion.div 
               initial={{ top: "-100%" }}
               animate={{ top: "100%" }}
               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               className="absolute left-0 w-full h-24 bg-gradient-to-b from-transparent via-brand-blue/5 to-transparent z-0 pointer-events-none"
            />

            <div className="p-10 md:p-14 relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="space-y-1">
                   <div className="flex items-center gap-2 text-brand-blue/60 mb-2">
                       <Target size={14} className="animate-pulse" />
                       <span className="tactical-label">Official Enquiry</span>
                   </div>
                   <h3 className="text-3xl md:text-4xl font-black text-foreground uppercase tracking-tighter italic leading-none">
                      Establish <span className="text-brand-blue text-glow-blue underline decoration-brand-blue/20 underline-offset-4">Link</span>
                   </h3>
                </div>
                <button 
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center bg-muted/10 hover:bg-muted/20 rounded-2xl transition-all text-muted-foreground hover:text-brand-blue group"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="py-16 text-center space-y-8"
                  >
                    <div className="w-24 h-24 bg-brand-blue/10 text-brand-blue rounded-[2rem] flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(90,161,255,0.2)] relative overflow-hidden group">
                       <div className="absolute inset-0 bg-brand-blue/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                       <ShieldCheck size={48} className="relative z-10" />
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-3xl font-black uppercase tracking-tighter italic text-foreground">Message Sent</h4>
                      <p className="tactical-label text-muted-foreground/80 leading-relaxed max-w-xs mx-auto">
                        Your enquiry has been received. Our team will contact you shortly.
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {projectName && (
                      <div className="space-y-3 pb-4 border-b border-border/50">
                        <label className="tactical-label text-brand-blue/60">Interest Area</label>
                        <div className="flex items-center gap-4 bg-brand-blue/[0.03] border border-brand-blue/20 rounded-2xl px-6 py-4">
                           <Zap size={14} className="text-brand-blue" />
                           <span className="font-black text-sm text-brand-blue uppercase tracking-widest italic">{projectName}</span>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="tactical-label text-muted-foreground/80 pl-2">Full Name</label>
                        <input 
                          required
                          type="text" 
                          placeholder="Your Name" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-card/40 border border-border rounded-2xl px-6 py-5 text-sm font-black uppercase tracking-wider italic text-foreground placeholder:text-muted-foreground/30 focus:border-brand-blue/40 outline-none transition-all focus:bg-brand-blue/[0.02]"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="tactical-label text-muted-foreground/80 pl-2">Phone Number</label>
                        <input 
                          required
                          type="tel" 
                          placeholder="+XX --- --- ----" 
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-card/40 border border-border rounded-2xl px-6 py-5 text-sm font-black uppercase tracking-wider italic text-foreground placeholder:text-muted-foreground/30 focus:border-brand-blue/40 outline-none transition-all focus:bg-brand-blue/[0.02]"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="tactical-label text-muted-foreground/80 pl-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        placeholder="email@example.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-card/40 border border-border rounded-2xl px-6 py-5 text-sm font-black uppercase tracking-wider italic text-foreground placeholder:text-muted-foreground/30 focus:border-brand-blue/40 outline-none transition-all focus:bg-brand-blue/[0.02]"
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="tactical-label text-muted-foreground/80 pl-2">Message Details</label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="How can we help you?" 
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-card/40 border border-border rounded-2xl px-6 py-5 text-sm font-black uppercase tracking-wider italic text-foreground placeholder:text-muted-foreground/30 focus:border-brand-blue/40 outline-none transition-all resize-none focus:bg-brand-blue/[0.02]"
                      />
                    </div>

                    <motion.button 
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className="w-full btn-brand py-6 text-[13px] font-black uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(90,161,255,0.2)] flex items-center justify-center gap-3 group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={18} /> Submitting...
                        </>
                      ) : (
                        <>
                          Send Enquiry <Send size={16} className="group-hover:translate-x-2 transition-transform" />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
