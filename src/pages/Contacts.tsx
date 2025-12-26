import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contacts = () => {
  const contactInfo = [
    { icon: Phone, title: "Телефон", lines: ["+7 (900) 000-00-00", "+7 (900) 000-00-01"] },
    { icon: Mail, title: "Email", lines: ["info@livegrid.ru", "sales@livegrid.ru"] },
    { icon: MapPin, title: "Адрес", lines: ["г. Белгород, ул. Победы, 89", 'БЦ "Премиум", офис 301'] },
    { icon: Clock, title: "Режим работы", lines: ["Пн-Пт: 09:00 - 20:00", "Сб-Вс: 10:00 - 18:00"] },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">Контакты</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg-card p-6 md:p-8">
            <h2 className="text-xl font-display font-semibold mb-6">Свяжитесь с нами</h2>
            <form className="space-y-4">
              <Input placeholder="Ваше имя" className="lg-input" />
              <Input placeholder="+7 (___) ___-__-__" className="lg-input" />
              <Input type="email" placeholder="your@email.com" className="lg-input" />
              <Textarea placeholder="Сообщение..." className="lg-input min-h-32" />
              <Button className="w-full lg-btn-primary">Отправить</Button>
            </form>
          </div>

          <div className="space-y-4">
            {contactInfo.map((item, index) => (
              <div key={index} className="lg-card p-5 flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  {item.lines.map((line, i) => (
                    <p key={i} className="text-muted-foreground text-sm">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 lg-card p-6">
          <h2 className="text-xl font-display font-semibold mb-4">Мы на карте</h2>
          <div className="h-80 bg-light-bg rounded-xl flex items-center justify-center">
            <MapPin className="w-12 h-12 text-primary/30" />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contacts;
