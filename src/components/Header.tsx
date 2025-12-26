import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X, User, MapPin, Heart, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import LiveGridLogo from "./LiveGridLogo";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(
    localStorage.getItem("selectedRegion") || "Белгород"
  );

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/catalog", label: "Каталог" },
    { path: "/residential-complex", label: "ЖК" },
    { path: "/developers", label: "Застройщики" },
    { path: "/about", label: "О компании" },
  ];

  const regions = [
    { id: "belgorod", name: "Белгород" },
    { id: "krasnodar", name: "Краснодарский край" },
    { id: "rostov", name: "Ростовская область" },
  ];

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
    localStorage.setItem("selectedRegion", region);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/98 backdrop-blur-md shadow-header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <LiveGridLogo size="md" />
          </Link>

          {/* Region Selector - Desktop */}
          <div className="hidden md:flex items-center ml-8">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="lg-btn-ghost gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {selectedRegion}
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-card border-border">
                {regions.map((region) => (
                  <DropdownMenuItem
                    key={region.id}
                    onClick={() => handleRegionChange(region.name)}
                    className={selectedRegion === region.name ? "bg-primary/10 text-primary" : ""}
                  >
                    {region.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-1 ml-auto mr-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:text-primary hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/favorites">
              <Button variant="ghost" className="lg-btn-ghost">
                <Heart className="w-4 h-4" />
                Избранное
              </Button>
            </Link>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 rounded-xl border-primary text-primary hover:bg-primary/5">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-3.5 h-3.5" />
                    </div>
                    <span className="max-w-[100px] truncate">{user?.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Личный кабинет
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites" className="cursor-pointer">
                      <Heart className="w-4 h-4 mr-2" />
                      Избранное
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="lg-btn-primary">
                  <User className="w-4 h-4" />
                  Войти
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {/* Region Selector - Mobile */}
            <div className="pb-3 mb-3 border-b border-border">
              <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider">Регион</p>
              <div className="flex flex-wrap gap-2">
                {regions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => handleRegionChange(region.name)}
                    className={`lg-tag ${selectedRegion === region.name ? "lg-tag-active" : ""}`}
                  >
                    {region.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 mt-3 border-t border-border space-y-2">
              <Link
                to="/favorites"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium hover:bg-secondary"
              >
                Избранное
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-base font-medium hover:bg-secondary"
                  >
                    Личный кабинет
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-destructive"
                    onClick={() => { logout(); setMobileMenuOpen(false); }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Выйти
                  </Button>
                </>
              ) : (
                <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full lg-btn-primary">
                    <User className="w-4 h-4 mr-2" />
                    Войти
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
