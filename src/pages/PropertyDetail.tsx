import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Heart, Phone, MapPin, Maximize2, Home, Calendar, 
  ChevronLeft, ChevronRight, CreditCard, Building2, 
  Car, Shield, Trees, ArrowLeft, Share2, Check
} from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import YandexMap from "@/components/YandexMap";
import ViewingRequestForm from "@/components/ViewingRequestForm";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";

const mockProperty = {
  id: "1",
  title: "3-комнатная квартира в ЖК «Белый город»",
  price: 6500000,
  pricePerMeter: 76470,
  mortgagePayment: 58000,
  images: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop",
  ],
  area: 85,
  rooms: 3,
  floor: 12,
  totalFloors: 25,
  address: "ул. Победы, 89, Белгород",
  district: "Центральный район",
  type: "Новостройка",
  year: 2024,
  readiness: "Сдан",
  finishing: "Чистовая",
  description: "Премиальная квартира в современном жилом комплексе «Белый город». Панорамное остекление, высокие потолки 3.2 м, чистовая отделка. Развитая инфраструктура, подземная парковка, детские площадки. Рядом парк, школа, торговый центр. Квартира готова к проживанию.",
  features: [
    "Панорамное остекление",
    "Высокие потолки 3.2 м",
    "Чистовая отделка",
    "Подземная парковка",
    "Консьерж-сервис",
    "Детская площадка",
    "Видеонаблюдение",
    "Закрытая территория",
  ],
  complex: "ЖК «Белый город»",
  developer: "Строительная компания «Новый Дом»",
  coordinates: [50.5997, 36.5873] as [number, number],
};

const similarProperties = [
  {
    id: "2",
    title: "2-комнатная квартира с видом на парк",
    price: 4800000,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    area: 62,
    rooms: 2,
    floor: 8,
    address: "пр. Славы, 45",
    type: "Новостройка",
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
    type: "Новостройка",
  },
  {
    id: "4",
    title: "Студия в ЖК «Современник»",
    price: 2900000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
    area: 28,
    rooms: 1,
    floor: 5,
    address: "ул. Губкина, 17",
    type: "Новостройка",
  },
];

const PropertyDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites();
  
  const favorite = isFavorite(mockProperty.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFromFavorites(mockProperty.id);
      toast.success("Удалено из избранного");
    } else {
      addToFavorites({
        id: mockProperty.id,
        title: mockProperty.title,
        price: mockProperty.price,
        image: mockProperty.images[0],
        area: mockProperty.area,
        rooms: mockProperty.rooms,
        floor: mockProperty.floor,
        address: mockProperty.address,
        type: mockProperty.type,
      });
      toast.success("Добавлено в избранное");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Ссылка скопирована");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % mockProperty.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + mockProperty.images.length) % mockProperty.images.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8">
        {/* Breadcrumb & Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link 
              to="/catalog" 
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Назад в каталог</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-border hover:border-primary hover:text-primary"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={`rounded-full ${
                favorite 
                  ? "border-primary text-primary bg-primary/5" 
                  : "border-border hover:border-primary hover:text-primary"
              }`}
              onClick={toggleFavorite}
            >
              <Heart className={`w-4 h-4 ${favorite ? "fill-primary" : ""}`} />
            </Button>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="mb-8">
          {/* Main Gallery Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 rounded-2xl overflow-hidden">
            {/* Main Large Image */}
            <div className="lg:col-span-2 lg:row-span-2 relative aspect-[4/3] lg:aspect-auto lg:h-[480px] group cursor-pointer">
              <img
                src={mockProperty.images[0]}
                alt={mockProperty.title}
                className="w-full h-full object-cover"
                onClick={() => { setCurrentImageIndex(0); setShowAllPhotos(true); }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Side Images */}
            {mockProperty.images.slice(1, 5).map((image, index) => (
              <div 
                key={index} 
                className={`hidden lg:block relative aspect-[4/3] lg:h-[234px] group cursor-pointer ${
                  index === 3 ? "relative" : ""
                }`}
                onClick={() => { setCurrentImageIndex(index + 1); setShowAllPhotos(true); }}
              >
                <img
                  src={image}
                  alt={`${mockProperty.title} ${index + 2}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {index === 3 && mockProperty.images.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-semibold">+{mockProperty.images.length - 5} фото</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Gallery Navigation */}
          <div className="lg:hidden mt-3">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {mockProperty.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden ${
                    currentImageIndex === index ? "ring-2 ring-primary" : "opacity-70"
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* View All Photos Button */}
          <button 
            onClick={() => setShowAllPhotos(true)}
            className="mt-4 text-primary font-medium hover:underline flex items-center gap-2"
          >
            Смотреть все {mockProperty.images.length} фото
          </button>
        </div>

        {/* Fullscreen Gallery Modal */}
        {showAllPhotos && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
            <button
              onClick={() => setShowAllPhotos(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            >
              <span className="text-2xl">✕</span>
            </button>
            
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <img
              src={mockProperty.images[currentImageIndex]}
              alt={mockProperty.title}
              className="max-w-full max-h-[80vh] object-contain"
            />
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {mockProperty.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentImageIndex === index ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
              {currentImageIndex + 1} / {mockProperty.images.length}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Type */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {mockProperty.type}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {mockProperty.readiness}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                {mockProperty.title}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{mockProperty.address}</span>
                </div>
                <span className="hidden sm:inline text-border">•</span>
                <span>{mockProperty.district}</span>
              </div>
            </div>

            {/* Price Block */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <p className="text-3xl md:text-4xl font-display font-bold text-foreground">
                    {mockProperty.price.toLocaleString("ru-RU")} ₽
                  </p>
                  <p className="text-muted-foreground mt-1">
                    {mockProperty.pricePerMeter.toLocaleString("ru-RU")} ₽ за м²
                  </p>
                </div>
                <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Ипотека от</p>
                    <p className="text-xl font-bold text-foreground">
                      {mockProperty.mortgagePayment.toLocaleString("ru-RU")} ₽
                      <span className="text-sm font-normal text-muted-foreground">/мес</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Characteristics */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h2 className="text-xl font-display font-semibold mb-6">Характеристики</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: Home, label: "Комнат", value: mockProperty.rooms },
                  { icon: Maximize2, label: "Площадь", value: `${mockProperty.area} м²` },
                  { icon: Building2, label: "Этаж", value: `${mockProperty.floor} из ${mockProperty.totalFloors}` },
                  { icon: Calendar, label: "Год сдачи", value: mockProperty.year },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border mt-6 pt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Отделка</span>
                    <span className="font-medium text-foreground">{mockProperty.finishing}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Жилой комплекс</span>
                    <span className="font-medium text-primary">{mockProperty.complex}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Застройщик</span>
                    <span className="font-medium text-foreground">{mockProperty.developer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Готовность</span>
                    <span className="font-medium text-green-600">{mockProperty.readiness}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h2 className="text-xl font-display font-semibold mb-4">Описание</h2>
              <p className="text-muted-foreground leading-relaxed">{mockProperty.description}</p>
            </div>

            {/* Features */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h2 className="text-xl font-display font-semibold mb-4">Особенности и удобства</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockProperty.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Infrastructure */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <h2 className="text-xl font-display font-semibold mb-4">Инфраструктура</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Car, label: "Парковка", time: "1 мин" },
                  { icon: Trees, label: "Парк", time: "5 мин" },
                  { icon: Building2, label: "Школа", time: "7 мин" },
                  { icon: Shield, label: "Поликлиника", time: "10 мин" },
                ].map((item, index) => (
                  <div key={index} className="text-center p-4 rounded-xl bg-muted/30">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="font-medium text-foreground text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-display font-semibold">Расположение на карте</h2>
                <a 
                  href={`https://yandex.ru/maps/?text=${encodeURIComponent(mockProperty.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  Открыть в Яндекс.Картах
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
              <YandexMap 
                address={mockProperty.address}
                coordinates={mockProperty.coordinates}
                zoom={16}
                className="h-80"
              />
              <p className="mt-3 text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {mockProperty.address}, {mockProperty.district}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card sticky top-24 space-y-4">
              <div className="text-center pb-4 border-b border-border">
                <p className="text-2xl font-bold text-foreground">
                  {mockProperty.price.toLocaleString("ru-RU")} ₽
                </p>
                <p className="text-sm text-muted-foreground">
                  от {mockProperty.mortgagePayment.toLocaleString("ru-RU")} ₽/мес в ипотеку
                </p>
              </div>
              
              <Button className="w-full h-12 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-xl">
                <Phone className="w-5 h-5" />
                Позвонить
              </Button>
              <ViewingRequestForm
                propertyId={mockProperty.id}
                propertyTitle={mockProperty.title}
                propertyImage={mockProperty.images[0]}
                propertyPrice={mockProperty.price}
              />
              <Button
                variant="outline"
                className={`w-full h-12 gap-2 rounded-xl font-medium ${
                  favorite 
                    ? "border-primary text-primary bg-primary/5" 
                    : "border-border text-foreground hover:border-primary hover:text-primary"
                }`}
                onClick={toggleFavorite}
              >
                <Heart className={`w-5 h-5 ${favorite ? "fill-primary" : ""}`} />
                {favorite ? "В избранном" : "Добавить в избранное"}
              </Button>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  Объект проверен. Актуальность данных: сегодня
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Properties */}
        <section className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-foreground">Похожие объекты</h2>
            <Link 
              to="/catalog" 
              className="text-primary font-medium hover:underline flex items-center gap-1"
            >
              Смотреть все
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetail;
