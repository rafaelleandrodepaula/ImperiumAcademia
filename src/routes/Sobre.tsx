import { useState, useEffect } from 'react';
import { MapPin, Check, Snowflake, Dumbbell, Camera, Armchair } from 'lucide-react';
import fotoFeminino from '../assets/sobre/feminino.jpg';
import fotoMassagem from '../assets/sobre/massagem.jpg';
import './Sobre.css';

const TOTAL_DE_MAQUINAS = 40;
const TOTAL_DE_METROS = 400;

// Faz um número subir de 0 até o total em mais ou menos 1,5 segundo.
// Devolve o intervalo, pra poder parar a contagem se a página fechar.
const contarAte = (total: number, setNumero: (numero: number) => void) => {
  const quantidadeDePassos = 40;
  const duracaoEmMs = 1500;
  let passoAtual = 0;

  const intervalo = setInterval(() => {
    passoAtual = passoAtual + 1;
    setNumero(Math.round((total * passoAtual) / quantidadeDePassos));
    if (passoAtual >= quantidadeDePassos) {
      clearInterval(intervalo);
    }
  }, duracaoEmMs / quantidadeDePassos);

  return intervalo;
};

const Sobre = () => {
  // Lista com o nome dos cards que já apareceram na tela (ex: ['maquinas', 'personal'])
  const [cardsVisiveis, setCardsVisiveis] = useState<string[]>([]);
  const [numeroMaquinas, setNumeroMaquinas] = useState(0);
  const [numeroMetros, setNumeroMetros] = useState(0);

  // Quando um card aparece na tela, coloca o nome dele na lista (o CSS faz a animação de entrada)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nomeDoCard = (entry.target as HTMLElement).dataset.card;
            if (nomeDoCard) {
              setCardsVisiveis((lista) => (lista.includes(nomeDoCard) ? lista : [...lista, nomeDoCard]));
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    const cards = document.querySelectorAll('.sobre-info-card');
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const cardEstaVisivel = (nomeDoCard: string) => cardsVisiveis.includes(nomeDoCard);
  const maquinasVisivel = cardEstaVisivel('maquinas');
  const climatizacaoVisivel = cardEstaVisivel('climatizacao');

  // Contador das máquinas: 0 até 40
  useEffect(() => {
    if (!maquinasVisivel) return;
    const intervalo = contarAte(TOTAL_DE_MAQUINAS, setNumeroMaquinas);
    return () => clearInterval(intervalo);
  }, [maquinasVisivel]);

  // Contador dos metros: 0 até 400
  useEffect(() => {
    if (!climatizacaoVisivel) return;
    const intervalo = contarAte(TOTAL_DE_METROS, setNumeroMetros);
    return () => clearInterval(intervalo);
  }, [climatizacaoVisivel]);

  const contagemTerminou = numeroMaquinas === TOTAL_DE_MAQUINAS;

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

          <div className="sobre-info-grid">
          {/* Card: máquinas (número conta de 0 até 40) */}
          <div data-card="maquinas" className={`sobre-info-card ${maquinasVisivel ? 'sobre-info-card--visivel' : ''}`}>
            <span className="sobre-info-kicker">Estrutura</span>

            <div className="sobre-info-numero">
              <span className={`sobre-info-mais ${contagemTerminou ? 'sobre-info-mais--visivel' : ''}`}>+</span>
              {numeroMaquinas}
            </div>
            <h3 className="sobre-info-titulo">Máquinas</h3>

            <div className="sobre-info-linha"></div>

            <p className="sobre-info-texto">
              Máquinas para diversos grupamentos musculares. Equipamento que realmente ajuda a desenvolver sua musculatura.
            </p>

            <p className="sobre-info-nota">* Estrutura completa na inauguração</p>
          </div>

          {/* Card: personal de fora (itens aparecem um por um) */}
          <div data-card="personal" className={`sobre-info-card ${cardEstaVisivel('personal') ? 'sobre-info-card--visivel' : ''}`}>
            <span className="sobre-info-kicker">Personal de fora</span>

            <div className="sobre-info-numero">R$ 0</div>
            <h3 className="sobre-info-titulo">Pro seu personal</h3>

            <div className="sobre-info-linha"></div>

            <ul className="sobre-info-itens">
              <li><Check size={16} /> Sem diária</li>
              <li><Check size={16} /> Sem mensalidade</li>
              <li><Check size={16} /> Sem taxa</li>
            </ul>

            <p className="sobre-info-texto">
              Tem personal de outra academia? Ele pode treinar você aqui. Valorizamos de verdade o profissional de educação física.
            </p>
          </div>

          {/* Card: climatização (número conta de 0 até 400) */}
          <div data-card="climatizacao" className={`sobre-info-card ${climatizacaoVisivel ? 'sobre-info-card--visivel' : ''}`}>
            <span className="sobre-info-kicker">Conforto</span>

            <div className="sobre-info-numero">
              <span className={`sobre-info-mais ${numeroMetros === TOTAL_DE_METROS ? 'sobre-info-mais--visivel' : ''}`}>+</span>
              {numeroMetros}<span className="sobre-info-unidade">m²</span>
            </div>
            <h3 className="sobre-info-titulo">De musculação</h3>

            <div className="sobre-info-linha"></div>

            <ul className="sobre-info-itens">
              <li><Snowflake size={16} /> 100% climatizado</li>
            </ul>

            <p className="sobre-info-texto">
              Espaço amplo pra treinar com conforto, independente do calor lá fora.
            </p>

            <p className="sobre-info-nota">* Estrutura completa na inauguração</p>
          </div>

          {/* Card: equipamentos (ícone aparece crescendo + itens um por um) */}
          <div data-card="equipamentos" className={`sobre-info-card ${cardEstaVisivel('equipamentos') ? 'sobre-info-card--visivel' : ''}`}>
            <span className="sobre-info-kicker">Equipamentos</span>

            <div className="sobre-info-icone"><Dumbbell size={34} /></div>
            <h3 className="sobre-info-titulo">Alta performance</h3>

            <div className="sobre-info-linha"></div>

            <ul className="sobre-info-itens sobre-info-itens--lista">
              <li><Check size={16} /> Os melhores maquinários do mercado</li>
              <li><Check size={16} /> Profissionais qualificados pra te ajudar</li>
            </ul>
          </div>

          {/* Card: sala de poses (ícone aparece crescendo) */}
          <div data-card="poses" className={`sobre-info-card ${cardEstaVisivel('poses') ? 'sobre-info-card--visivel' : ''}`}>
            <span className="sobre-info-kicker">Para atletas</span>

            <div className="sobre-info-icone"><Camera size={34} /></div>
            <h3 className="sobre-info-titulo">Sala de poses e fotos</h3>

            <div className="sobre-info-linha"></div>

            <p className="sobre-info-texto">
              Espaço próprio pra você treinar suas poses e registrar a sua evolução.
            </p>
          </div>

          {/* Card: público feminino (com foto de fundo — teste) */}
          <div data-card="feminino" className={`sobre-info-card sobre-info-card--foto ${cardEstaVisivel('feminino') ? 'sobre-info-card--visivel' : ''}`}>
            <div className="sobre-info-foto" style={{ backgroundImage: `url(${fotoFeminino})` }}></div>
            <span className="sobre-info-kicker">Para elas</span>

            <h3 className="sobre-info-titulo">Máquinas pro público feminino</h3>

            <div className="sobre-info-linha"></div>

            <p className="sobre-info-texto">
              Equipamentos específicos pensados pro treino feminino.
            </p>
          </div>

          {/* Card: cadeira de massagem (com foto de fundo) */}
          <div data-card="massagem" className={`sobre-info-card sobre-info-card--foto ${cardEstaVisivel('massagem') ? 'sobre-info-card--visivel' : ''}`}>
            <div className="sobre-info-foto sobre-info-foto--massagem" style={{ backgroundImage: `url(${fotoMassagem})` }}></div>
            <span className="sobre-info-kicker">Malhar e relaxar</span>

            <div className="sobre-info-icone"><Armchair size={34} /></div>
            <h3 className="sobre-info-titulo">Cadeira de massagem</h3>

            <div className="sobre-info-linha"></div>

            <p className="sobre-info-texto">
              Terminou o treino? Relaxe na nossa cadeira de massagem.
            </p>
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
