"use client";

import React from "react";
import { MapPin, BedDouble, Bath, Square, ArrowRight } from "lucide-react";
import { PropertyUnit, Project } from "@/types";
import Link from "next/link";

interface PropertyListingCardProps {
  property: PropertyUnit | Project;
}

export function PropertyListingCard({ property }: PropertyListingCardProps) {
  // Defensive mapping between Project and PropertyUnit
  const title = 'title' in property ? property.title : property.name;
  const image = 'image' in property && property.image ? property.image : ('projectCard' in property ? property.projectCard.images[0] : '/assets/projects/placeholder.png');
  const price = 'price' in property ? property.price : "Contact for Price";
  const beds = 'beds' in property ? property.beds : 0;
  const baths = 'baths' in property ? property.baths : 0;
  const area = 'area' in property ? property.area : "N/A";
  const type = 'type' in property ? property.type : ('status' in property ? property.status : "Property");
  const slug = 'projectSlug' in property ? property.projectSlug : ('slug' in property ? property.slug : "");

  return (
    <div className="group relative glass-card-premium overflow-hidden rounded-[2.5rem] border border-border/40 hover:border-brand-blue/30 transition-all duration-500">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title || "Property"}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-brand-blue/90 backdrop-blur-md text-black tactical-label shadow-xl">
          {type}
        </div>
      </div>

      <div className="p-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin size={14} className="text-brand-blue" />
            <span className="text-[12px] font-bold text-foreground">{property.location}</span>
          </div>
          <h3 className="text-xl font-black uppercase italic tracking-tighter text-foreground group-hover:text-brand-blue transition-colors">
            {title}
          </h3>
        </div>

        <div className="flex items-center justify-between py-4 border-y border-border/20">
          <span className="tactical-label text-brand-blue">{price}</span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col gap-2 p-3 rounded-2xl bg-muted/10 border border-border/40">
            <BedDouble size={14} className="text-brand-blue" />
            <span className="text-[10px] font-black">{beds} BEDS</span>
          </div>
          <div className="flex flex-col gap-2 p-3 rounded-2xl bg-muted/10 border border-border/40">
            <Bath size={14} className="text-brand-blue" />
            <span className="text-[10px] font-black">{baths} BATHS</span>
          </div>
          <div className="flex flex-col gap-2 p-3 rounded-2xl bg-muted/10 border border-border/40">
            <Square size={14} className="text-brand-blue" />
            <span className="text-[10px] font-black">{area}</span>
          </div>
        </div>

        <Link
          href={slug ? `/projects/${slug}` : "#"}
          className="flex items-center justify-between w-full p-4 rounded-2xl bg-brand-blue text-black tactical-label hover:bg-black hover:text-white transition-all shadow-glow-sm"
        >
          View Assets <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
