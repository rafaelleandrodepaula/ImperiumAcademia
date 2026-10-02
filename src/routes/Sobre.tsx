import { Wind, Calendar, Clock, MapPin, Users, Dumbbell, Star } from 'lucide-react';
import './Sobre.css';

const Sobre = () => {
  return (
    <div className="page-content sobre-page">

      {/* Hero Section */}
      <section className="sobre-hero">
        <div className="sobre-hero-overlay"></div>
        <div className="container sobre-hero-content">
          <div className="sobre-badge">
            <span className="sobre-pulse-dot"></span>
            Imperium Academia
          </div>
          <h1 className="sobre-hero-title">
            CONHEÇA A NOSSA<br />
            <span className="sobre-text-gradient">ESTRUTURA</span>
          </h1>
          <p className="sobre-hero-subtitle">
            Um ambiente pensado para extrair o melhor de você. Equipamentos de ponta, profissionais dedicados e um espaço que inspira.
          </p>
        </div>
      </section>

      {/* Diferenciais Section */}
      <section className="sobre-diferenciais-section">
        <div className="container">
          <div className="sobre-section-header text-center">
            <h2 className="sobre-section-title">Nosso <span className="sobre-text-gradient">Diferencial</span></h2>
            <p className="sobre-section-desc">Tudo preparado para a sua melhor experiência.</p>
          </div>

          <div className="sobre-diferenciais-grid">

            <div className="sobre-timeline-step">
              <div className="sobre-step-icon-wrapper">
                <Wind size={32} className="sobre-step-icon" />
                <div className="sobre-step-glow"></div>
              </div>
              <h3 className="sobre-step-title">Climatização Total</h3>
              <p className="sobre-step-desc">Treine com conforto em um ambiente 100% climatizado, independente do calor lá fora.</p>
            </div>

            <div className="sobre-timeline-step">
              <div className="sobre-step-icon-wrapper">
                <Calendar size={32} className="sobre-step-icon" />
                <div className="sobre-step-glow"></div>
              </div>
              <h3 className="sobre-step-title">Todos os Dias</h3>
              <p className="sobre-step-desc">Aberta de domingo a domingo. Seu treino não para, e nós também não.</p>
            </div>

            <div className="sobre-timeline-step">
              <div className="sobre-step-icon-wrapper">
                <Clock size={32} className="sobre-step-icon" />
                <div className="sobre-step-glow"></div>
              </div>
              <h3 className="sobre-step-title">Horário Estendido</h3>
              <p className="sobre-step-desc">Treine até as 22h, adaptando-se perfeitamente à sua rotina e ao seu ritmo de vida.</p>
            </div>

            <div className="sobre-timeline-step">
              <div className="sobre-step-icon-wrapper">
                <Users size={32} className="sobre-step-icon" />
                <div className="sobre-step-glow"></div>
              </div>
              <h3 className="sobre-step-title">Equipe Especializada</h3>
              <p className="sobre-step-desc">Professores qualificados prontos para montar o treino ideal para seus objetivos.</p>
            </div>

            <div className="sobre-timeline-step">
              <div className="sobre-step-icon-wrapper">
                <Dumbbell size={32} className="sobre-step-icon" />
                <div className="sobre-step-glow"></div>
              </div>
              <h3 className="sobre-step-title">Equipamentos de Ponta</h3>
              <p className="sobre-step-desc">Aparelhos modernos e completos para musculação, cardio e muito mais.</p>
            </div>

            <div className="sobre-timeline-step">
              <div className="sobre-step-icon-wrapper">
                <Star size={32} className="sobre-step-icon" />
                <div className="sobre-step-glow"></div>
              </div>
              <h3 className="sobre-step-title">Ambiente Motivador</h3>
              <p className="sobre-step-desc">Uma comunidade unida que te empurra a ser melhor a cada treino, todos os dias.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Localização Section */}
      <section className="sobre-localizacao-section">
        <div className="container">
          <div className="sobre-section-header text-center">
            <h2 className="sobre-section-title">Onde <span className="sobre-text-gradient">Estamos</span></h2>
            <p className="sobre-section-desc">Venha nos visitar. Estamos esperando por você.</p>
          </div>

          <div className="sobre-localizacao-content">
            <div className="sobre-loc-card">
              <div className="sobre-step-icon-wrapper">
                <MapPin size={28} className="sobre-step-icon" />
                <div className="sobre-step-glow"></div>
              </div>
              <div>
                <h4>Academia Imperium</h4>
                <p>R. Vicente Alves da Costa, Riachinho</p>
                <p>Várzea Alegre - CE</p>
                <p>CEP: 63540-000</p>
              </div>
            </div>

            <div className="sobre-map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11933.208157790387!2d-39.29415750805177!3d-6.786523099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7a28beea7021eb3%3A0xf5b5fb62eb5ea14b!2sR.%20Ant%C3%B4nio%20Alves%20de%20Lima%2C%20368%20-%20Juremal%2C%20V%C3%A1rzea%20Alegre%20-%20CE%2C%2063540-000!5e0!3m2!1spt-BR!2sbr!4v1705600000000!5m2!1spt-BR!2sbr"
                width="100%"
                height="380"
                style={{ border: 0, borderRadius: '16px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de Localização Imperium"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Sobre;
