"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltProps {
  children: React.ReactNode;
  className?: string;
}

export const Tilt = ({ children, className }: TiltProps) => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY: isMobile ? 0 : rotateY,
        rotateX: isMobile ? 0 : rotateX,
        transformStyle: "preserve-3d",
      }}
      whileHover={isMobile ? {} : { scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={className}
    >
      <div
        style={{
          transform: isMobile ? "none" : "translateZ(20px)",
          transformStyle: "preserve-3d",
        }}
        className="h-full"
      >
        {children}
        
        {/* Soft moving light overlay */}
        {!isMobile && (
          <motion.div 
            className="absolute inset-0 pointer-events-none rounded-[inherit] z-50 overflow-hidden"
            style={{
              background: useTransform(
                [mouseXSpring, mouseYSpring],
                ([xVal, yVal]: any) => `radial-gradient(circle at ${50 + xVal * 100}% ${50 + yVal * 100}%, rgba(90, 161, 255, 0.08) 0%, transparent 80%)`
              )
            }}
          />
        )}
      </div>
    </motion.div>
  );
};
