import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import CatalogMap from "@/components/CatalogMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  Grid3x3, List, SlidersHorizontal, Map, Search, X, 
  ChevronDown, ArrowUpDown, MapPin
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

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
    type: "Новостройка" as const,
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
  {
    id: "5",
    title: "Просторная 4-комнатная квартира",
    price: 9200000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    area: 120,
    rooms: 4,
    floor: 15,
    address: "пр. Богдана Хмельницкого, 78",
    type: "Вторичка" as const,
  },
  {
    id: "6",
    title: "Квартира с ремонтом в центре",
    price: 5500000,
    image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    area: 72,
    rooms: 2,
    floor: 6,
    address: "ул. Попова, 34",
    type: "Вторичка" as const,
  },
];

const FilterContent = ({ 
  priceRange, 
  setPriceRange,
  selectedRooms,
  toggleRoom,
}: { 
  priceRange: number[]; 
  setPriceRange: (value: number[]) => void;
  selectedRooms: string[];
  toggleRoom: (room: string) => void;
}) => (
  <div className="space-y-5">
    <div>
      <label className="text-sm font-medium text-foreground mb-2 block">Регион</label>
      <Select defaultValue="belgorod">
        <SelectTrigger className="lg-input">
          <SelectValue placeholder="Выберите регион" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="belgorod">Белгород</SelectItem>
          <SelectItem value="krasnodar">Краснодарский край</SelectItem>
          <SelectItem value="rostov">Ростовская область</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <label className="text-sm font-medium text-foreground mb-2 block">Тип недвижимости</label>
      <Select>
        <SelectTrigger className="lg-input">
          <SelectValue placeholder="Любой тип" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="new">Новостройка</SelectItem>
          <SelectItem value="secondary">Вторичка</SelectItem>
          <SelectItem value="house">Дом</SelectItem>
          <SelectItem value="commercial">Коммерция</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <div>
      <label className="text-sm font-medium text-foreground mb-3 block">Комнаты</label>
      <div className="flex flex-wrap gap-2">
        {["Студия", "1", "2", "3", "4+"].map((room) => (
          <button 
            key={room} 
            onClick={() => toggleRoom(room)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              selectedRooms.includes(room)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground border-border hover:border-primary/50"
            }`}
          >
            {room}
          </button>
        ))}
      </div>
    </div>

    <div>
      <label className="text-sm font-medium text-foreground mb-4 block">
        Цена: {(priceRange[0] / 1000000).toFixed(1)} — {(priceRange[1] / 1000000).toFixed(1)} млн ₽
      </label>
      <Slider
        value={priceRange}
        onValueChange={setPriceRange}
        max={20000000}
        min={0}
        step={100000}
        className="mb-2"
      />
    </div>

    <div>
      <label className="text-sm font-medium text-foreground mb-2 block">Площадь, м²</label>
      <div className="grid grid-cols-2 gap-2">
        <Input placeholder="От" type="number" className="lg-input" />
        <Input placeholder="До" type="number" className="lg-input" />
      </div>
    </div>

    <div>
      <label className="text-sm font-medium text-foreground mb-2 block">Район</label>
      <Select>
        <SelectTrigger className="lg-input">
          <SelectValue placeholder="Любой район" />
        </SelectTrigger>
        <SelectContent className="bg-card border-border">
          <SelectItem value="center">Центральный</SelectItem>
          <SelectItem value="west">Западный</SelectItem>
          <SelectItem value="east">Восточный</SelectItem>
          <SelectItem value="north">Северный</SelectItem>
        </SelectContent>
      </Select>
    </div>

    <Button className="w-full lg-btn-primary">
      Применить фильтры
    </Button>

    <button className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors">
      Сбросить все фильтры
    </button>
  </div>
);

const Catalog = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMap, setShowMap] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 20000000]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("default");

  const toggleRoom = (room: string) => {
    setSelectedRooms(prev => 
      prev.includes(room) ? prev.filter(r => r !== room) : [...prev, room]
    );
  };

  const handlePropertyClick = (id: string) => {
    window.location.href = `/property/${id}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Sticky Filter Bar */}
      <div className="sticky top-0 z-30 bg-card border-b border-border shadow-header">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
            {/* Search */}
            <div className="relative flex-shrink-0 w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Район или ЖК..." 
                className="pl-9 h-10 bg-muted border-0 rounded-lg"
              />
            </div>

            {/* Quick Filters */}
            <Select defaultValue="any">
              <SelectTrigger className="h-10 w-auto min-w-[140px] bg-muted border-0 rounded-lg">
                <SelectValue placeholder="Комнаты" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="any">Любые</SelectItem>
                <SelectItem value="1">1 комната</SelectItem>
                <SelectItem value="2">2 комнаты</SelectItem>
                <SelectItem value="3">3 комнаты</SelectItem>
                <SelectItem value="4">4+ комнат</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="any">
              <SelectTrigger className="h-10 w-auto min-w-[160px] bg-muted border-0 rounded-lg">
                <SelectValue placeholder="Цена" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="any">Любая цена</SelectItem>
                <SelectItem value="3m">До 3 млн ₽</SelectItem>
                <SelectItem value="5m">До 5 млн ₽</SelectItem>
                <SelectItem value="10m">До 10 млн ₽</SelectItem>
                <SelectItem value="15m">До 15 млн ₽</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="any">
              <SelectTrigger className="h-10 w-auto min-w-[140px] bg-muted border-0 rounded-lg">
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="any">Любой</SelectItem>
                <SelectItem value="new">Новостройки</SelectItem>
                <SelectItem value="secondary">Вторичка</SelectItem>
              </SelectContent>
            </Select>

            {/* More Filters Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="h-10 gap-2 flex-shrink-0 rounded-lg border-border">
                  <SlidersHorizontal className="w-4 h-4" />
                  Ещё фильтры
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-xl font-display">Все фильтры</SheetTitle>
                </SheetHeader>
                <FilterContent 
                  priceRange={priceRange} 
                  setPriceRange={setPriceRange}
                  selectedRooms={selectedRooms}
                  toggleRoom={toggleRoom}
                />
              </SheetContent>
            </Sheet>

            <div className="flex-1" />

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-10 w-auto min-w-[160px] bg-card border-border rounded-lg">
                <ArrowUpDown className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="default">По умолчанию</SelectItem>
                <SelectItem value="price-asc">Сначала дешевле</SelectItem>
                <SelectItem value="price-desc">Сначала дороже</SelectItem>
                <SelectItem value="area-desc">По площади</SelectItem>
                <SelectItem value="date">По дате</SelectItem>
              </SelectContent>
            </Select>

            {/* Map Toggle */}
            <Button
              variant={showMap ? "default" : "outline"}
              size="sm"
              className={`h-10 gap-2 flex-shrink-0 rounded-lg ${showMap ? "bg-primary text-primary-foreground" : "border-border"}`}
              onClick={() => setShowMap(!showMap)}
            >
              <Map className="w-4 h-4" />
              <span className="hidden sm:inline">Карта</span>
            </Button>

            {/* View Toggle */}
            <div className="flex items-center border border-border rounded-lg p-1 flex-shrink-0">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "grid" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className="flex-1 flex">
        {/* Properties List - 60% */}
        <div className={`${showMap ? "w-full lg:w-[60%]" : "w-full"} overflow-y-auto`}>
          <div className="container mx-auto px-4 py-6">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-display font-bold text-foreground">
                  Недвижимость в Белгороде
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Найдено {mockProperties.length} объектов
                </p>
              </div>
            </div>

            {/* Properties Grid */}
            <div className={`grid gap-4 ${
              viewMode === "grid" 
                ? showMap 
                  ? "grid-cols-1 md:grid-cols-2" 
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            }`}>
              {mockProperties.map((property, index) => (
                <div 
                  key={property.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 30}ms` }}
                  onMouseEnter={() => setHoveredPropertyId(property.id)}
                  onMouseLeave={() => setHoveredPropertyId(null)}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline" className="lg-btn-secondary">
                Показать ещё
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Map - 40% */}
        {showMap && (
          <div className="hidden lg:block lg:w-[40%] sticky top-[57px] h-[calc(100vh-57px)]">
            <CatalogMap 
              properties={mockProperties}
              onPropertyClick={handlePropertyClick}
              hoveredPropertyId={hoveredPropertyId}
              className="h-full"
            />
          </div>
        )}
      </div>

      {/* Mobile Map Button */}
      <div className="lg:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-40">
        <Button
          onClick={() => setShowMap(!showMap)}
          className="lg-btn-primary shadow-elevated rounded-full px-6"
        >
          <Map className="w-4 h-4 mr-2" />
          {showMap ? "Список" : "Показать на карте"}
        </Button>
      </div>

      {!showMap && <Footer />}
    </div>
  );
};

export default Catalog;
