import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Zap, ArrowRight, Users, Clock, CalendarCheck, Wind, Award, Gift, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop',
    title: 'O primeiro passo para a sua melhor versão',
    subtitle: 'Conheça. Experimente. Sinta a diferença.',
    buttonText: 'Treino experimental gratuito',
    buttonLink: '/aula-experimental'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop',
    title: 'Um dia a mais, um passo a frente',
    subtitle: 'Imperium — Aberta todos os dias para você.',
    buttonText: 'Seja Aluno',
    buttonLink: '/seja-aluno'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2070&auto=format&fit=crop',
    title: 'Climatização total & horário estendido',
    subtitle: 'Treine com o conforto que você merece, até as 22h.',
    buttonText: 'Treino experimental gratuito',
    buttonLink: '/aula-experimental'
  }
];

const stats = [
  { icon: <Users size={18} />, value: '500+', label: 'Alunos Ativos' },
  { icon: <Clock size={18} />, value: '17h', label: 'Por Dia Aberta' },
  { icon: <CalendarCheck size={18} />, value: '7 dias', label: 'Por Semana' },
  { icon: <Zap size={18} />, value: '100%', label: 'Climatizada' },
];

const diferenciais = [
  { icon: <Wind size={28} />, title: 'Climatização Total', desc: 'Ambiente 100% climatizado. Treine com conforto em qualquer estação do ano.' },
  { icon: <Clock size={28} />, title: 'Aberta 7 Dias', desc: 'Das 5h às 22h, nos seus dias bons e nos seus dias difíceis. Sempre aberta.' },
  { icon: <Award size={28} />, title: 'Professores Especializados', desc: 'Equipe qualificada que monta sua ficha e acompanha sua evolução de perto.' },
  { icon: <Gift size={28} />, title: 'Treino Experimental Grátis', desc: 'Venha conhecer a Imperium sem compromisso. Primeira aula 100% gratuita.' },
];

const planos = [
  {
    nome: 'Mensal',
    preco: '89,90',
    periodo: '/mês',
    detalhe: 'Sem fidelidade · cancele quando quiser',
    destaque: false,
    beneficios: ['Musculação completa', 'Aulas coletivas inclusas', 'Avaliação física', 'Professores especializados', 'Ambiente climatizado'],
  },
  {
    nome: 'Trimestral',
    preco: '79,90',
    periodo: '/mês',
    detalhe: '3 meses · melhor custo-benefício',
    destaque: true,
    beneficios: ['Musculação completa', 'Aulas coletivas inclusas', 'Avaliação física', 'Professores especializados', 'Ambiente climatizado'],
  },
  {
    nome: 'Anual',
    preco: '69,90',
    periodo: '/mês',
    detalhe: '12 meses · máximo desconto',
    destaque: false,
    beneficios: ['Musculação completa', 'Aulas coletivas inclusas', '2 Avaliações físicas', 'Camiseta exclusiva', 'Ambiente climatizado'],
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const planosRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  useEffect(() => {
    const interval = setInterval(nextSlide, 5500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('hm-visible');
        });
      },
      { threshold: 0.2 }
    );
    const cards = document.querySelectorAll('.hm-plano-card');
    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);

  return (
    <div className="hm-page">

      {/* Hero Carousel */}
      <section className="hm-hero-carousel">
        <div className="hm-carousel-container">
          {slides.map((slide, index) => (
            <div key={slide.id} className={`hm-carousel-slide ${index === currentSlide ? 'active' : ''}`}>
              <div className="hm-slide-bg" style={{ backgroundImage: `url(${slide.image})` }}>
                <div className="hm-slide-overlay"></div>
              </div>
              <div className="hm-slide-content">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <Link to={slide.buttonLink} className="hm-btn-hero">
                  {slide.buttonText} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
          <button className="hm-carousel-btn prev" onClick={prevSlide}><ChevronLeft size={24} /></button>
          <button className="hm-carousel-btn next" onClick={nextSlide}><ChevronRight size={24} /></button>
          <div className="hm-carousel-dots">
            {slides.map((_, index) => (
              <button key={index} className={`hm-dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="hm-stats-bar">
        {stats.map((stat, i) => (
          <div key={i} className="hm-stat-item">
            <div className="hm-stat-icon">{stat.icon}</div>
            <div className="hm-stat-text">
              <span className="hm-stat-value">{stat.value}</span>
              <span className="hm-stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Diferenciais */}
      <section className="hm-diferenciais-section">
        <div className="container">
          <div className="hm-section-header text-center">
            <h2 className="hm-section-title">Por que a <span className="hm-text-gradient">Imperium?</span></h2>
            <p className="hm-section-desc">Tudo que você precisa em um só lugar.</p>
          </div>
          <div className="hm-diferenciais-grid">
            {diferenciais.map((item, i) => (
              <div key={i} className="hm-dif-card">
                <div className="hm-dif-icon-wrapper">
                  <span className="hm-dif-icon">{item.icon}</span>
                  <div className="hm-dif-glow"></div>
                </div>
                <h3 className="hm-dif-title">{item.title}</h3>
                <p className="hm-dif-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="hm-planos-section">
        <div className="container">
          <div className="hm-section-header text-center">
            <h2 className="hm-section-title">Escolha seu <span className="hm-text-gradient">Plano</span></h2>
            <p className="hm-section-desc">Todos os planos incluem acesso completo à academia, sem taxas escondidas.</p>
          </div>
          <div className="hm-planos-grid" ref={planosRef}>
            {planos.map((plano, i) => (
              <div key={i} className={`hm-plano-card ${plano.destaque ? 'destaque' : ''}`}>
                {plano.destaque && <span className="hm-plano-badge">Mais Popular</span>}
                <h3 className="hm-plano-nome">{plano.nome}</h3>
                <div className="hm-plano-preco-wrapper">
                  <span className="hm-plano-cifrao">R$</span>
                  <span className="hm-plano-valor">{plano.preco}</span>
                  <span className="hm-plano-periodo">{plano.periodo}</span>
                </div>
                <p className="hm-plano-detalhe">{plano.detalhe}</p>
                <ul className="hm-plano-beneficios">
                  {plano.beneficios.map((b, j) => (
                    <li key={j}><Check size={14} />{b}</li>
                  ))}
                </ul>
                <Link to="/seja-aluno" className={plano.destaque ? 'hm-btn-destaque' : 'hm-btn-plano'}>
                  Matricule-se
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modalidades Teaser */}
      <section className="hm-mod-section">
        <div className="container">
          <div className="hm-mod-inner">
            <div>
              <h2 className="hm-section-title">Um treino para <span className="hm-text-gradient">cada objetivo.</span></h2>
              <p className="hm-section-desc" style={{ textAlign: 'left', marginTop: '0.75rem' }}>
                Da primeira ficha aos treinos mais avançados, temos o formato certo para você.
              </p>
            </div>
            <Link to="/modalidades" className="hm-btn-outline">
              Ver todas as modalidades <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="hm-cta-section">
        <div className="hm-cta-overlay"></div>
        <div className="container hm-cta-content">
          <div className="hm-cta-text">
            <h3>Pronto para começar?</h3>
            <p>Venha fazer um treino experimental <strong>100% gratuito</strong> e conheça a Imperium.</p>
          </div>
          <Link to="/aula-experimental" className="hm-btn-cta">
            Quero meu treino grátis <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
