import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Clock, Shield, FileText } from "lucide-react";
import LiveGridLogo from "./LiveGridLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-blue border-t border-border mt-0">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Company Info */}
          <div className="lg:col-span-2">
            <LiveGridLogo size="lg" variant="dark" className="mb-4" />
            <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-sm mb-4">
              Современная платформа для поиска недвижимости в Белгороде и регионах России. Находите идеальные квартиры, дома и коммерческую недвижимость.
            </p>
            <div className="text-xs text-secondary-foreground/50 space-y-1">
              <p>ООО «ЛивГрид»</p>
              <p>ОГРН: 1234567890123</p>
              <p>ИНН: 1234567890</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-secondary-foreground mb-4">Каталог</h4>
            <ul className="space-y-3">
              {[
                { to: "/catalog", label: "Все объекты" },
                { to: "/residential-complex", label: "Жилые комплексы" },
                { to: "/developers", label: "Застройщики" },
                { to: "/catalog?type=newbuilding", label: "Новостройки" },
                { to: "/catalog?type=secondary", label: "Вторичное жильё" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h4 className="font-display font-semibold text-secondary-foreground mb-4">Документы</h4>
            <ul className="space-y-3">
              {[
                { to: "/privacy", label: "Политика конфиденциальности" },
                { to: "/terms", label: "Пользовательское соглашение" },
                { to: "/consent", label: "Согласие на обработку ПД" },
                { to: "/about", label: "О компании" },
                { to: "/contacts", label: "Контакты" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-secondary-foreground mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+79000000000"
                  className="flex items-center gap-2.5 text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  +7 (900) 000-00-00
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@livegrid.ru"
                  className="flex items-center gap-2.5 text-secondary-foreground/60 hover:text-primary transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  info@livegrid.ru
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-secondary-foreground/60 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>308000, г. Белгород,<br />ул. Примерная, д. 1, оф. 101</span>
              </li>
              <li className="flex items-center gap-2.5 text-secondary-foreground/60 text-sm">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                Пн-Пт: 9:00 - 18:00
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-secondary-foreground/10 mt-10 pt-6">
          <div className="flex items-start gap-3 p-4 bg-secondary-foreground/5 rounded-xl mb-6">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-secondary-foreground/60 leading-relaxed">
              Информация на сайте носит справочный характер и не является публичной офертой, определяемой положениями ст. 437 ГК РФ. 
              Для получения подробной информации обращайтесь к менеджерам компании. Изображения объектов могут отличаться от реальных. 
              Цены актуальны на момент публикации.
            </p>
          </div>

          <div className="flex items-start gap-3 p-4 bg-secondary-foreground/5 rounded-xl mb-6">
            <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-xs text-secondary-foreground/60 leading-relaxed">
              Обработка персональных данных осуществляется в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ «О персональных данных». 
              Отправляя свои данные через формы на сайте, вы даёте согласие на их обработку в соответствии с{" "}
              <Link to="/privacy" className="text-primary hover:underline">Политикой конфиденциальности</Link>.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-secondary-foreground/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-secondary-foreground/50">
              © {currentYear} ООО «ЛивГрид». Все права защищены.
            </p>
            <p className="text-xs text-secondary-foreground/40 mt-1">
              Любое использование материалов сайта возможно только с письменного разрешения правообладателя.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <Link to="/privacy" className="text-xs text-secondary-foreground/50 hover:text-primary transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-xs text-secondary-foreground/50 hover:text-primary transition-colors">
              Условия использования
            </Link>
            <Link to="/sitemap" className="text-xs text-secondary-foreground/50 hover:text-primary transition-colors">
              Карта сайта
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
