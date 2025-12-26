import { Heart, MapPin, Maximize2, Home, Building2, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useFavorites, Property } from "@/hooks/useFavorites";
import { useComparison } from "@/hooks/useComparison";
import { toast } from "sonner";

interface PropertyCardProps {
  property: Property;
  variant?: "default" | "compact";
}

const PropertyCard = ({ property, variant = "default" }: PropertyCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  const { isInCompare, addToCompare, removeFromCompare, canAddMore } = useComparison();
  const favorite = isFavorite(property.id);
  const inCompare = isInCompare(property.id);

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
        pricePerMeter: Math.round(property.price / property.area),
      });
      toast.success("Добавлено к сравнению");
    }
  };

  return (
    <Link to={`/property/${property.id}`}>
      <article className="lg-card-glow group overflow-hidden">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="w-10 h-10 rounded-full bg-card/90 backdrop-blur-sm shadow-soft hover:bg-card hover:shadow-card transition-all duration-200"
              onClick={toggleFavorite}
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  favorite ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className={`w-10 h-10 rounded-full backdrop-blur-sm shadow-soft transition-all duration-200 ${
                inCompare 
                  ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                  : "bg-card/90 hover:bg-card hover:shadow-card"
              }`}
              onClick={toggleCompare}
            >
              <Scale className={`w-5 h-5 ${inCompare ? "" : "text-muted-foreground"}`} />
            </Button>
          </div>

          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
              property.type === "Новостройка" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card text-foreground"
            }`}>
              {property.type}
            </span>
          </div>

          {/* Price Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-blue/80 to-transparent p-4 pt-12">
            <p className="text-xl font-display font-bold text-white">
              {property.price.toLocaleString("ru-RU")} ₽
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>

          <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
            <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
            <span className="truncate">{property.address}</span>
          </div>

          {/* Parameters */}
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-1.5 text-sm">
              <Home className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">{property.rooms}</span>
              <span className="text-muted-foreground">комн.</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Maximize2 className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">{property.area}</span>
              <span className="text-muted-foreground">м²</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">{property.floor}</span>
              <span className="text-muted-foreground">этаж</span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PropertyCard;
