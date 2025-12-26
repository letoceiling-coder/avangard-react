import { useNavigate, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchWidget from "@/components/SearchWidget";
import heroWinter from "@/assets/hero-bg-winter.png";
import PropertyCard, { ExtendedProperty } from "@/components/PropertyCard";
import StatsBlock from "@/components/StatsBlock";
import CTASocialBlock from "@/components/CTASocialBlock";
import PopularComplexes from "@/components/PopularComplexes";
import QuickTypeSelection from "@/components/QuickTypeSelection";
import SalesStarts from "@/components/SalesStarts";
import MayLikeSection from "@/components/MayLikeSection";
import NewsSlider from "@/components/NewsSlider";
import HomeMapSection from "@/components/HomeMapSection";
import { ArrowRight } from "lucide-react";

const mockProperties: ExtendedProperty[] = [
  {
    id: "1",
    title: "3-комнатная квартира",
    price: 6500000,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=800&fit=crop",
    area: 85,
    rooms: 3,
    floor: 12,
    address: "ул. Победы, 89, Ленинский район",
    type: "Новостройка",
    buildingName: "ЖК «Белый город»",
    status: "new",
  },
  {
    id: "2",
    title: "2-комнатная квартира",
    price: 4800000,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=800&fit=crop",
    area: 62,
    rooms: 2,
    floor: 8,
    address: "пр. Славы, 45, Центральный район",
    type: "Вторичка",
    status: "secondary",
  },
  {
    id: "3",
    title: "Пентхаус",
    price: 15000000,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=800&fit=crop",
    area: 145,
    rooms: 4,
    floor: 25,
    address: "ул. Щорса, 2, Центральный район",
    type: "Новостройка",
    buildingName: "ЖК «Империал»",
    status: "verified",
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
  },
  {
    id: "5",
    title: "1-комнатная квартира",
    price: 3200000,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=800&fit=crop",
    area: 42,
    rooms: 1,
    floor: 7,
    address: "ул. Губкина, 17, Северный район",
    type: "Новостройка",
    buildingName: "ЖК «Новая высота»",
    status: "new",
  },
  {
    id: "6",
    title: "2-комнатная квартира",
    price: 5100000,
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&h=800&fit=crop",
    area: 68,
    rooms: 2,
    floor: 14,
    address: "ул. Садовая, 23, Западный район",
    type: "Вторичка",
    status: "verified",
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
    buildingName: "ЖК «Парковый»",
    status: "new",
  },
  {
    id: "10",
    title: "2-комнатная квартира",
    price: 4500000,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=800&fit=crop",
    area: 58,
    rooms: 2,
    floor: 6,
    address: "ул. Попова, 32, Харьковская гора",
    type: "Вторичка",
    status: "verified",
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
    buildingName: "ЖК «Белый город»",
    status: "new",
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
  },
];

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section - Clean, Premium, Viewport-Height Design */}
      <section className="relative h-[calc(100vh-64px)] min-h-[560px] max-h-[720px] overflow-hidden flex items-center">
        {/* Background Image */}
        <img
          src={heroWinter}
          alt="Современный жилой район зимой"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        
        {/* Gradient Overlay - Subtle dark, top to bottom */}
        <div 
          className="absolute inset-0"
          style={{ 
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.20) 0%, rgba(15, 23, 42, 0.35) 40%, rgba(15, 23, 42, 0.55) 100%)'
          }}
        />

        {/* Hero Content - Centered, tight vertical flow */}
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center h-full -mt-8 md:-mt-12">
          {/* Text Block - Higher position, clean hierarchy */}
          <div className="text-center animate-fade-in">
            {/* Main Heading - Confident, not oversized */}
            <h1 className="text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] font-semibold text-white leading-[1.15] tracking-[-0.02em]">
              Найди свою недвижимость
            </h1>
            
            {/* Subtitle - Lighter, clear connection to headline, 14px gap */}
            <p className="mt-3 md:mt-[14px] text-[14px] md:text-[15px] lg:text-[16px] text-white/75 max-w-[420px] mx-auto leading-[1.55] font-normal">
              Квартиры, дома и коммерция от застройщиков и агентств
            </p>
          </div>

          {/* Search Widget - Main focal point, 24px from subtitle */}
          <div 
            className="w-full max-w-[880px] mt-6 animate-fade-in"
            style={{ animationDelay: "80ms" }}
          >
            <SearchWidget variant="hero" />
          </div>
        </div>
      </section>

      {/* Minimal spacer */}
      <div className="h-4 md:h-8 bg-background" />

      {/* Quick Type Selection */}
      <QuickTypeSelection />

      {/* Popular Complexes */}
      <PopularComplexes />

      {/* Properties Section - Distinct styling */}
      <section className="py-10 md:py-14 relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.04]" />
        
        <div className="container mx-auto px-4 relative">
          {/* Header with decorative element */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-1 bg-primary rounded-full" />
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  Горячие предложения
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                Актуальные предложения
              </h2>
            </div>
            <Link 
              to="/catalog" 
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors group"
            >
              Смотреть все
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid - 4 cols desktop, 2 tablet, 1 mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {mockProperties.map((property, index) => (
              <div
                key={property.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <PropertyCard property={property} featured={index < 2} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* May Like Section */}
      <MayLikeSection />

      {/* Sales Starts 2025 */}
      <SalesStarts />

      {/* Stats Block */}
      <StatsBlock />

      {/* News Section */}
      <NewsSlider />

      {/* Map Section */}
      <HomeMapSection />

      {/* CTA - Sell Your Property */}
      <CTASocialBlock />

      <Footer />
    </div>
  );
};

export default Index;
