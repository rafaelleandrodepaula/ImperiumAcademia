import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import novaLogo from '../assets/nova-logo.png';
import './Footer.css';

const InstagramIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const WHATSAPP_NUMBER = '5593991057986';

const Footer = () => {
  const whatsappMessage = 'Olá, vim pelo site e quero agendar minha primeira aula grátis.';
  const wppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  const quickLinks = [
    { path: '/modalidades', label: 'Modalidades' },
    { path: '/seja-aluno', label: 'Seja Aluno' },
    { path: '/aula-experimental', label: 'Aula Experimental' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/contato', label: 'Contato' },
  ];

  return (
      <footer className="footer">
        <div className="container footer-container">

          {/* Brand & Social */}
          <div className="footer-section brand-section">
            <Link to="/" className="footer-logo">
              <img src={novaLogo} alt="Imperium Academia" className="footer-logo-img" />
              <span className="logo-text-footer">
                Imperium <span className="logo-text-footer-sub">Academia</span>
              </span>
            </Link>
            <p className="footer-slogan">Um dia a mais, um passo a frente.</p>
            <div className="social-links">
              <a href="https://www.instagram.com/ct_imperium_academia/" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
                <InstagramIcon size={20} />
              </a>
              <a href={wppLink} target="_blank" rel="noreferrer" className="social-btn" aria-label="WhatsApp">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Links rápidos</h3>
            <ul className="footer-links-list">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contato</h3>
            <ul className="footer-info-list">
              <li>
                <MapPin size={18} className="info-icon" />
                <span>R. Vicente Alves da Costa, Riachinho, Várzea Alegre - CE, 63540-000</span>
              </li>
              <li>
                <Phone size={18} className="info-icon" />
                <span>(93) 99105-7986</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="footer-section">
            <h3>Horários</h3>
            <ul className="footer-info-list">
              <li>
                <Clock size={18} className="info-icon" />
                <span><strong>Seg - Sex:</strong> 05h às 22h</span>
              </li>
              <li>
                <Clock size={18} className="info-icon" />
                <span><strong>Sábado:</strong> 08h às 14h</span>
              </li>
              <li>
                <Clock size={18} className="info-icon" />
                <span><strong>Domingo:</strong> 08h às 12h</span>
              </li>
            </ul>
          </div>

        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Imperium Academia. Todos os direitos reservados.</p>
        </div>
      </footer>
  );
};

export default Footer;
