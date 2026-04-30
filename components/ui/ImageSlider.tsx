"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Crosshair } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
  images: string[];
  videoUrl?: string;
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  aspectRatio?: "video" | "square" | "portrait";
  objectFit?: "cover" | "contain" | "scale-down";
  className?: string;
}

const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

export function ImageSlider({
  images = [],
  videoUrl,
  autoPlay = false,
  interval = 4000,
  showArrows = true,
  showDots = true,
  aspectRatio = "video",
  objectFit = "cover",
  className,
}: ImageSliderProps) {
  const videoId = videoUrl ? getYoutubeId(videoUrl) : null;

  // Defensive check: filter out malformed or local file system paths
  const actualImages = images?.filter(img => 
    img && 
    typeof img === "string" && 
    !img.startsWith("file://") && 
    img.trim() !== ""
  ) || [];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: actualImages?.length > 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi || !autoPlay || actualImages?.length <= 1) return;
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, interval);
    return () => clearInterval(intervalId);
  }, [emblaApi, autoPlay, interval, actualImages?.length]);

  if (!actualImages || actualImages.length === 0) {
    return <div className={cn("bg-foreground/5 animate-pulse", className)} />;
  }

  const aspectClass = {
    video: "aspect-video",
    square: "aspect-square",
    portrait: "aspect-[3/4]",
  }[aspectRatio];

  if (!mounted) return null;

  return (
    <div className={cn("relative group overflow-hidden bg-background gpu-accelerated", className)}>
      {videoId ? (
        <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&enablejsapi=1`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] md:w-[115%] md:h-[115%] min-w-full min-h-full object-cover"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
          <div className="absolute inset-0 bg-black/5" />
        </div>
      ) : (
        <div className="overflow-hidden h-full" ref={emblaRef}>
          <div className="flex h-full">
            {actualImages.map((img, index) => (
              <div key={index} className={cn("flex-[0_0_100%] min-w-0 relative", aspectClass, "h-full bg-black")}>
                {/* Blurred background layer for contain mode */}
                {objectFit === "contain" && (
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                      src={img || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200"}
                      alt="Blur background"
                      fill
                      className="object-cover blur-2xl opacity-50 scale-110"
                      sizes="10px"
                    />
                  </div>
                )}
                
                <div className="relative h-full w-full z-10 flex items-center justify-center">
                  <Image
                    src={img || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200"}
                    alt={`Slide ${index + 1}`}
                    fill
                    className={cn(
                      "transition-all duration-700",
                      objectFit === "cover" ? "object-cover" : "object-contain"
                    )}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                    priority={index === 0}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-transparent pointer-events-none z-20" />
              </div>
            ))}
          </div>
        </div>
      )}

      {showArrows && actualImages.length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between p-4 md:p-6 pointer-events-none z-20">
          <button
            onClick={scrollPrev}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-card/40 backdrop-blur-md border border-border/40 text-foreground rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 hover:bg-brand-blue hover:text-background hover:border-brand-blue transition-all duration-300 pointer-events-auto shadow-2xl"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-card/40 backdrop-blur-md border border-border/40 text-foreground rounded-xl md:rounded-2xl opacity-0 group-hover:opacity-100 hover:bg-brand-blue hover:text-background hover:border-brand-blue transition-all duration-300 pointer-events-auto shadow-2xl"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>
      )}

      {showDots && actualImages.length > 1 && (
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-30">
          {actualImages.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="relative p-1 md:p-2 group/dot"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className={cn(
                "h-1 transition-all duration-500 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]",
                selectedIndex === index ? "w-6 md:w-8 bg-brand-blue shadow-[0_0_15px_rgba(90,161,255,0.5)]" : "w-1.5 md:w-2 bg-muted-foreground/20 group-hover/dot:bg-muted-foreground/40"
              )} />
            </button>
          ))}
        </div>
      )}
      
      {/* Gallery Stats */}
      <div className="absolute top-6 right-6 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
         <div className="flex items-center gap-2 bg-card/40 backdrop-blur-md px-3 py-1 rounded-lg border border-border/40">
            <Crosshair size={10} className="text-brand-blue animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-muted-foreground">Property View {selectedIndex + 1}/{actualImages.length}</span>
         </div>
      </div>
    </div>
  );
}
