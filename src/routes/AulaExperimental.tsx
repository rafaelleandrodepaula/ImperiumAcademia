import { CalendarCheck, Clock, MapPin, CheckCircle, ChevronRight, Activity } from 'lucide-react';
import './AulaExperimental.css';

const WHATSAPP_NUMBER = '5593991057986';

const AulaExperimental = () => {
  const whatsappMessage = 'Olá! Quero transformar meu corpo e agendar minha aula experimental gratuita!';
  const wppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="page-content experimental-page">
      {/* Hero Section */}
      <section className="experimental-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-container">
          <div className="hero-content animate-fade-in">
            <div className="premium-badge">
              <span className="pulse-dot"></span>
              Vagas Limitadas • 100% Gratuito
            </div>
            
            <h1 className="hero-title">
              DESCUBRA A SUA<br/>
              <span className="text-gradient">MELHOR VERSÃO</span>
            </h1>
            
            <p className="hero-subtitle">
              Sinta a energia da Imperium. Treine em equipamentos de ponta com profissionais de elite, sem custo na sua primeira aula.
            </p>
            
            <div className="hero-cta-group">
              <a href={wppLink} target="_blank" rel="noreferrer" className="btn-glow">
                <span>AGENDAR AGORA</span>
                <ChevronRight size={20} className="icon-arrow" />
              </a>
              <div className="hero-features">
                <div className="feature-item">
                  <CheckCircle size={16} className="feature-icon" />
                  <span>Sem compromisso</span>
                </div>
                <div className="feature-item">
                  <CheckCircle size={16} className="feature-icon" />
                  <span>Suporte total</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hero-image-wrapper animate-fade-in" style={{ animationDelay: '0.2s' }}>
             <div className="glass-card floating-card">
               <div className="card-header">
                 <Activity size={28} className="accent-color" />
                 <h3>Passe Livre</h3>
               </div>
               <div className="card-body">
                 <p className="card-label">Válido para</p>
                 <p className="card-value">1 Dia de Treino</p>
                 <div className="divider"></div>
                 <ul className="card-list">
                   <li><CheckCircle size={16} className="accent-color"/> Todos os equipamentos liberados</li>
                   <li><CheckCircle size={16} className="accent-color"/> Acompanhamento de instrutor</li>
                   <li><CheckCircle size={16} className="accent-color"/> Acesso aos vestiários</li>
                 </ul>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Como <span className="text-gradient">Funciona?</span></h2>
            <p className="section-desc">Seu primeiro passo em direção aos seus resultados, de forma simples e rápida.</p>
          </div>

          <div className="timeline-grid">
            {/* Step 1 */}
            <div className="timeline-step">
              <div className="step-icon-wrapper">
                <CalendarCheck size={32} className="step-icon" />
                <div className="step-glow"></div>
              </div>
              <h3 className="step-title">Agendamento</h3>
              <p className="step-desc">Clique no botão e fale com nossa equipe via WhatsApp para escolher o melhor dia e horário.</p>
            </div>

            {/* Step 2 */}
            <div className="timeline-step mt-lg">
              <div className="step-icon-wrapper">
                <Clock size={32} className="step-icon" />
                <div className="step-glow"></div>
              </div>
              <h3 className="step-title">Recepção</h3>
              <p className="step-desc">Chegue 10 minutos antes. Nossa equipe estará pronta para te receber e apresentar a academia.</p>
            </div>

            {/* Step 3 */}
            <div className="timeline-step">
              <div className="step-icon-wrapper">
                <MapPin size={32} className="step-icon" />
                <div className="step-glow"></div>
              </div>
              <h3 className="step-title">O Treino</h3>
              <p className="step-desc">Aproveite sua sessão com foco total. Nossos professores montarão um treino adaptado a você.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AulaExperimental;
