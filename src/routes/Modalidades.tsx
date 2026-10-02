import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import './Modalidades.css';

const WHATSAPP = '5593991057986';

const modalidades = [
  {
    id: 'musculacao',
    img: '/images/modalidades/mod_musculacao.png',
    fallbackGradient: 'linear-gradient(135deg, #1a1a0a 0%, #3d2b00 50%, #1a1a0a 100%)',
    emoji: '🏋️',
    title: 'Musculação',
    desc: 'Treinos completos com equipamentos modernos e fichas personalizadas.',
    detalhes: [
      'Fichas de treino personalizadas',
      'Equipamentos modernos e conservados',
      'Professores qualificados no salão',
      'Avaliação física periódica',
    ],
  },
  {
    id: 'fitdance',
    img: '/images/modalidades/mod_fitdance.png',
    fallbackGradient: 'linear-gradient(135deg, #0a0a1a 0%, #1a0033 50%, #0a0a1a 100%)',
    emoji: '💃',
    title: 'Fit Dance',
    desc: 'Queime calorias dançando com as melhores coreografias do momento.',
    detalhes: [
      'Aulas dinâmicas e divertidas',
      'Ideal para iniciantes e avançados',
      'Melhora ritmo e coordenação',
      'Alta queima calórica',
    ],
  },
  {
    id: 'crosstraining',
    img: '/images/modalidades/mod_crosstraining.png',
    fallbackGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a00 50%, #0a0a0a 100%)',
    emoji: '⚡',
    title: 'Cross Training',
    desc: 'Força, mobilidade e condicionamento em um só treino de alta intensidade.',
    detalhes: [
      'Treinamento funcional completo',
      'Melhora força e resistência',
      'Treinos em grupo motivadores',
      'Progressão de carga orientada',
    ],
  },
  {
    id: 'emagrecimento',
    img: '/images/modalidades/mod_emagrecimento.png',
    fallbackGradient: 'linear-gradient(135deg, #0a1a0a 0%, #003300 50%, #0a1a0a 100%)',
    emoji: '🔥',
    title: 'Emagrecimento',
    desc: 'Programas focados em resultados reais e sustentáveis.',
    detalhes: [
      'Protocolo de treino específico',
      'Combinação cardio + musculação',
      'Acompanhamento de evolução',
      'Orientação nutricional básica',
    ],
  },
  {
    id: 'hipertrofia',
    img: '/images/modalidades/mod_hipertrofia.png',
    fallbackGradient: 'linear-gradient(135deg, #0f0a00 0%, #2a1500 40%, #3d2b00 60%, #0f0a00 100%)',
    emoji: '💪',
    title: 'Hipertrofia',
    desc: 'Estímulos progressivos para ganho de massa muscular com segurança.',
    detalhes: [
      'Periodização de treino',
      'Progressão de carga orientada',
      'Suplementação orientada',
      'Avaliação de composição corporal',
    ],
  },
  {
    id: 'condicionamento',
    img: '/images/modalidades/mod_condicionamento.png',
    fallbackGradient: 'linear-gradient(135deg, #0a0f1a 0%, #001529 40%, #002244 60%, #0a0f1a 100%)',
    emoji: '❤️',
    title: 'Condicionamento Físico',
    desc: 'Melhore fôlego, resistência e saúde cardiovascular.',
    detalhes: [
      'Treinos aeróbicos variados',
      'Melhora da capacidade cardiorrespiratória',
      'Ideal para qualidade de vida',
      'Protocolo progressivo e seguro',
    ],
  },
];

interface ModalState {
  open: boolean;
  modalidade: string;
}

interface FormData {
  nome: string;
  idade: string;
  telefone: string;
}

const Modalidades = () => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [modal, setModal] = useState<ModalState>({ open: false, modalidade: '' });
  const [form, setForm] = useState<FormData>({ nome: '', idade: '', telefone: '' });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const toggle = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };

  const openModal = (e: React.MouseEvent, modalidade: string) => {
    e.stopPropagation();
    setModal({ open: true, modalidade });
    setForm({ nome: '', idade: '', telefone: '' });
    setErrors({});
  };

  const closeModal = () => {
    setModal({ open: false, modalidade: '' });
  };

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.nome.trim() || form.nome.trim().length < 3)
      newErrors.nome = 'Informe seu nome completo.';
    if (!form.idade || isNaN(Number(form.idade)) || Number(form.idade) < 10 || Number(form.idade) > 99)
      newErrors.idade = 'Informe uma idade válida.';
    const digits = form.telefone.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 11)
      newErrors.telefone = 'Informe um WhatsApp válido com DDD.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const msg =
      `Olá! Tenho interesse em *${modal.modalidade}* na Imperium. 💪\n\n` +
      `👤 *Nome:* ${form.nome}\n` +
      `🎂 *Idade:* ${form.idade} anos\n` +
      `📱 *Meu WhatsApp:* ${form.telefone}`;
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    closeModal();
  };

  const formatTelefone = (value: string) => {
    const d = value.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  };

  return (
    <div className="md-page">

      {/* Hero */}
      <section className="md-hero">
        <div className="md-hero-overlay"></div>
        <div className="container md-hero-content">
          <div className="md-badge">
            <span className="md-pulse-dot"></span>
            Encontre seu treino ideal
          </div>
          <h1 className="md-hero-title">
            UM TREINO PARA<br />
            <span className="md-text-gradient">CADA OBJETIVO</span>
          </h1>
          <p className="md-hero-subtitle">
            Da primeira ficha aos treinos mais avançados, temos o formato certo para você evoluir.
          </p>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="md-grid-section">
        <div className="container">
          <div className="md-section-header text-center">
            <h2 className="md-section-title">
              Nossas <span className="md-text-gradient">Modalidades</span>
            </h2>
            <p className="md-section-desc">Clique em uma modalidade para saber mais detalhes.</p>
          </div>

          <div className="md-grid">
            {modalidades.map((mod) => (
              <div
                key={mod.id}
                className={`md-card ${openId === mod.id ? 'open' : ''}`}
                onClick={() => toggle(mod.id)}
              >
                <div
                  className="md-card-img-wrapper"
                  style={!mod.img ? { background: mod.fallbackGradient } : undefined}
                >
                  {mod.img ? (
                    <img src={mod.img} alt={mod.title} className="md-card-img" />
                  ) : (
                    <span className="md-card-img-emoji">{mod.emoji}</span>
                  )}
                  <div className="md-card-img-overlay"></div>
                </div>

                <div className="md-card-top">
                  <h3 className="md-card-title">{mod.title}</h3>
                  <p className="md-card-desc">{mod.desc}</p>
                  <span className="md-card-toggle">
                    {openId === mod.id ? 'Fechar' : 'Saiba mais'}{' '}
                    <ChevronDown
                      size={14}
                      className={`md-toggle-icon ${openId === mod.id ? 'rotated' : ''}`}
                    />
                  </span>
                </div>

                <div className="md-card-detail">
                  <ul className="md-detail-list">
                    {mod.detalhes.map((d, i) => (
                      <li key={i}>
                        <span className="md-detail-dot"></span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <button
                    className="md-btn-wpp"
                    onClick={(e) => openModal(e, mod.title)}
                  >
                    <MessageCircle size={16} />
                    Quero começar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Modal ─── */}
      {modal.open && (
        <div className="md-modal-backdrop" onClick={closeModal}>
          <div className="md-modal" onClick={(e) => e.stopPropagation()}>

            <button className="md-modal-close" onClick={closeModal} aria-label="Fechar">
              ✕
            </button>

            <div className="md-modal-header">
              <div className="md-modal-icon">
                <MessageCircle size={24} />
              </div>
              <h2 className="md-modal-title">Quero começar</h2>
              <p className="md-modal-subtitle">
                Modalidade: <strong>{modal.modalidade}</strong>
              </p>
              <p className="md-modal-desc">
                Preencha seus dados e entraremos em contato pelo WhatsApp!
              </p>
            </div>

            <form className="md-modal-form" onSubmit={handleSubmit} noValidate>
              <div className="md-field">
                <label className="md-label" htmlFor="modal-nome">Nome completo</label>
                <input
                  id="modal-nome"
                  className={`md-input ${errors.nome ? 'error' : ''}`}
                  type="text"
                  placeholder="Ex: João Silva"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
                {errors.nome && <span className="md-error">{errors.nome}</span>}
              </div>

              <div className="md-field">
                <label className="md-label" htmlFor="modal-idade">Idade</label>
                <input
                  id="modal-idade"
                  className={`md-input ${errors.idade ? 'error' : ''}`}
                  type="number"
                  placeholder="Ex: 25"
                  min={10}
                  max={99}
                  value={form.idade}
                  onChange={(e) => setForm({ ...form, idade: e.target.value })}
                />
                {errors.idade && <span className="md-error">{errors.idade}</span>}
              </div>

              <div className="md-field">
                <label className="md-label" htmlFor="modal-tel">Número do WhatsApp</label>
                <input
                  id="modal-tel"
                  className={`md-input ${errors.telefone ? 'error' : ''}`}
                  type="tel"
                  placeholder="(93) 99999-9999"
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: formatTelefone(e.target.value) })}
                />
                {errors.telefone && <span className="md-error">{errors.telefone}</span>}
              </div>

              <button type="submit" className="md-modal-submit">
                <MessageCircle size={18} />
                Enviar pelo WhatsApp
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default Modalidades;
