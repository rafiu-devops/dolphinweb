"use client";

import { motion } from "framer-motion";
import { Search, MapPin, Building2, Banknote, BedDouble } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface AdvancedSearchProps {
  onFilterChange?: (filter: { type: string; area: string; propertyType: string }) => void;
}

export function AdvancedSearch({ onFilterChange }: AdvancedSearchProps) {
  const [activeTab, setActiveTab] = useState("Buy");
  const [area, setArea] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");

  const handleSearch = () => {
    onFilterChange?.({
      type: activeTab,
      area,
      propertyType
    });
  };

  // Auto-filter when tab changes
  useEffect(() => {
    handleSearch();
  }, [activeTab]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="w-full max-w-5xl mx-auto mt-12 px-4"
    >
      <div className="bg-black/40 backdrop-blur-2xl p-2 rounded-3xl border border-white/10 shadow-2xl">
        {/* Type Selector Tabs */}
        <div className="flex gap-2 mb-2 p-1">
          {["Buy", "Rent", "Commercial"].map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className={cn(
                "flex-1 md:flex-none px-6 md:px-10 py-3.5 rounded-2xl text-[11px] md:text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-300",
                activeTab === type 
                  ? "bg-brand-blue text-black shadow-[0_0_20px_rgba(90,161,255,0.3)]" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Search Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 bg-white/5 p-2 rounded-2xl">
          {/* Location */}
          <div className="relative group md:col-span-6">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-blue group-focus-within:scale-110 transition-transform pointer-events-none z-10">
              <MapPin size={18} />
            </div>
            <input 
              type="text" 
              placeholder="AREA / LOCATION" 
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-transparent border-none py-6 pl-14 pr-6 text-white text-[13px] font-bold uppercase tracking-wider focus:ring-0 placeholder:text-white/20"
            />
          </div>

          {/* Project Category & Search Button */}
          <div className="flex gap-2 md:col-span-6">
            <div className="relative group flex-grow border-l border-white/5 min-w-0">
              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-blue pointer-events-none z-10">
                <Building2 size={18} />
              </div>
              <select 
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-transparent border-none py-6 pl-14 pr-8 text-white text-[13px] font-bold uppercase tracking-wider focus:ring-0 appearance-none cursor-pointer truncate"
              >
                <option className="bg-black">All Sectors</option>
                <option className="bg-black">Residential</option>
                <option className="bg-black">Commercial</option>
                <option className="bg-black">Industrial</option>
              </select>
            </div>
            
            <button 
              onClick={handleSearch}
              className="bg-brand-blue hover:bg-white text-black px-6 rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(90,161,255,0.2)] flex items-center justify-center shrink-0"
            >
              <Search size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Filters */}
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {["Luxury Villas", "Investment", "Ready to Move", "Shahra-e-Faisal"].map((tag) => (
          <button 
            key={tag} 
            onClick={() => {
              setArea(tag);
              handleSearch();
            }}
            className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-brand-blue transition-colors flex items-center gap-2"
          >
            <span className="w-1 h-1 rounded-full bg-brand-blue/40" />
            {tag}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
