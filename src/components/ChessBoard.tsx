import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Apartment {
  id: string;
  section: number;
  floor: number;
  number: string;
  rooms: number;
  area: number;
  price: number;
  status: "available" | "booked" | "sold";
}

interface ChessBoardProps {
  apartments: Apartment[];
  complexId: string;
}

const statusColors = {
  available: "bg-success hover:bg-success/80 cursor-pointer",
  booked: "bg-warning hover:bg-warning/80 cursor-pointer",
  sold: "bg-muted text-muted-foreground cursor-not-allowed",
};

const statusLabels = {
  available: "Свободна",
  booked: "Забронирована",
  sold: "Продана",
};

const ChessBoard = ({ apartments, complexId }: ChessBoardProps) => {
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);
  const [filterRooms, setFilterRooms] = useState<number | null>(null);

  // Get unique sections and floors
  const sections = [...new Set(apartments.map((a) => a.section))].sort((a, b) => a - b);
  const floors = [...new Set(apartments.map((a) => a.floor))].sort((a, b) => b - a);

  // Filter apartments
  const filteredApartments = filterRooms
    ? apartments.filter((a) => a.rooms === filterRooms)
    : apartments;

  const getApartment = (section: number, floor: number) => {
    return filteredApartments.find((a) => a.section === section && a.floor === floor);
  };

  const roomOptions = [...new Set(apartments.map((a) => a.rooms))].sort((a, b) => a - b);

  const formatPrice = (price: number) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)} млн`;
    }
    return `${(price / 1000).toFixed(0)} тыс`;
  };

  return (
    <div className="space-y-6">
      {/* Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-success" />
            <span className="text-sm text-muted-foreground">Свободна</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-warning" />
            <span className="text-sm text-muted-foreground">Забронирована</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-muted" />
            <span className="text-sm text-muted-foreground">Продана</span>
          </div>
        </div>

        {/* Room filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Комнат:</span>
          <div className="flex gap-1">
            <button
              onClick={() => setFilterRooms(null)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                filterRooms === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              )}
            >
              Все
            </button>
            {roomOptions.map((rooms) => (
              <button
                key={rooms}
                onClick={() => setFilterRooms(rooms)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  filterRooms === rooms
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                )}
              >
                {rooms === 1 ? "Ст" : rooms}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chess grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Section headers */}
          <div className="flex mb-2">
            <div className="w-16 flex-shrink-0" />
            {sections.map((section) => (
              <div
                key={section}
                className="flex-1 text-center text-sm font-semibold text-foreground py-2 bg-secondary rounded-t-lg mx-0.5"
              >
                Секция {section}
              </div>
            ))}
          </div>

          {/* Floors and apartments */}
          <div className="space-y-1">
            {floors.map((floor) => (
              <div key={floor} className="flex items-stretch">
                {/* Floor label */}
                <div className="w-16 flex-shrink-0 flex items-center justify-center text-sm font-medium text-muted-foreground bg-secondary/50 rounded-l-lg">
                  {floor} эт.
                </div>

                {/* Apartments grid */}
                {sections.map((section) => {
                  const apartment = getApartment(section, floor);

                  if (!apartment) {
                    return (
                      <div
                        key={`${section}-${floor}`}
                        className="flex-1 mx-0.5 h-14 bg-border/30 rounded-lg"
                      />
                    );
                  }

                  return (
                    <div
                      key={apartment.id}
                      onClick={() => apartment.status !== "sold" && setSelectedApartment(apartment)}
                      className={cn(
                        "flex-1 mx-0.5 h-14 rounded-lg flex flex-col items-center justify-center text-white transition-all",
                        statusColors[apartment.status],
                        selectedApartment?.id === apartment.id && "ring-2 ring-foreground ring-offset-2"
                      )}
                    >
                      <span className="text-xs font-medium opacity-90">
                        {apartment.rooms === 1 ? "Ст" : `${apartment.rooms}к`} • {apartment.area}м²
                      </span>
                      <span className="text-xs font-bold">{formatPrice(apartment.price)} ₽</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected apartment details */}
      {selectedApartment && (
        <div className="lg-card p-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">
                Квартира №{selectedApartment.number}
              </h4>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span>Секция {selectedApartment.section}</span>
                <span>{selectedApartment.floor} этаж</span>
                <span>{selectedApartment.rooms === 1 ? "Студия" : `${selectedApartment.rooms}-комн.`}</span>
                <span>{selectedApartment.area} м²</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={cn(
                    "px-2 py-0.5 rounded text-xs font-medium",
                    selectedApartment.status === "available" && "bg-success/10 text-success",
                    selectedApartment.status === "booked" && "bg-warning/10 text-warning"
                  )}
                >
                  {statusLabels[selectedApartment.status]}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="text-2xl font-bold text-primary">
                {(selectedApartment.price / 1000000).toFixed(2)} млн ₽
              </div>
              <div className="text-sm text-muted-foreground">
                {Math.round(selectedApartment.price / selectedApartment.area).toLocaleString()} ₽/м²
              </div>
              <Link
                to={`/property/${selectedApartment.id}`}
                className="lg-btn-primary mt-2"
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChessBoard;
