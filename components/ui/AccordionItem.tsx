"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

export function AccordionItem({ question, answer, index, isOpen, onToggle }: AccordionItemProps) {
  const displayIndex = index.toString().padStart(2, "0");

  return (
    <div className={cn(
      "border border-border/40 rounded-2xl overflow-hidden transition-all duration-500",
      isOpen ? "bg-card border-brand-blue/30 shadow-[0_0_30px_rgba(90,161,255,0.05)]" : "bg-background hover:bg-muted/5 hover:border-border/60"
    )}>
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left transition-colors relative group"
      >
        <div className="flex items-center gap-4 relative z-10">
          <div className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center border font-black text-[11px] transition-all duration-500",
            isOpen ? "bg-brand-blue border-brand-blue text-black shadow-[0_0_15px_rgba(90,161,255,0.4)]" : "bg-muted/10 border-border/40 text-muted-foreground"
          )}>
            {isOpen ? <ShieldAlert size={16} /> : displayIndex}
          </div>
          <span className={cn(
            "text-base md:text-xl font-black uppercase tracking-tight italic transition-colors duration-500",
            isOpen ? "text-foreground" : "text-muted-foreground"
          )}>
            {question}
          </span>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          className={cn("relative z-10", isOpen ? "text-brand-blue" : "text-muted-foreground/30")}
        >
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </motion.div>

        {/* Hover Background */}
        <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/[0.02] transition-colors" />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="px-19 pb-8 pr-8">
              <div className="h-[1px] bg-gradient-to-r from-brand-blue/30 to-transparent mb-6" />
              <p className="text-muted-foreground leading-relaxed font-medium text-sm md:text-base max-w-2xl">
                {answer}
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
                <span className="tactical-label text-brand-blue/50">Dolphin Builders Support</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
