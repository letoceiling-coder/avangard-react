import { useState, useMemo } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard, { ExtendedProperty } from "@/components/PropertyCard";
import CatalogMap from "@/components/CatalogMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Grid3x3,
  List,
  Map,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Maximize2,
  Home,
  Building2,
  Eye,
} from "lucide-react";

// Extended mock data with coordinates
const allProperties: (ExtendedProperty & { lat: number; lng: number })[] = [
  {
    id: "1",
    title: "3-комнатная квартира",
    price: 6500000,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=800&fit=crop",
    area: 85,
    rooms: 3,
    floor: 12,
    address: "ул. Победы, 89",
    type: "Новостройка",
    buildingName: "ЖК «Белый город»",
    status: "new",
    lat: 50.5956,
    lng: 36.5873,
  },
  {
    id: "2",
    title: "2-комнатная квартира",
    price: 4800000,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=800&fit=crop",
    area: 62,
    rooms: 2,
    floor: 8,
    address: "пр. Славы, 45",
    type: "Вторичка",
    status: "secondary",
    lat: 50.5920,
    lng: 36.5920,
  },
  {
    id: "3",
    title: "Пентхаус",
    price: 15000000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=800&fit=crop",
    area: 145,
    rooms: 4,
    floor: 25,
    address: "ул. Щорса, 2",
    type: "Новостройка",
    buildingName: "ЖК «Империал»",
    status: "verified",
    lat: 50.5980,
    lng: 36.5800,
  },
  {
    id: "4",
    title: "Студия",
    price: 2800000,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=800&fit=crop",
    area: 28,
    rooms: 1,
    floor: 5,
    address: "ул. Белгородская, 12",
    type: "Новостройка",
    buildingName: "ЖК «Современник»",
    status: "new",
    lat: 50.5850,
    lng: 36.5950,
  },
  {
    id: "5",
    title: "1-комнатная квартира",
    price: 3200000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=800&fit=crop",
    area: 42,
    rooms: 1,
    floor: 7,
    address: "ул. Губкина, 17",
    type: "Новостройка",
    status: "new",
    lat: 50.5900,
    lng: 36.6000,
  },
  {
    id: "6",
    title: "2-комнатная квартира",
    price: 5100000,
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=800&fit=crop",
    area: 68,
    rooms: 2,
    floor: 14,
    address: "ул. Садовая, 23",
    type: "Вторичка",
    status: "verified",
    lat: 50.6000,
    lng: 36.5850,
  },
  {
    id: "7",
    title: "4-комнатная квартира",
    price: 9800000,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=800&fit=crop",
    area: 120,
    rooms: 4,
    floor: 18,
    address: "ул. Центральная, 1",
    type: "Новостройка",
    buildingName: "ЖК «Центральный»",
    status: "new",
    lat: 50.5940,
    lng: 36.5780,
  },
  {
    id: "8",
    title: "3-комнатная квартира",
    price: 7200000,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=800&fit=crop",
    area: 92,
    rooms: 3,
    floor: 9,
    address: "пр. Богдана Хмельницкого, 78",
    type: "Вторичка",
    status: "secondary",
    lat: 50.5880,
    lng: 36.5900,
  },
  {
    id: "9",
    title: "1-комнатная квартира",
    price: 3500000,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=800&fit=crop",
    area: 45,
    rooms: 1,
    floor: 11,
    address: "ул. Харьковская, 15",
    type: "Новостройка",
    status: "new",
    lat: 50.5970,
    lng: 36.5930,
  },
  {
    id: "10",
    title: "2-комнатная квартира",
    price: 4500000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop",
    area: 58,
    rooms: 2,
    floor: 6,
    address: "ул. Попова, 32",
    type: "Вторичка",
    status: "verified",
    lat: 50.5910,
    lng: 36.5820,
  },
  {
    id: "11",
    title: "Студия с террасой",
    price: 3100000,
    image: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=800&fit=crop",
    area: 35,
    rooms: 1,
    floor: 3,
    address: "ул. Костюкова, 44",
    type: "Новостройка",
    status: "new",
    lat: 50.5865,
    lng: 36.5965,
  },
  {
    id: "12",
    title: "3-комнатная квартира",
    price: 8500000,
    image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=800&fit=crop",
    area: 105,
    rooms: 3,
    floor: 16,
    address: "ул. 5 Августа, 7",
    type: "Новостройка",
    buildingName: "ЖК «Империал»",
    status: "verified",
    lat: 50.5995,
    lng: 36.5755,
  },
];

const regions = [
  { value: "belgorod", label: "Белгород" },
  { value: "kursk", label: "Курск" },
  { value: "voronezh", label: "Воронеж" },
];

const propertyTypes = [
  { value: "all", label: "Все типы" },
  { value: "apartment", label: "Квартиры" },
  { value: "room", label: "Комнаты" },
  { value: "house", label: "Дома" },
  { value: "commercial", label: "Коммерция" },
];

const statusOptions = [
  { value: "all", label: "Любой статус" },
  { value: "new", label: "Новостройка" },
  { value: "secondary", label: "Вторичка" },
  { value: "verified", label: "Проверено" },
];

const roomOptions = ["Студия", "1", "2", "3", "4+"];

interface Filters {
  region: string;
  type: string;
  status: string;
  priceMin: number;
  priceMax: number;
  areaMin: number;
  areaMax: number;
  rooms: string[];
  floors: string;
}

const defaultFilters: Filters = {
  region: "belgorod",
  type: "all",
  status: "all",
  priceMin: 0,
  priceMax: 20000000,
  areaMin: 0,
  areaMax: 200,
  rooms: [],
  floors: "",
};

// Filter Panel Component
const FilterPanel = ({
  filters,
  setFilters,
  onReset,
  activeCount,
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  onReset: () => void;
  activeCount: number;
}) => {
  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleRoom = (room: string) => {
    const newRooms = filters.rooms.includes(room)
      ? filters.rooms.filter((r) => r !== room)
      : [...filters.rooms, room];
    updateFilter("rooms", newRooms);
  };

  return (
    <div className="space-y-6">
      {/* Region */}
      <div>
        <label className="text-sm font-medium text-title mb-2 block">Регион</label>
        <Select value={filters.region} onValueChange={(v) => updateFilter("region", v)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border z-50">
            {regions.map((r) => (
              <SelectItem key={r.value} value={r.value}>{r.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Type */}
      <div>
        <label className="text-sm font-medium text-title mb-2 block">Тип недвижимости</label>
        <Select value={filters.type} onValueChange={(v) => updateFilter("type", v)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border z-50">
            {propertyTypes.map((t) => (
              <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Status */}
      <div>
        <label className="text-sm font-medium text-title mb-2 block">Статус</label>
        <Select value={filters.status} onValueChange={(v) => updateFilter("status", v)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card border-border z-50">
            {statusOptions.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="text-sm font-medium text-title mb-3 block">
          Цена: {(filters.priceMin / 1000000).toFixed(1)} — {(filters.priceMax / 1000000).toFixed(1)} млн ₽
        </label>
        <Slider
          value={[filters.priceMin, filters.priceMax]}
          onValueChange={([min, max]) => {
            setFilters({ ...filters, priceMin: min, priceMax: max });
          }}
          min={0}
          max={20000000}
          step={100000}
        />
      </div>

      {/* Area Range */}
      <div>
        <label className="text-sm font-medium text-title mb-2 block">Площадь, м²</label>
        <div className="grid grid-cols-2 gap-2">
          <Input
            type="number"
            placeholder="От"
            value={filters.areaMin || ""}
            onChange={(e) => updateFilter("areaMin", Number(e.target.value))}
          />
          <Input
            type="number"
            placeholder="До"
            value={filters.areaMax || ""}
            onChange={(e) => updateFilter("areaMax", Number(e.target.value))}
          />
        </div>
      </div>

      {/* Rooms */}
      <div>
        <label className="text-sm font-medium text-title mb-3 block">Комнаты</label>
        <div className="flex flex-wrap gap-2">
          {roomOptions.map((room) => (
            <button
              key={room}
              onClick={() => toggleRoom(room)}
              className={`px-3 py-2 rounded-input text-sm font-medium transition-all border ${
                filters.rooms.includes(room)
                  ? "bg-primary text-white border-primary"
                  : "bg-surface text-title border-border hover:border-primary"
              }`}
            >
              {room === "Студия" ? room : `${room}`}
            </button>
          ))}
        </div>
      </div>

      {/* Floors */}
      <div>
        <label className="text-sm font-medium text-title mb-2 block">Этаж</label>
        <div className="grid grid-cols-2 gap-2">
          <Input type="number" placeholder="От" />
          <Input type="number" placeholder="До" />
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-border space-y-3">
        <Button variant="primary" className="w-full">
          Применить фильтры
        </Button>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Сбросить все фильтры ({activeCount})
          </button>
        )}
      </div>
    </div>
  );
};

// List View Row Component
const ListViewRow = ({
  property,
  isActive,
  onHover,
  onLeave,
}: {
  property: ExtendedProperty;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) => {
  const navigate = useNavigate();
  const pricePerMeter = Math.round(property.price / property.area);

  return (
    <div
      onClick={() => navigate(`/property/${property.id}`)}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`flex items-center gap-4 p-4 bg-card rounded-card border cursor-pointer transition-all hover:shadow-md ${
        isActive ? "border-primary ring-1 ring-primary" : "border-border"
      }`}
    >
      {/* Photo */}
      <div className="w-20 h-20 rounded-input overflow-hidden flex-shrink-0">
        <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-title truncate">{property.title}</h3>
        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
          <MapPin className="w-3.5 h-3.5" />
          {property.address}
        </p>
      </div>

      {/* Params */}
      <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <Maximize2 className="w-3.5 h-3.5" />
          {property.area} м²
        </span>
        <span className="flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          {property.rooms} комн.
        </span>
        <span className="flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5" />
          {property.floor} эт.
        </span>
      </div>

      {/* Price */}
      <div className="text-right flex-shrink-0">
        <p className="font-bold text-title">{property.price.toLocaleString("ru-RU")} ₽</p>
        <p className="text-xs text-muted-foreground">{pricePerMeter.toLocaleString("ru-RU")} ₽/м²</p>
      </div>

      {/* Button */}
      <Button variant="primary" size="sm" className="hidden sm:flex">
        <Eye className="w-4 h-4 mr-1" />
        Подробнее
      </Button>
    </div>
  );
};

const Catalog = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const [highlightedPropertyId, setHighlightedPropertyId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const itemsPerPage = 12;
  const totalPages = Math.ceil(allProperties.length / itemsPerPage);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.type !== "all") count++;
    if (filters.status !== "all") count++;
    if (filters.priceMin > 0 || filters.priceMax < 20000000) count++;
    if (filters.areaMin > 0 || filters.areaMax < 200) count++;
    if (filters.rooms.length > 0) count++;
    return count;
  }, [filters]);

  // Filter properties (mock filtering)
  const filteredProperties = useMemo(() => {
    return allProperties.filter((p) => {
      if (filters.status !== "all" && p.status !== filters.status) return false;
      if (filters.priceMin > 0 && p.price < filters.priceMin) return false;
      if (filters.priceMax < 20000000 && p.price > filters.priceMax) return false;
      if (filters.areaMin > 0 && p.area < filters.areaMin) return false;
      if (filters.areaMax < 200 && p.area > filters.areaMax) return false;
      if (filters.rooms.length > 0) {
        const roomStr = p.rooms === 1 ? (p.area < 35 ? "Студия" : "1") : p.rooms >= 4 ? "4+" : String(p.rooms);
        if (!filters.rooms.includes(roomStr)) return false;
      }
      return true;
    });
  }, [filters]);

  // Paginated properties
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const handleMarkerClick = (id: string) => {
    setHighlightedPropertyId(id);
    // Scroll to card
    const element = document.getElementById(`property-${id}`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 flex">
        {/* Sidebar - Desktop Only */}
        <aside className="hidden md:block w-[300px] flex-shrink-0 border-r border-border bg-card sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="p-5">
            <h2 className="text-lg font-semibold text-title mb-5">Фильтры</h2>
            <FilterPanel
              filters={filters}
              setFilters={setFilters}
              onReset={resetFilters}
              activeCount={activeFilterCount}
            />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col min-w-0">
          {/* Top Bar */}
          <div className="sticky top-16 z-30 bg-card border-b border-border px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              {/* Mobile Filter Button */}
              <Sheet open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden relative">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    Фильтры
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-md overflow-y-auto">
                  <SheetHeader className="mb-5">
                    <SheetTitle>Фильтры</SheetTitle>
                  </SheetHeader>
                  <FilterPanel
                    filters={filters}
                    setFilters={setFilters}
                    onReset={resetFilters}
                    activeCount={activeFilterCount}
                  />
                </SheetContent>
              </Sheet>

              {/* Results Count */}
              <div className="hidden md:block">
                <span className="text-sm text-muted-foreground">
                  Найдено <strong className="text-title">{filteredProperties.length}</strong> объектов
                </span>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2 ml-auto">
                <div className="flex items-center border border-border rounded-input overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid" ? "bg-primary text-white" : "text-muted-foreground hover:text-title"
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${
                      viewMode === "list" ? "bg-primary text-white" : "text-muted-foreground hover:text-title"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("map")}
                    className={`p-2 transition-colors ${
                      viewMode === "map" ? "bg-primary text-white" : "text-muted-foreground hover:text-title"
                    }`}
                  >
                    <Map className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Area */}
          {viewMode === "map" ? (
            // Fullscreen Map View (Mobile)
            <div className="flex-1 md:hidden">
              <CatalogMap
                properties={filteredProperties}
                onPropertyClick={(id) => navigate(`/property/${id}`)}
                hoveredPropertyId={hoveredPropertyId}
                className="h-full"
              />
            </div>
          ) : (
            <div className="flex flex-1">
              {/* Properties List */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  {/* Mobile Results Count */}
                  <div className="md:hidden mb-4">
                    <p className="text-sm text-muted-foreground">
                      Найдено <strong className="text-title">{filteredProperties.length}</strong> объектов
                    </p>
                  </div>

                  {/* Grid View */}
                  {viewMode === "grid" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {paginatedProperties.map((property) => (
                        <div
                          key={property.id}
                          id={`property-${property.id}`}
                          onMouseEnter={() => setHoveredPropertyId(property.id)}
                          onMouseLeave={() => setHoveredPropertyId(null)}
                          className={highlightedPropertyId === property.id ? "ring-2 ring-primary rounded-card" : ""}
                        >
                          <PropertyCard property={property} />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* List View */}
                  {viewMode === "list" && (
                    <div className="space-y-3">
                      {paginatedProperties.map((property) => (
                        <div key={property.id} id={`property-${property.id}`}>
                          <ListViewRow
                            property={property}
                            isActive={hoveredPropertyId === property.id || highlightedPropertyId === property.id}
                            onHover={() => setHoveredPropertyId(property.id)}
                            onLeave={() => setHoveredPropertyId(null)}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-border">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`min-w-[36px] h-9 px-3 rounded-input text-sm font-medium transition-colors ${
                              currentPage === page
                                ? "bg-primary text-white"
                                : "text-title hover:bg-surface"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </nav>
                  )}
                </div>
              </div>

              {/* Map - Desktop Only (50% width) */}
              <div className="hidden md:block md:w-1/2 sticky top-[120px] h-[calc(100vh-120px)]">
                <CatalogMap
                  properties={filteredProperties}
                  onPropertyClick={handleMarkerClick}
                  hoveredPropertyId={hoveredPropertyId}
                  className="h-full"
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {viewMode !== "map" && <Footer />}
    </div>
  );
};

export default Catalog;
