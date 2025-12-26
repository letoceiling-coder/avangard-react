import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import PropertyCard from "@/components/PropertyCard";
import { toast } from "sonner";
import { 
  User, Heart, Clock, FileText, Settings, LogOut, 
  ChevronRight, Trash2, Mail, Phone, Camera
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, updateProfile, viewHistory, clearViewHistory, applications } = useAuth();
  const { favorites, clearFavorites } = useFavorites();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || "");
  const [editPhone, setEditPhone] = useState(user?.phone || "");

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <User className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground mb-3">
              Войдите в аккаунт
            </h1>
            <p className="text-muted-foreground mb-6">
              Чтобы получить доступ к личному кабинету, избранному и истории просмотров
            </p>
            <Link to="/auth">
              <Button className="lg-btn-primary">
                Войти или зарегистрироваться
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    toast.success("Вы вышли из аккаунта");
    navigate("/");
  };

  const handleSaveProfile = () => {
    updateProfile({ name: editName, phone: editPhone });
    setIsEditing(false);
    toast.success("Профиль обновлён");
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return { label: "На рассмотрении", color: "bg-warning/10 text-warning" };
      case "viewed": return { label: "Просмотрено", color: "bg-primary/10 text-primary" };
      case "accepted": return { label: "Принята", color: "bg-success/10 text-success" };
      case "rejected": return { label: "Отклонена", color: "bg-destructive/10 text-destructive" };
      default: return { label: status, color: "bg-muted text-muted-foreground" };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 shadow-card sticky top-24">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <User className="w-10 h-10 text-primary" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted transition-colors">
                    <Camera className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                <h2 className="font-display font-semibold text-foreground">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-lg font-bold text-foreground">{favorites.length}</p>
                  <p className="text-xs text-muted-foreground">Избранное</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-lg font-bold text-foreground">{viewHistory.length}</p>
                  <p className="text-xs text-muted-foreground">Просмотры</p>
                </div>
                <div className="p-3 rounded-xl bg-muted/50">
                  <p className="text-lg font-bold text-foreground">{applications.length}</p>
                  <p className="text-xs text-muted-foreground">Заявки</p>
                </div>
              </div>

              {/* Actions */}
              <Button
                variant="outline"
                className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/5"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" />
                Выйти из аккаунта
              </Button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="favorites" className="space-y-6">
              <TabsList className="bg-card border border-border p-1 rounded-xl w-full justify-start overflow-x-auto">
                <TabsTrigger value="favorites" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                  <Heart className="w-4 h-4" />
                  Избранное
                </TabsTrigger>
                <TabsTrigger value="history" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                  <Clock className="w-4 h-4" />
                  История
                </TabsTrigger>
                <TabsTrigger value="applications" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                  <FileText className="w-4 h-4" />
                  Заявки
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg">
                  <Settings className="w-4 h-4" />
                  Настройки
                </TabsTrigger>
              </TabsList>

              {/* Favorites Tab */}
              <TabsContent value="favorites" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-semibold">Избранное</h2>
                  {favorites.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => { clearFavorites(); toast.success("Избранное очищено"); }}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Очистить
                    </Button>
                  )}
                </div>

                {favorites.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {favorites.map((property) => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card rounded-2xl border border-border">
                    <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Нет сохранённых объектов</p>
                    <Link to="/catalog">
                      <Button variant="outline" className="lg-btn-secondary">
                        Перейти в каталог
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-display font-semibold">История просмотров</h2>
                  {viewHistory.length > 0 && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => { clearViewHistory(); toast.success("История очищена"); }}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Очистить
                    </Button>
                  )}
                </div>

                {viewHistory.length > 0 ? (
                  <div className="space-y-3">
                    {viewHistory.map((item) => (
                      <Link 
                        key={item.id} 
                        to={`/property/${item.id}`}
                        className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary/30 transition-colors group"
                      >
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-20 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{item.address}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-foreground">
                            {item.price.toLocaleString("ru-RU")} ₽
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(item.viewedAt)}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card rounded-2xl border border-border">
                    <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">История просмотров пуста</p>
                    <Link to="/catalog">
                      <Button variant="outline" className="lg-btn-secondary">
                        Начать просмотр
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              {/* Applications Tab */}
              <TabsContent value="applications" className="space-y-4">
                <h2 className="text-xl font-display font-semibold">Мои заявки</h2>

                {applications.length > 0 ? (
                  <div className="space-y-3">
                    {applications.map((app) => {
                      const status = getStatusLabel(app.status);
                      return (
                        <div 
                          key={app.id}
                          className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border"
                        >
                          <img 
                            src={app.propertyImage} 
                            alt={app.propertyTitle} 
                            className="w-20 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground truncate">
                              {app.propertyTitle}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Заявка от {formatDate(app.createdAt)}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
                              {status.label}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card rounded-2xl border border-border">
                    <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">У вас пока нет заявок</p>
                    <Link to="/catalog">
                      <Button variant="outline" className="lg-btn-secondary">
                        Найти недвижимость
                      </Button>
                    </Link>
                  </div>
                )}
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6">
                <h2 className="text-xl font-display font-semibold">Настройки профиля</h2>

                <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground">Имя</Label>
                      <div className="relative mt-1.5">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          disabled={!isEditing}
                          className="pl-10 h-12 lg-input"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-foreground">Телефон</Label>
                      <div className="relative mt-1.5">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          value={editPhone}
                          onChange={(e) => setEditPhone(e.target.value)}
                          disabled={!isEditing}
                          placeholder="+7 (___) ___-__-__"
                          className="pl-10 h-12 lg-input"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-foreground">Email</Label>
                    <div className="relative mt-1.5">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        value={user?.email}
                        disabled
                        className="pl-10 h-12 lg-input bg-muted"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Email нельзя изменить</p>
                  </div>

                  <div className="flex gap-3">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSaveProfile} className="lg-btn-primary">
                          Сохранить
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => { setIsEditing(false); setEditName(user?.name || ""); setEditPhone(user?.phone || ""); }}
                        >
                          Отмена
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setIsEditing(true)} variant="outline">
                        Редактировать
                      </Button>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
