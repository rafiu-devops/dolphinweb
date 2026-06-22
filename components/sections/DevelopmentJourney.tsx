"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const phases = [
  {
    number: "01",
    tag: "Strategic Acquisition",
    title: "Land Planning",
    description: "We identify and acquire prime locations with high growth potential. Our team conducts rigorous surveys and legal vetting to ensure a solid foundation for future developments."
  },
  {
    number: "02",
    tag: "Conceptual Intelligence",
    title: "Design & Architecture",
    description: "Collaborating with world-class architects to design modern, sustainable, and functional spaces. Every blueprint is engineered for aesthetic excellence and urban efficiency."
  },
  {
    number: "03",
    tag: "Ground Engineering",
    title: "Infrastructure Development",
    description: "Deploying high-fidelity infrastructure including roads, sewage systems, and utilities. We establish the essential framework that transforms raw land into a premium sector."
  },
  {
    number: "04",
    tag: "Precision Engineering",
    title: "Construction Execution",
    description: "Our construction teams execute the vision with surgical precision, using top-tier materials and modern techniques to ensure structural integrity and premium finishes."
  },
  {
    number: "05",
    tag: "Sector Optimization",
    title: "Sectors & Allocation",
    description: "Strategic zoning and allocation of commercial hubs and residential sanctuaries. We create a balanced ecosystem designed for both business growth and elite living."
  },
  {
    number: "06",
    tag: "Handover Success",
    title: "Completion & Delivery",
    description: "Final audits, quality checks, and legal handovers. We deliver ready-to-deploy assets that redefine urban living and offer significant long-term value."
  }
];

export function DevelopmentJourney() {
  const [activePhase, setActivePhase] = useState("01");

  // Radius for the circle
  const radius = 220;
  
  // Create nodes with x, y coordinates
  const nodes = phases.map((phase, i) => {
    // start from top (01) and go clockwise
    const angleDeg = (i * 60 - 90);
    const angleRad = angleDeg * (Math.PI / 180);
    const x = Math.cos(angleRad) * radius;
    const y = Math.sin(angleRad) * radius;
    return { ...phase, x, y, angleDeg };
  });

  const activeNode = nodes.find(n => n.number === activePhase) || nodes[0];

  const getPopupPosition = (angleDeg: number) => {
    const angle = (angleDeg + 360) % 360;

    if (angle >= 315 || angle < 45) {
      // Node is on RIGHT -> popup goes LEFT
      return { top: '50%', right: '55%', left: 'auto', bottom: 'auto', transform: 'translateY(-50%)', transformOrigin: 'right center' };
    } else if (angle >= 45 && angle < 135) {
      // Node is at BOTTOM -> popup goes ABOVE center
      return { top: 'auto', bottom: '55%', left: '50%', right: 'auto', transform: 'translateX(-50%)', transformOrigin: 'bottom center' };
    } else if (angle >= 135 && angle < 225) {
      // Node is on LEFT -> popup goes RIGHT
      return { top: '50%', left: '55%', right: 'auto', bottom: 'auto', transform: 'translateY(-50%)', transformOrigin: 'left center' };
    } else {
      // Node is at TOP -> popup goes BELOW center
      return { top: '55%', bottom: 'auto', left: '50%', right: 'auto', transform: 'translateX(-50%)', transformOrigin: 'top center' };
    }
  };

  return (
    <section className="relative bg-white overflow-hidden border-y border-border/40 py-24 md:py-32">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-heading text-4xl md:text-[64px] font-bold uppercase tracking-widest text-black leading-none flex flex-wrap justify-center gap-x-6 md:gap-x-8">
            <span>Development</span>
            <span className="text-brand-blue underline decoration-brand-blue/20 underline-offset-[15px]">Journey</span>
          </h2>
          <p className="font-heading text-[16px] md:text-[20px] text-brand-blue/80 mt-8 uppercase tracking-[0.4em]">Strategic Project Lifecycle</p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex relative justify-center items-center h-[600px] w-full max-w-5xl mx-auto">
          {/* SVG Connectors */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} viewBox="-300 -300 600 600">
            <circle cx="0" cy="0" r={radius} fill="none" stroke="currentColor" className="text-brand-blue/20" strokeWidth="2" strokeDasharray="6 6" />
          </svg>

          {/* Center Text */}
          <div className="absolute text-center z-0 flex flex-col items-center justify-center opacity-5 pointer-events-none">
            <h3 className="font-heading text-6xl font-black uppercase text-brand-blue leading-none tracking-widest text-center" style={{ maxWidth: '300px' }}>
              DEVELOPMENT JOURNEY
            </h3>
          </div>

          {/* Nodes */}
          {nodes.map((node) => {
            const isActive = activePhase === node.number;
            return (
              <button
                key={node.number}
                onClick={() => setActivePhase(node.number)}
                className={cn(
                  "absolute flex items-center justify-center w-[72px] h-[72px] rounded-full border-2 transition-all duration-300 z-20 shadow-lg font-heading text-2xl font-bold uppercase tracking-widest",
                  isActive 
                    ? "bg-brand-blue border-brand-blue text-white scale-110 shadow-[0_0_30px_rgba(90,161,255,0.4)]" 
                    : "bg-white border-brand-blue/30 text-brand-blue hover:border-brand-blue hover:scale-105"
                )}
                style={{
                  transform: `translate(calc(-50% + ${node.x}px), calc(-50% + ${node.y}px)) scale(${isActive ? 1.1 : 1})`,
                  left: '50%',
                  top: '50%'
                }}
              >
                {node.number}
              </button>
            );
          })}

          {/* Popup Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeNode.number}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute z-[50] bg-white p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-brand-blue/10 w-[300px] pointer-events-auto"
              style={{
                ...getPopupPosition(activeNode.angleDeg),
              }}
            >
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue text-[11px] font-bold uppercase tracking-[0.2em] mb-4">
                <span className="w-2 h-2 rounded-full bg-brand-blue animate-pulse" />
                PHASE {activeNode.number}: {activeNode.tag}
              </div>
              <h3 className="font-heading text-3xl font-bold uppercase tracking-tight text-black leading-tight mb-4">
                {activeNode.title}
              </h3>
              <p className="text-[15px] text-[#374151] leading-relaxed font-medium">
                {activeNode.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4 relative max-w-md mx-auto mt-10">
          <div className="absolute left-[35px] top-0 bottom-0 w-[2px] bg-brand-blue/10" />
          {phases.map((phase) => {
            const isActive = activePhase === phase.number;
            return (
              <div key={phase.number} className="relative z-10">
                <button
                  onClick={() => setActivePhase(phase.number)}
                  className="flex items-center w-full gap-6 p-2 text-left"
                >
                  <div className={cn(
                    "w-[54px] h-[54px] shrink-0 rounded-full flex items-center justify-center font-heading text-xl font-bold border-2 transition-all duration-300 shadow-md",
                    isActive
                      ? "bg-brand-blue border-brand-blue text-white scale-110 shadow-[0_0_20px_rgba(90,161,255,0.4)]"
                      : "bg-white border-brand-blue/30 text-brand-blue hover:border-brand-blue"
                  )}>
                    {phase.number}
                  </div>
                  <div className="flex-1">
                    <span className="block text-[10px] font-bold text-brand-blue uppercase tracking-[0.2em] mb-1">
                      Phase {phase.number}
                    </span>
                    <h3 className={cn(
                      "font-heading text-xl font-bold uppercase tracking-tight transition-colors duration-300",
                      isActive ? "text-brand-blue" : "text-black"
                    )}>
                      {phase.title}
                    </h3>
                  </div>
                  <ChevronDown className={cn(
                    "text-brand-blue transition-transform duration-300",
                    isActive ? "rotate-180" : ""
                  )} />
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-[86px] pr-4 pb-6 pt-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-bold uppercase tracking-[0.15em] mb-3">
                          {phase.tag}
                        </div>
                        <p className="text-[14px] text-[#374151] leading-relaxed font-medium">
                          {phase.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
