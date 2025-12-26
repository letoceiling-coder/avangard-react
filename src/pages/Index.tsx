import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Search, Building2, TrendingUp, MapPin, ArrowRight, Map, 
  Home, Briefcase, ChevronLeft, ChevronRight, Key, Sparkles
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";

const mockProperties = [
  {
    id: "1",
    title: "3-комнатная квартира в ЖК «Белый город»",
    price: 6500000,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    area: 85,
    rooms: 3,
    floor: 12,
    address: "ул. Победы, 89",
    type: "Новостройка" as const,
  },
  {
    id: "2",
    title: "2-комнатная квартира с видом на парк",
    price: 4800000,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    area: 62,
    rooms: 2,
    floor: 8,
    address: "пр. Славы, 45",
    type: "Вторичка" as const,
  },
  {
    id: "3",
    title: "Пентхаус в элитном ЖК «Империал»",
    price: 15000000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
    area: 145,
    rooms: 4,
    floor: 25,
    address: "ул. Щорса, 2",
    type: "Новостройка" as const,
  },
  {
    id: "4",
    title: "Студия в новом ЖК",
    price: 2800000,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    area: 28,
    rooms: 1,
    floor: 5,
    address: "ул. Белгородская, 12",
    type: "Новостройка" as const,
  },
];

const popularComplexes = [
  {
    id: "1",
    name: "ЖК «Белый город»",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    minPrice: 2800000,
    apartments: 156,
    readiness: "Сдан",
    address: "ул. Победы, 89",
  },
  {
    id: "2",
    name: "ЖК «Империал»",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    minPrice: 5200000,
    apartments: 89,
    readiness: "III кв. 2025",
    address: "ул. Щорса, 2",
  },
  {
    id: "3",
    name: "ЖК «Современник»",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&h=600&fit=crop",
    minPrice: 3400000,
    apartments: 234,
    readiness: "Сдан",
    address: "пр. Славы, 45",
  },
  {
    id: "4",
    name: "ЖК «Новая высота»",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=600&fit=crop",
    minPrice: 4100000,
    apartments: 178,
    readiness: "II кв. 2025",
    address: "ул. Губкина, 17",
  },
  {
    id: "5",
    name: "ЖК «Парковый»",
    image: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800&h=600&fit=crop",
    minPrice: 3900000,
    apartments: 112,
    readiness: "Сдан",
    address: "ул. Садовая, 23",
  },
];

type SearchTab = "buy" | "rent" | "daily";
type FilterType = "all" | "new" | "secondary" | "house" | "commercial";

const searchTabs: { id: SearchTab; label: string }[] = [
  { id: "buy", label: "Купить" },
  { id: "rent", label: "Снять" },
  { id: "daily", label: "Посуточно" },
];

const quickFilters: { id: FilterType; label: string; icon: React.ElementType }[] = [
  { id: "new", label: "Новостройки", icon: Sparkles },
  { id: "secondary", label: "Вторичка", icon: Key },
  { id: "house", label: "Дома", icon: Home },
  { id: "commercial", label: "Коммерция", icon: Briefcase },
  { id: "all", label: "На карте", icon: Map },
];

const roomFilters = ["Студия", "1", "2", "3", "4+"];

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SearchTab>("buy");
  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedRegion = localStorage.getItem("selectedRegion");
    if (!selectedRegion) {
      navigate("/region-select");
    }
  }, [navigate]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (activeFilter) params.set("type", activeFilter);
    if (selectedRooms.length) params.set("rooms", selectedRooms.join(","));
    navigate(`/catalog?${params.toString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  const toggleRoom = (room: string) => {
    setSelectedRooms(prev => 
      prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]
    );
  };

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 320;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="pt-8 pb-12 md:pt-12 md:pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold text-dark-blue mb-4 leading-tight">
              Найдите идеальную{" "}
              <span className="text-primary">недвижимость</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Выберите ЖК, застройщика или адрес для начала поиска
            </p>
          </div>

          {/* Search Box */}
          <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: "100ms" }}>
            <div className="lg-search-box">
              {/* Search Tabs */}
              <div className="lg-search-tabs">
                {searchTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`lg-search-tab ${activeTab === tab.id ? "lg-search-tab-active" : ""}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div className="p-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Метро, район или ЖК..."
                      className="lg-input-search bg-muted rounded-xl"
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    className="lg-btn-primary h-14 px-8 shrink-0"
                  >
                    <Search className="w-5 h-5" />
                    <span>Найти</span>
                  </Button>
                </div>

                {/* Room Chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {roomFilters.map((room) => (
                    <button
                      key={room}
                      onClick={() => toggleRoom(room)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                        selectedRooms.includes(room)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-card text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {room === "Студия" ? room : `${room}-комн.`}
                    </button>
                  ))}
                  <div className="flex-1" />
                  <button className="text-primary text-sm font-medium hover:underline">
                    Все фильтры
                  </button>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                  {quickFilters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
                      className={`lg-tag ${activeFilter === filter.id ? "lg-tag-active" : ""}`}
                    >
                      <filter.icon className="w-4 h-4 mr-1.5" />
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Complexes Slider */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="lg-section-title">Популярные ЖК</h2>
              <p className="lg-section-subtitle">Лучшие жилые комплексы в вашем регионе</p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border hover:border-primary"
                onClick={() => scrollSlider("left")}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-border hover:border-primary"
                onClick={() => scrollSlider("right")}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div 
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          >
            {popularComplexes.map((complex, index) => (
              <Link
                key={complex.id}
                to={`/complex/${complex.id}`}
                className="flex-shrink-0 w-[280px] md:w-[300px] snap-start animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="lg-card-interactive overflow-hidden group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={complex.image}
                      alt={complex.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`lg-chip ${
                        complex.readiness === "Сдан" ? "lg-chip-success" : ""
                      }`}>
                        {complex.readiness}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-10">
                      <p className="text-white font-display font-bold text-lg">
                        от {(complex.minPrice / 1000000).toFixed(1)} млн ₽
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                      {complex.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {complex.address}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {complex.apartments} квартир
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* View All Card */}
            <Link
              to="/residential-complex"
              className="flex-shrink-0 w-[280px] md:w-[300px] snap-start"
            >
              <div className="h-full bg-muted rounded-xl border border-dashed border-border flex flex-col items-center justify-center p-8 hover:border-primary transition-colors group">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <ArrowRight className="w-6 h-6 text-primary" />
                </div>
                <p className="font-semibold text-foreground">Все жилые комплексы</p>
                <p className="text-sm text-muted-foreground mt-1">120+ ЖК в каталоге</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section className="lg-section bg-light-bg">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="lg-section-title">Актуальные предложения</h2>
              <p className="lg-section-subtitle">Подборка лучших объектов недвижимости</p>
            </div>
            <Link to="/catalog">
              <Button className="lg-btn-secondary">
                Смотреть все
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProperties.map((property, index) => (
              <div
                key={property.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="lg-section bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                value: "1000+",
                label: "Объектов в базе",
                description: "Квартиры, дома и коммерция",
              },
              {
                icon: TrendingUp,
                value: "Лучшие цены",
                label: "От застройщиков",
                description: "Выгодные предложения напрямую",
              },
              {
                icon: MapPin,
                value: "3 региона",
                label: "Белгород, Краснодар, Ростов",
                description: "Расширяем географию",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="lg-advantage-card animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                  <stat.icon className="w-7 h-7 text-primary" />
                </div>
                <p className="text-2xl md:text-3xl font-display font-bold text-dark-blue mb-1">
                  {stat.value}
                </p>
                <p className="font-medium text-foreground mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="lg-section bg-light-bg">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
                Начните поиск недвижимости прямо сейчас
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto text-base md:text-lg">
                Зарегистрируйтесь, чтобы сохранять избранное, сравнивать объекты и получать уведомления о новых предложениях.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-card text-primary hover:bg-card/90 font-semibold px-8 py-3 h-auto rounded-lg transition-all duration-200 shadow-elevated">
                  Зарегистрироваться
                </Button>
                <Link to="/catalog">
                  <Button 
                    variant="ghost" 
                    className="text-primary-foreground hover:bg-primary-foreground/10 font-medium px-8 py-3 h-auto rounded-lg border border-primary-foreground/30"
                  >
                    Перейти в каталог
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
