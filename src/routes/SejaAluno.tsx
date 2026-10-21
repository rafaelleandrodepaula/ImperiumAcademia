import { useState } from 'react';
import { CheckCircle, MessageCircle } from 'lucide-react';
import FormularioPlano from '../components/FormularioPlano';
import './SejaAluno.css';

const WHATSAPP_NUMBER = '5593991057986';

const SejaAluno = () => {
  const baseWppLink = `https://wa.me/${WHATSAPP_NUMBER}?text=`;
  // Plano clicado. Enquanto for null, o formulário fica fechado.
  const [planoEscolhido, setPlanoEscolhido] = useState<string | null>(null);

  const planos = [
    {
      nome: 'Mensal',
      preco: 'R$ 89,90',
      periodo: '/mês',
      beneficios: ['Acesso a todas modalidades', 'Horário livre', 'Sem taxa de adesão'],
    },
    {
      nome: 'Trimestral',
      preco: 'R$ 79,90',
      periodo: '/mês',
      destaque: true,
      beneficios: ['Acesso a todas modalidades', 'Horário livre', 'Avaliação física inclusa', 'Desconto especial'],
    },
    {
      nome: 'Anual',
      preco: 'R$ 69,90',
      periodo: '/mês',
      beneficios: ['Acesso a todas modalidades', 'Horário livre', '2 Avaliações físicas', 'Camiseta exclusiva'],
    }
  ];

  return (
    <div className="sa-page">

      {/* Hero */}
      <section className="sa-hero">
        <div className="sa-hero-overlay"></div>
        <div className="container sa-hero-content">
          <div className="sa-badge">
            <span className="sa-pulse-dot"></span>
            Faça parte da família Imperium
          </div>
          <h1 className="sa-hero-title">
            ESCOLHA SEU<br />
            <span className="sa-text-gradient">PLANO IDEAL</span>
          </h1>
          <p className="sa-hero-subtitle">
            Comece hoje mesmo. Sem burocracia, sem taxa de adesão. Apenas você e seus resultados.
          </p>
        </div>
      </section>

      {/* Planos Section */}
      <section className="sa-planos-section">
        <div className="container">
          <div className="sa-section-header text-center">
            <h2 className="sa-section-title">Nossos <span className="sa-text-gradient">Planos</span></h2>
            <p className="sa-section-desc">Escolha o plano ideal para a sua rotina e comece hoje mesmo.</p>
          </div>

          <div className="sa-planos-grid">
            {planos.map((plano, index) => (
              <div key={index} className={`sa-plano-card ${plano.destaque ? 'destaque' : ''}`}>
                {plano.destaque && <div className="sa-plano-badge">Mais Escolhido</div>}

                <div className="sa-plano-header">
                  <h2 className="sa-plano-nome">{plano.nome}</h2>
                  <div className="sa-plano-preco">
                    <span className="sa-valor">{plano.preco}</span>
                    <span className="sa-periodo">{plano.periodo}</span>
                  </div>
                </div>

                <div className="sa-plano-body">
                  <ul className="sa-beneficios">
                    {plano.beneficios.map((ben, i) => (
                      <li key={i}>
                        <CheckCircle size={17} className="sa-check-icon" />
                        <span>{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sa-plano-footer">
                  {/* Abre o formulário; o WhatsApp só abre depois que a pessoa preenche */}
                  <button
                    type="button"
                    onClick={() => setPlanoEscolhido(plano.nome)}
                    className={`sa-btn-plano ${plano.destaque ? 'sa-btn-destaque' : ''}`}
                  >
                    <MessageCircle size={18} />
                    Quero este plano
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="sa-matricula-info text-center">
            <p>Tem alguma dúvida sobre os planos ou formas de pagamento?</p>
            <a
              href={`${baseWppLink}${encodeURIComponent('Olá, tenho uma dúvida sobre os planos da academia.')}`}
              target="_blank"
              rel="noreferrer"
              className="sa-btn-link"
            >
              Fale com a nossa equipe
            </a>
          </div>
        </div>
      </section>

      {planoEscolhido && (
        <FormularioPlano plano={planoEscolhido} aoFechar={() => setPlanoEscolhido(null)} />
      )}

    </div>
  );
};

export default SejaAluno;
