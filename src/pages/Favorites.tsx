import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { useFavorites } from "@/hooks/useFavorites";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Избранное
          </h1>
          <p className="text-muted-foreground mt-1">
            {favorites.length} {favorites.length === 1 ? "объект" : "объектов"} сохранено
          </p>
        </div>

        {favorites.length === 0 ? (
          <div className="lg-card p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-display font-semibold mb-2">Избранное пусто</h2>
            <p className="text-muted-foreground mb-6">
              Добавляйте понравившиеся объекты, нажимая на сердечко
            </p>
            <Link to="/catalog">
              <Button className="lg-btn-primary">Перейти в каталог</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Favorites;
