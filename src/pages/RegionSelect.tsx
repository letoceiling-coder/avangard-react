import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

const regions = [
  {
    id: "belgorod",
    name: "Белгород",
    description: "Белгородская область",
    image: "https://images.unsplash.com/photo-1486299267070-83823f5448dd?w=800&h=600&fit=crop",
  },
  {
    id: "krasnodar",
    name: "Краснодарский край",
    description: "Краснодар, Сочи, Анапа",
    image: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=800&h=600&fit=crop",
  },
  {
    id: "rostov",
    name: "Ростовская область",
    description: "Ростов-на-Дону, Таганрог",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
  },
];

const RegionSelect = () => {
  const navigate = useNavigate();

  const handleRegionSelect = (regionId: string) => {
    localStorage.setItem("selectedRegion", regionId);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-4 gold-gradient bg-clip-text text-transparent">
            AVANGAR31
          </h1>
          <p className="text-xl text-muted-foreground">
            Выберите регион для поиска недвижимости
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {regions.map((region, index) => (
            <button
              key={region.id}
              onClick={() => handleRegionSelect(region.id)}
              className="glass-card hover-lift p-0 overflow-hidden group text-left border-2 border-transparent hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={region.image}
                  alt={region.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              </div>
              
              <div className="p-6 -mt-24 relative">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full glass-card">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm text-muted-foreground">{region.description}</span>
                </div>
                <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-primary transition-colors">
                  {region.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionSelect;
