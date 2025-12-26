import { Link, useSearchParams } from "react-router-dom";
import { Building2, Home, Store, MapPin, Landmark } from "lucide-react";

const propertyTypes = [
  { id: "apartment", label: "Квартиры", icon: Building2, count: "2 450" },
  { id: "room", label: "Комнаты", icon: Home, count: "180" },
  { id: "house", label: "Дома", icon: Home, count: "320" },
  { id: "land", label: "Участки", icon: MapPin, count: "95" },
  { id: "commercial", label: "Коммерция", icon: Store, count: "210" },
  { id: "newbuilding", label: "Новостройки", icon: Landmark, count: "85 ЖК" },
];

const QuickTypeSelection = () => {
  const [searchParams] = useSearchParams();
  const activeType = searchParams.get("type");

  return (
    <section className="py-6 md:py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 md:gap-4">
          {propertyTypes.map((type) => {
            const isActive = activeType === type.id;
            
            return (
              <Link
                key={type.id}
                to={`/catalog?type=${type.id}`}
                className={`
                  group flex flex-col items-center p-4 rounded-[16px] 
                  transition-all duration-200 ease-out
                  ${isActive 
                    ? "bg-primary/10 border-2 border-primary/30 shadow-[inset_0_2px_8px_rgba(59,130,246,0.1)]" 
                    : "bg-surface border border-border/50 hover:border-primary/40 hover:bg-primary/5 hover:shadow-md"
                  }
                `}
              >
                <div 
                  className={`
                    w-11 h-11 rounded-full flex items-center justify-center mb-2 
                    transition-all duration-200 ease-out
                    group-hover:scale-110
                    ${isActive 
                      ? "bg-primary/20" 
                      : "bg-primary/8 group-hover:bg-primary/15"
                    }
                  `}
                >
                  <type.icon 
                    className={`
                      w-5 h-5 transition-colors duration-200
                      ${isActive 
                        ? "text-primary" 
                        : "text-primary/70 group-hover:text-primary"
                      }
                    `} 
                  />
                </div>
                <span 
                  className={`
                    text-sm font-medium text-center transition-colors duration-200
                    ${isActive ? "text-primary" : "text-foreground/80 group-hover:text-foreground"}
                  `}
                >
                  {type.label}
                </span>
                <span className="text-xs text-muted-foreground/60 mt-0.5 font-normal">
                  {type.count}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickTypeSelection;
