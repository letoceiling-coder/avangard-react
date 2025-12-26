import { Link } from "react-router-dom";
import { MapPin, Ruler, Home, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import { Button } from "./ui/button";

export interface Building {
  id: string;
  name: string;
  image: string;
  location: string;
  priceFrom: number;
  priceTo: number;
  status: "completed" | "construction" | string;
  area: string;
  rooms: string;
  floors: number;
  highlight?: "popular" | "new" | "discount" | null;
}

interface BuildingCardProps {
  building: Building;
  className?: string;
  index?: number;
}

const getStatusConfig = (status: string) => {
  const lower = status.toLowerCase();
  
  if (lower === "completed" || lower.includes("сдан")) {
    return { 
      label: "Сдан", 
      className: "bg-emerald-500 text-white"
    };
  }
  if (lower === "construction" || lower.includes("строится")) {
    return { 
      label: "Строится", 
      className: "bg-amber-500 text-white"
    };
  }
  // Quarter dates like "I кв. 2025"
  return { 
    label: status, 
    className: "bg-sky-500 text-white"
  };
};

// Get single badge - prioritize promo for differentiation
const getBadge = (status: string, index: number) => {
  // Every 3rd card gets a promo badge instead of status
  if (index % 3 === 0) {
    const promos = [
      { label: "Выгодно", className: "bg-emerald-500 text-white" },
      { label: "Новинка", className: "bg-violet-500 text-white" },
    ];
    return promos[Math.floor(index / 3) % promos.length];
  }
  
  // Otherwise show status badge
  return getStatusConfig(status);
};

const formatPrice = (price: number) => {
  if (price >= 1000000) {
    return `${(price / 1000000).toFixed(1)} млн`;
  }
  return `${(price / 1000).toFixed(0)} тыс`;
};

const BuildingCard = ({ building, className, index = 0 }: BuildingCardProps) => {
  const badge = getBadge(building.status, index);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const isLiked = isFavorite(building.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLiked) {
      removeFromFavorites(building.id);
    } else {
      addToFavorites({
        id: building.id,
        title: building.name,
        image: building.image,
        price: building.priceFrom,
        address: building.location,
        area: 0,
        rooms: 0,
        floor: 0,
        type: "complex",
      });
    }
  };

  return (
    <Link
      to={`/buildings/${building.id}`}
      className={cn("block group", className)}
    >
      <div 
        className="relative bg-card rounded-[24px] overflow-hidden border border-border/40 hover:border-primary/30 hover:shadow-[0_24px_56px_rgba(10,35,66,0.12),0_12px_28px_rgba(10,35,66,0.08)] hover:-translate-y-2 transition-all duration-400 ease-out"
        style={{ boxShadow: '0 8px 32px rgba(10, 35, 66, 0.05), 0 2px 12px rgba(10, 35, 66, 0.03)' }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={building.image}
            alt={building.name}
            className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-700 ease-out"
          />
          
          {/* Soft gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

          {/* Single Badge - unified style */}
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-sm shadow-sm",
                badge.className
              )}
            >
              {badge.label}
            </span>
          </div>

          {/* Favorite Button - subtle, smaller */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/70 backdrop-blur-sm hover:bg-white/90 transition-colors z-10"
            onClick={handleFavoriteClick}
          >
            <Heart
              className={cn(
                "w-3.5 h-3.5 transition-colors",
                isLiked ? "fill-primary text-primary" : "text-muted-foreground/50"
              )}
            />
          </Button>

          {/* Compact specs - subtle, lower position */}
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5">
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full text-[11px] text-white/90">
              <Ruler className="w-2.5 h-2.5 opacity-70" />
              {building.area}
            </span>
            <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-full text-[11px] text-white/90">
              <Home className="w-2.5 h-2.5 opacity-70" />
              {building.rooms}
            </span>
          </div>

          {/* Hover CTA */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-white/95 backdrop-blur-sm text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Смотреть квартиры →
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col">
          {/* Name - primary, emphasized */}
          <h3 className="text-base font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors tracking-tight">
            {building.name}
          </h3>

          {/* Location - secondary, compact inline */}
          <p className="text-[11px] text-muted-foreground/60 mb-2 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
            <span className="truncate">{building.location}</span>
          </p>

          {/* Price - emphasized */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-primary leading-none">
              от {formatPrice(building.priceFrom)} ₽
            </span>
            <span className="text-[10px] text-muted-foreground/40">
              до {formatPrice(building.priceTo)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BuildingCard;
