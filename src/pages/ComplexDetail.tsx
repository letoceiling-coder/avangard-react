import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import ChessBoard from "@/components/ChessBoard";
import { Building2, MapPin, Calendar, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockComplex = {
  id: "1",
  name: "ЖК «Белый город»",
  developer: "СК «Белгородский»",
  address: "ул. Победы, 89, Белгород",
  minPrice: 3500000,
  completion: "IV кв. 2024",
  description: "Современный жилой комплекс в развивающемся районе города. Комплекс состоит из трёх корпусов высотой от 16 до 25 этажей. Закрытая благоустроенная территория с детскими площадками, зонами отдыха и подземной парковкой.",
  images: [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=800&fit=crop",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop",
  ],
  features: [
    "Закрытая территория",
    "Подземная парковка",
    "Детские площадки",
    "Зоны отдыха",
    "Консьерж-сервис",
    "Видеонаблюдение",
    "Фитнес-зал",
    "Детский сад",
  ],
};

// Mock chess board data
const mockChessApartments = [
  { id: "c1", section: 1, floor: 16, number: "161", rooms: 1, area: 28, price: 2800000, status: "available" as const },
  { id: "c2", section: 1, floor: 15, number: "151", rooms: 2, area: 54, price: 4500000, status: "available" as const },
  { id: "c3", section: 1, floor: 14, number: "141", rooms: 3, area: 85, price: 6500000, status: "booked" as const },
  { id: "c4", section: 1, floor: 13, number: "131", rooms: 1, area: 30, price: 2900000, status: "sold" as const },
  { id: "c5", section: 1, floor: 12, number: "121", rooms: 2, area: 52, price: 4300000, status: "available" as const },
  { id: "c6", section: 1, floor: 11, number: "111", rooms: 3, area: 82, price: 6200000, status: "available" as const },
  { id: "c7", section: 1, floor: 10, number: "101", rooms: 1, area: 29, price: 2850000, status: "sold" as const },
  { id: "c8", section: 2, floor: 16, number: "162", rooms: 2, area: 56, price: 4800000, status: "available" as const },
  { id: "c9", section: 2, floor: 15, number: "152", rooms: 3, area: 88, price: 6800000, status: "booked" as const },
  { id: "c10", section: 2, floor: 14, number: "142", rooms: 1, area: 27, price: 2750000, status: "available" as const },
  { id: "c11", section: 2, floor: 13, number: "132", rooms: 2, area: 55, price: 4600000, status: "available" as const },
  { id: "c12", section: 2, floor: 12, number: "122", rooms: 3, area: 84, price: 6400000, status: "sold" as const },
  { id: "c13", section: 2, floor: 11, number: "112", rooms: 1, area: 31, price: 2950000, status: "available" as const },
  { id: "c14", section: 2, floor: 10, number: "102", rooms: 2, area: 53, price: 4400000, status: "booked" as const },
  { id: "c15", section: 3, floor: 16, number: "163", rooms: 3, area: 90, price: 7200000, status: "available" as const },
  { id: "c16", section: 3, floor: 15, number: "153", rooms: 1, area: 28, price: 2800000, status: "sold" as const },
  { id: "c17", section: 3, floor: 14, number: "143", rooms: 2, area: 57, price: 4900000, status: "available" as const },
  { id: "c18", section: 3, floor: 13, number: "133", rooms: 3, area: 86, price: 6600000, status: "available" as const },
  { id: "c19", section: 3, floor: 12, number: "123", rooms: 1, area: 29, price: 2850000, status: "booked" as const },
  { id: "c20", section: 3, floor: 11, number: "113", rooms: 2, area: 54, price: 4500000, status: "available" as const },
  { id: "c21", section: 3, floor: 10, number: "103", rooms: 3, area: 83, price: 6300000, status: "sold" as const },
];

const availableApartments = [
  {
    id: "1",
    title: "3-комнатная квартира в ЖК «Белый город»",
    price: 6500000,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    area: 85,
    rooms: 3,
    floor: 12,
    address: "ул. Победы, 89",
    type: "Новостройка",
  },
  {
    id: "4",
    title: "Студия в новом ЖК",
    price: 2800000,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
    area: 28,
    rooms: 1,
    floor: 5,
    address: "ул. Победы, 89",
    type: "Новостройка",
  },
];

const ComplexDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="relative h-96 md:h-[600px] overflow-hidden rounded-2xl">
            <img
              src={mockComplex.images[0]}
              alt={mockComplex.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {mockComplex.images.slice(1).map((image, index) => (
              <div key={index} className="relative h-44 md:h-[290px] overflow-hidden rounded-2xl">
                <img
                  src={image}
                  alt={`${mockComplex.name} ${index + 2}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl font-display font-bold mb-4">{mockComplex.name}</h1>
              <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  {mockComplex.developer}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {mockComplex.address}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Сдача: {mockComplex.completion}
                </div>
              </div>
              <div className="text-3xl font-display font-bold text-primary">
                от {(mockComplex.minPrice / 1000000).toFixed(1)} млн ₽
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-2xl font-display font-semibold mb-4">Описание</h2>
              <p className="text-muted-foreground leading-relaxed">{mockComplex.description}</p>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-2xl font-display font-semibold mb-4">Преимущества</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockComplex.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50">
                    <Shield className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card p-6">
              <h2 className="text-2xl font-display font-semibold mb-4">Расположение</h2>
              <div className="h-96 bg-secondary/50 rounded-xl flex items-center justify-center">
                <p className="text-muted-foreground">Яндекс.Карты</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-display font-semibold mb-6">Доступные квартиры</h2>
              
              <Tabs defaultValue="chessboard" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="chessboard">Шахматка</TabsTrigger>
                  <TabsTrigger value="list">Список</TabsTrigger>
                </TabsList>
                
                <TabsContent value="chessboard">
                  <ChessBoard apartments={mockChessApartments} complexId={mockComplex.id} />
                </TabsContent>
                
                <TabsContent value="list">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {availableApartments.map((apartment) => (
                      <PropertyCard key={apartment.id} property={apartment} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="glass-card p-6 sticky top-24">
              <h3 className="text-xl font-display font-semibold mb-4">Хотите узнать больше?</h3>
              <p className="text-muted-foreground mb-4">
                Оставьте заявку, и наш менеджер свяжется с вами
              </p>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-white/10 focus:border-primary focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-white/10 focus:border-primary focus:outline-none"
                />
                <button className="w-full premium-button py-3 rounded-lg">
                  Оставить заявку
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ComplexDetail;
