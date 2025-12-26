import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronDown, Menu, X, User, MapPin, Heart, LogOut, Building2, 
  Home, Search, Users, Phone, FileText, Shield, BookOpen
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Chip } from "./ui/chip";
import LiveGridLogo from "./LiveGridLogo";
import AuthModal from "./AuthModal";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
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
  const { favorites } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(
    localStorage.getItem("selectedRegion") || "Белгород"
  );

  const favoritesCount = favorites.length;

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on ESC key and prevent body scroll
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const mainNavLinks = [
    { path: "/catalog", label: "Каталог", icon: Search },
    { path: "/residential-complex", label: "Жилые комплексы", icon: Building2 },
    { path: "/developers", label: "Застройщики", icon: Users },
    { path: "/contacts", label: "Контакты", icon: Phone },
  ];

  const mobileNavLinks = [
    { path: "/", label: "Главная", icon: Home },
    { path: "/catalog", label: "Каталог недвижимости", icon: Search },
    { path: "/residential-complex", label: "Жилые комплексы", icon: Building2 },
    { path: "/developers", label: "Застройщики", icon: Users },
    { path: "/favorites", label: "Избранное", icon: Heart, badge: favoritesCount },
    { path: "/about", label: "О компании", icon: BookOpen },
    { path: "/contacts", label: "Контакты", icon: Phone },
  ];

  const mobileFooterLinks = [
    { path: "/privacy", label: "Политика конфиденциальности", icon: Shield },
    { path: "/terms", label: "Условия использования", icon: FileText },
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
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <LiveGridLogo size="md" />
            </Link>

            {/* Region Selector - Desktop */}
            <div className="hidden lg:flex items-center ml-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    leftIcon={<MapPin className="w-4 h-4 text-primary" />}
                    rightIcon={<ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    className="text-foreground"
                  >
                    {selectedRegion}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 bg-card border-border">
                  {regions.map((region) => (
                    <DropdownMenuItem
                      key={region.id}
                      onClick={() => handleRegionChange(region.name)}
                      className={selectedRegion === region.name ? "bg-primary/10 text-primary" : ""}
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      {region.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/region-select" className="cursor-pointer">
                      Все регионы
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden lg:flex items-center gap-1 ml-auto mr-6">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-normal rounded-lg ${
                    isActive(link.path)
                      ? "text-primary bg-primary/5"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
              <Link
                to="/about"
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-normal rounded-lg ${
                  isActive("/about")
                    ? "text-primary bg-primary/5"
                    : "text-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                О нас
              </Link>
            </nav>

            {/* Actions - Desktop */}
            <div className="hidden md:flex items-center gap-3">
              {/* Favorites with Badge */}
              <Link to="/favorites" className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className={`w-3 h-3 ${favoritesCount > 0 ? "fill-primary text-primary" : ""}`} />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold px-1">
                      {favoritesCount > 99 ? "99+" : favoritesCount}
                    </span>
                  )}
                </Button>
              </Link>

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-2 h-2 text-primary" />
                        </div>
                      }
                      rightIcon={<ChevronDown className="w-3 h-3" />}
                    >
                      <span className="max-w-[100px] truncate">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-52 bg-card border-border">
                    <div className="px-3 py-2 border-b border-border">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <User className="w-4 h-4 mr-2" />
                        Личный кабинет
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/agent" className="cursor-pointer">
                        <Building2 className="w-4 h-4 mr-2" />
                        Кабинет агента
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/favorites" className="cursor-pointer">
                        <Heart className="w-4 h-4 mr-2" />
                        Избранное
                        {favoritesCount > 0 && (
                          <Badge variant="info" size="sm" className="ml-auto">
                            {favoritesCount}
                          </Badge>
                        )}
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
                <Button 
                  variant="primary" 
                  size="sm" 
                  leftIcon={<User className="w-3 h-3" />}
                  onClick={() => setAuthModalOpen(true)}
                >
                  Войти
                </Button>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-1">
              {/* Favorites with Badge - Mobile */}
              <Link to="/favorites" className="relative">
                <Button variant="ghost" size="icon">
                  <Heart className={`w-5 h-5 ${favoritesCount > 0 ? "fill-primary text-primary" : ""}`} />
                  {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-[10px] font-semibold px-1">
                      {favoritesCount > 99 ? "99+" : favoritesCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Hamburger */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Открыть меню"
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16 md:h-[72px]" />

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-foreground/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-[85%] max-w-[320px] bg-card border-l border-border shadow-2xl transform transition-transform duration-300 ease-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </>
            ) : (
              <LiveGridLogo size="sm" />
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Закрыть меню"
            className="hover:bg-muted"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-[calc(100%-68px)] overflow-y-auto">
          {/* Region Selector - Mobile */}
          <div className="p-4 border-b border-border bg-muted/20">
            <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-semibold">
              Ваш регион
            </p>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Chip
                  key={region.id}
                  label={region.name}
                  active={selectedRegion === region.name}
                  onClick={() => handleRegionChange(region.name)}
                  size="sm"
                  icon={<MapPin className="w-3 h-3" />}
                />
              ))}
            </div>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 py-2">
            <p className="px-4 py-2 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Навигация
            </p>
            {mobileNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3.5 text-[15px] font-medium transition-colors duration-normal ${
                  isActive(link.path)
                    ? "text-primary bg-primary/5 border-r-2 border-primary"
                    : "text-foreground hover:bg-muted active:bg-muted"
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive(link.path) ? "text-primary" : "text-muted-foreground"}`} />
                {link.label}
                {link.badge && link.badge > 0 && (
                  <Badge variant="info" size="sm" className="ml-auto">
                    {link.badge}
                  </Badge>
                )}
              </Link>
            ))}
          </nav>

          {/* Footer Links */}
          <div className="border-t border-border py-2">
            <p className="px-4 py-2 text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              Документы
            </p>
            {mobileFooterLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="p-4 border-t border-border bg-muted/20 space-y-3">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="block">
                  <Button variant="secondary" fullWidth leftIcon={<User className="w-4 h-4" />}>
                    Личный кабинет
                  </Button>
                </Link>
                <Link to="/agent" className="block">
                  <Button variant="ghost" fullWidth leftIcon={<Building2 className="w-4 h-4" />}>
                    Кабинет агента
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  fullWidth
                  leftIcon={<LogOut className="w-4 h-4" />}
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <Button 
                variant="primary" 
                fullWidth 
                leftIcon={<User className="w-4 h-4" />}
                onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }}
                className="h-12 text-base"
              >
                Войти в аккаунт
              </Button>
            )}
          </div>
        </div>
      </aside>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </>
  );
};

export default Header;
