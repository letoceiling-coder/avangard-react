import { Heart, MapPin, Maximize2, DoorOpen, Building2 } from "lucide-react";
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
  const { isFavorite, toggleFavorite: toggleFavoriteHook } = useFavorites();
  const { isInCompare, addToCompare, removeFromCompare, canAddMore } = useComparison();
  const favorite = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

  const pricePerMeter = Math.round(property.price / property.area);

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    await toggleFavoriteHook(property.id, property);
    toast.success(favorite ? "Удалено из избранного" : "Добавлено в избранное");
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
    <Link to={`/property/${property.id}`} className="block group h-full">
      <article 
        className={cn(
          "relative bg-white rounded-lg overflow-hidden border transition-all duration-300 ease-out hover:-translate-y-1 h-full flex flex-col",
          featured 
            ? "border-primary/30 ring-1 ring-primary/10 shadow-lg hover:shadow-xl" 
            : "border-border/50 shadow-md hover:shadow-lg"
        )}
      >
        {/* Photo - 4:3 aspect ratio */}
        <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />

          {/* Favorite Button ❤️ */}
          <button
            onClick={handleToggleFavorite}
            className={cn(
              "absolute top-2.5 right-2.5 min-h-[44px] min-w-[44px] w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 z-10",
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

          {/* Status Badge */}
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
        <div className="p-4 flex-1 flex flex-col">
          {/* Price - жирным text-xl */}
          <div className="mb-3">
            <p className="text-xl font-bold text-primary leading-none">
              {property.price.toLocaleString("ru-RU")} ₽
            </p>
          </div>

          {/* Parameters - иконками в строку */}
          <div className="flex items-center gap-3 text-sm text-foreground/70 mb-3">
            <span className="inline-flex items-center gap-1.5">
              <DoorOpen className="w-4 h-4 text-primary/60" />
              {formatRooms(property.rooms)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-primary/60" />
              {property.area} м²
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-primary/60" />
              {property.floor} эт.
            </span>
          </div>

          {/* Address - одной строкой */}
          <p className="text-sm text-muted-foreground/70 truncate mb-4">
            <MapPin className="w-3.5 h-3.5 inline mr-1.5 text-muted-foreground/50" />
            {property.address}
            {property.buildingName && <span className="text-muted-foreground/50"> · {property.buildingName}</span>}
          </p>

          {/* CTA - "Оставить заявку" кнопка с bg-primary и rounded-xl внизу */}
          <div className="mt-auto">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/property/${property.id}`);
              }}
              className="w-full min-h-[44px] py-3 px-4 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Оставить заявку на объект"
            >
              Оставить заявку
            </button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PropertyCard;
