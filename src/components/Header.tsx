import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import novaLogo from '../assets/nova-logo.png';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Detecta scroll para alternar entre transparente e escuro
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    // Checa o estado inicial ao trocar de página
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Fecha menu mobile ao trocar de rota
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Início' },
    { path: '/modalidades', label: 'Modalidades' },
    { path: '/aula-experimental', label: 'Aula Experimental' },
    { path: '/seja-aluno', label: 'Seja Aluno' },
    { path: '/sobre', label: 'Sobre' },
    { path: '/contato', label: 'Contato' },
    { path: '/loja', label: 'Loja Imperium' },
  ];

  // A loja tem fundo claro: o header fica sempre escuro lá, senão o menu branco some
  const headerEscuro = scrolled || location.pathname === '/loja';

  return (
    <header className={`header ${headerEscuro ? 'header--scrolled' : 'header--top'}`}>
      <div className="container header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src={novaLogo} alt="Imperium Academia" className="logo-img" />
          <span className="logo-text">
            Imperium <span className="logo-text-sub">Academia</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
