import { MessageCircle, MapPin, Clock } from 'lucide-react';
import './Contato.css';

const InstagramIcon = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const WHATSAPP_NUMBER = '5593991057986';

const Contato = () => {
  const whatsappMessage = 'Olá, vim pelo site e gostaria de tirar uma dúvida.';
  const wppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="page-content ct-page">

      {/* Hero */}
      <section className="ct-hero">
        <div className="ct-hero-overlay"></div>
        <div className="container ct-hero-content">
          <div className="ct-badge">
            <span className="ct-pulse-dot"></span>
            Estamos aqui para você
          </div>
          <h1 className="ct-hero-title">
            FALE COM A<br />
            <span className="ct-text-gradient">Imperium</span>
          </h1>
          <p className="ct-hero-subtitle">
            Tire dúvidas, agende seu treino ou venha nos visitar. Nossa equipe está pronta para te receber.
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="ct-cards-section">
        <div className="container">
          <div className="ct-grid">

            {/* Horários */}
            <div className="ct-card">
              <div className="ct-step-icon-wrapper">
                <Clock size={30} className="ct-step-icon" />
                <div className="ct-step-glow"></div>
              </div>
              <h2 className="ct-card-title">Horário de Funcionamento</h2>
              <ul className="ct-horarios-list">
                <li>
                  <span className="ct-dia">Segunda a Sexta</span>
                  <span className="ct-hora">05h às 22h</span>
                </li>
                <li>
                  <span className="ct-dia">Sábado</span>
                  <span className="ct-hora">08h às 14h</span>
                </li>
                <li>
                  <span className="ct-dia">Domingo</span>
                  <span className="ct-hora">08h às 12h</span>
                </li>
              </ul>
            </div>

            {/* WhatsApp & Redes */}
            <div className="ct-card">
              <div className="ct-step-icon-wrapper">
                <MessageCircle size={30} className="ct-step-icon" />
                <div className="ct-step-glow"></div>
              </div>
              <h2 className="ct-card-title">Atendimento Online</h2>
              <p className="ct-card-desc">
                Tire dúvidas sobre planos, modalidades e agende seu treino experimental direto pelo nosso WhatsApp.
              </p>
              <div className="ct-actions">
                <a href={wppLink} target="_blank" rel="noreferrer" className="ct-btn-wpp">
                  <MessageCircle size={18} />
                  (93) 99105-7986
                </a>
                <a href="https://www.instagram.com/ct_imperium_academia/" target="_blank" rel="noreferrer" className="ct-btn-ig">
                  <InstagramIcon size={18} />
                  @ct_imperium_academia
                </a>
              </div>
            </div>

            {/* Endereço */}
            <div className="ct-card">
              <div className="ct-step-icon-wrapper">
                <MapPin size={30} className="ct-step-icon" />
                <div className="ct-step-glow"></div>
              </div>
              <h2 className="ct-card-title">Nossa Unidade</h2>
              <p className="ct-card-desc">
                R. Vicente Alves da Costa, Riachinho<br />
                Várzea Alegre - CE<br />
                CEP: 63540-000
              </p>
              <p className="ct-hint">
                *Ambiente climatizado e com estacionamento acessível nas proximidades.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contato;
