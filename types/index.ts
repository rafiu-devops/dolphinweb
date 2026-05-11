export interface Amenity {
  icon: string;
  label: string;
}

export interface UnitSize {
  type: string;
  size: string;
  price: string;
}

export interface PropertyUnit {
  id: string;
  title?: string;
  name?: string; // Adding name as alias for Project compatibility
  location: string;
  price?: string;
  beds?: number;
  baths?: number;
  area?: string;
  image?: string;
  type?: string;
  projectId?: string;
  projectSlug?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  featured: {
    isFeatured: boolean;
    images: string[];
    tagline?: string;
  };
  latestProperties: PropertyUnit[];
  projectCard: {
    images: string[];
    badges: string[];
    shortDescription: string;
  };
  detailsPage: {
    heroImage: string;
    gallery: string[];
    fullDescription: string;
    introduction?: string;
    offerings?: { icon: string; label: string }[];
    amenities: Amenity[];
    unitTypes: UnitSize[];
    heroThumbnails?: string[];
    overviewImage?: string;
    galleryCategories: {
      exterior: string[];
      interior: string[];
      layouts: string[];
    };
    specifications: {
      floors?: string;
      totalUnits?: string;
      totalArea?: string;
      projectType: string;
      completionYear?: string;
    };
    features?: string[];
    investmentBenefits?: string[];
    landmarks?: { icon: string; name: string; distance: string }[];
    mapEmbedUrl: string;
    projectContact?: {
      phone: string;
      email: string;
      whatsapp?: string;
      facebook?: string;
      address?: string;
    };
    progress?: {
      status: string;
      percentage: number;
    };
  };
  status: 'Under Construction' | 'Completed' | 'Upcoming' | 'Launching Soon' | 'New Launch';
  city: string;
  location: string;
}

export interface FAQ {
  category: string;
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  mapEmbedUrl: string;
  officeHours: string;
  social: {
    instagram: string;
    facebook: string;
    linkedin: string;
    whatsapp: string;
    tiktok: string;
    x: string;
  };
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  avatar: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}
