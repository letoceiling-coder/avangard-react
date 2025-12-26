import { Heart, MapPin, Maximize2, DoorOpen } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites, Property } from "@/hooks/useFavorites";
import { useComparison } from "@/hooks/useComparison";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface ExtendedProperty extends Property {
  buildingName?: string;
  status?: "new" | "secondary" | "verified";
  district?: string;
}

interface PropertyCardProps {
  property: ExtendedProperty;
  variant?: "default" | "compact";
  featured?: boolean;
}

const statusConfig = {
  new: { label: "Новостройка", className: "bg-primary/90 text-white" },
  secondary: { label: "Вторичка", className: "bg-title/80 text-white" },
  verified: { label: "Проверено", className: "bg-emerald-500/90 text-white" },
};

const formatRooms = (rooms: number) => {
  if (rooms === 1) return "Студия";
  return `${rooms}-комн.`;
};

const PropertyCard = ({ property, variant = "default", featured = false }: PropertyCardProps) => {
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isInCompare, addToCompare, removeFromCompare, canAddMore } = useComparison();
  const favorite = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  const pricePerMeter = Math.round(property.price / property.area);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(property.id);
      toast.success("Удалено из избранного");
    } else {
      addToFavorites(property);
      toast.success("Добавлено в избранное");
    }
  };

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(property.id);
      toast.success("Убрано из сравнения");
    } else {
      if (!canAddMore) {
        toast.error("Можно сравнить максимум 3 объекта");
        return;
      }
      addToCompare({
        ...property,
        pricePerMeter,
      });
      toast.success("Добавлено к сравнению");
    }
  };

  const status = property.status || (property.type === "Новостройка" ? "new" : "secondary");
  const statusInfo = statusConfig[status];

  return (
    <Link to={`/property/${property.id}`} className="block group">
      <article 
        className={cn(
          "relative bg-card rounded-[20px] overflow-hidden border transition-all duration-300 ease-out hover:-translate-y-1",
          featured 
            ? "border-primary/30 ring-1 ring-primary/10 shadow-[0_12px_32px_rgba(59,130,246,0.12),0_4px_12px_rgba(10,35,66,0.06)] hover:shadow-[0_24px_56px_rgba(59,130,246,0.16),0_8px_24px_rgba(10,35,66,0.08)]" 
            : "border-border/60 hover:shadow-[0_20px_48px_rgba(10,35,66,0.10),0_8px_20px_rgba(10,35,66,0.06)] hover:border-primary/20"
        )}
        style={!featured ? {
          boxShadow: '0 8px 24px rgba(10, 35, 66, 0.06), 0 2px 8px rgba(10, 35, 66, 0.04)'
        } : undefined}
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-[20px]">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />

          {/* Subtle gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Favorite Button - subtle, smaller */}
          <button
            onClick={toggleFavorite}
            className={cn(
              "absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 z-10",
              favorite 
                ? "bg-white shadow-sm" 
                : "bg-white/70 backdrop-blur-sm hover:bg-white/90"
            )}
            aria-label={favorite ? "Удалить из избранного" : "Добавить в избранное"}
          >
            <Heart
              className={cn(
                "w-3.5 h-3.5 transition-all duration-200",
                favorite 
                  ? "fill-primary text-primary" 
                  : "text-muted-foreground/50"
              )}
            />
          </button>

          {/* Single Badge - Top Left (unified style) */}
          <div className="absolute top-3 left-3">
            <span className={cn(
              "inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium backdrop-blur-sm shadow-sm",
              featured 
                ? "bg-primary text-white" 
                : statusInfo.className
            )}>
              {featured ? "★ Рекомендуем" : statusInfo.label}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price - Primary emphasis */}
          <div className="mb-2.5">
            <p className="text-2xl font-bold text-primary leading-none tracking-tight">
              {property.price.toLocaleString("ru-RU")} <span className="text-lg font-semibold">₽</span>
            </p>
            <p className="text-[10px] text-muted-foreground/50 mt-1">
              {pricePerMeter.toLocaleString("ru-RU")} ₽/м²
            </p>
          </div>

          {/* Specs - compact inline */}
          <div className="flex items-center gap-1.5 text-[11px] text-foreground/60 mb-2">
            <span className="inline-flex items-center gap-1">
              <DoorOpen className="w-2.5 h-2.5 text-primary/50" />
              {formatRooms(property.rooms)}
            </span>
            <span className="text-border">·</span>
            <span className="inline-flex items-center gap-1">
              <Maximize2 className="w-2.5 h-2.5 text-primary/50" />
              {property.area} м²
            </span>
            <span className="text-border">·</span>
            <span>{property.floor} эт.</span>
          </div>

          {/* Address - shortened, single line */}
          <p className="text-[11px] text-muted-foreground/60 truncate">
            <MapPin className="w-2.5 h-2.5 inline mr-1 text-muted-foreground/40" />
            {property.address.split(',')[0]}
            {property.buildingName && <span className="text-muted-foreground/40"> · {property.buildingName}</span>}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default PropertyCard;
