import { Link } from "react-router-dom";
import { Mail, MapPin, Phone, Clock, Shield, FileText } from "lucide-react";
import LiveGridLogo from "./LiveGridLogo";
import { FOOTER_CATALOG_LINKS, FOOTER_DOCUMENT_LINKS, FOOTER_BOTTOM_LINKS } from "@/constants/navigation";
import { COMPANY_INFO, CONTACT_INFO, LEGAL_DISCLAIMERS } from "@/constants/company";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-blue border-t border-white/10 mt-0 text-white">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand & Company Info */}
          <div className="lg:col-span-2">
            <LiveGridLogo size="lg" variant="dark" className="mb-4" />
            <p className="text-white/80 text-sm leading-relaxed max-w-sm mb-4 break-words">
              {COMPANY_INFO.description}
            </p>
            <div className="text-xs text-white/70 space-y-1">
              <p>{COMPANY_INFO.name}</p>
              <p>ОГРН: {COMPANY_INFO.ogrn}</p>
              <p>ИНН: {COMPANY_INFO.inn}</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Каталог</h4>
            <ul className="space-y-3">
              {FOOTER_CATALOG_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Документы</h4>
            <ul className="space-y-3">
              {FOOTER_DOCUMENT_LINKS.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/70 hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Контакты</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="flex items-center gap-2.5 text-white/70 hover:text-primary transition-colors text-sm"
                >
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{CONTACT_INFO.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.emailHref}
                  className="flex items-center gap-2.5 text-white/70 hover:text-primary transition-colors text-sm"
                >
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="break-all">{CONTACT_INFO.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-white/70 text-sm">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>
                  {CONTACT_INFO.address.lines[0]}
                  <br />
                  {CONTACT_INFO.address.lines[1]}
                </span>
              </li>
              <li className="flex items-center gap-2.5 text-white/70 text-sm">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>{CONTACT_INFO.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 mt-10 pt-6">
          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl mb-6">
            <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/80 leading-relaxed break-words">
                {LEGAL_DISCLAIMERS.offer}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white/5 rounded-xl mb-6">
            <FileText className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/80 leading-relaxed break-words">
                {LEGAL_DISCLAIMERS.privacy}{" "}
                <Link to="/privacy" className="text-primary hover:underline inline font-medium">
                  Политикой конфиденциальности
                </Link>.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left flex-1 min-w-0">
              <p className="text-sm text-white/70 break-words">
                © {currentYear} {COMPANY_INFO.name}. Все права защищены.
              </p>
              <p className="text-xs text-white/60 mt-1 break-words">
                {LEGAL_DISCLAIMERS.copyright}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 flex-shrink-0">
              {FOOTER_BOTTOM_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs text-white/70 hover:text-primary transition-colors whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
