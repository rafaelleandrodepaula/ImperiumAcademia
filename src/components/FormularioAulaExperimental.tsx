import { useEffect, useState, type FormEvent } from 'react';
import { X, MessageCircle } from 'lucide-react';
import {
  WHATSAPP_DONO,
  dataDeHoje,
  soNumeros,
  mascaraData,
  converterData,
  mascaraTelefone,
} from '../utils/formulario';
// Usa o mesmo visual do formulário do plano (classes "fp-")
import './FormularioPlano.css';

type Props = {
  aoFechar: () => void;
};

const PERIODOS = ['Manhã', 'Tarde', 'Noite'];

const FormularioAulaExperimental = ({ aoFechar }: Props) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dia, setDia] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [erro, setErro] = useState('');

  // Fecha com a tecla Esc e trava a rolagem da página enquanto o formulário está aberto
  useEffect(() => {
    const fecharComEsc = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') aoFechar();
    };
    document.addEventListener('keydown', fecharComEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', fecharComEsc);
      document.body.style.overflow = '';
    };
  }, [aoFechar]);

  const enviar = (evento: FormEvent) => {
    evento.preventDefault();

    const nomeLimpo = nome.trim().replace(/\s+/g, ' ');
    const telefoneNumeros = soNumeros(telefone);

    // Confere os campos antes de abrir o WhatsApp
    if (nomeLimpo.length < 3) {
      setErro('Digite seu nome completo.');
      return;
    }
    if (telefoneNumeros.length < 10) {
      setErro('Digite um telefone com DDD.');
      return;
    }
    if (!dia) {
      setErro('Digite o dia em que quer vir.');
      return;
    }
    const diaConvertido = converterData(dia);
    if (!diaConvertido) {
      setErro('Digite uma data válida, no formato dia/mês/ano (ex: 24/11/2026).');
      return;
    }
    if (diaConvertido < dataDeHoje()) {
      setErro('O dia não pode ser no passado.');
      return;
    }
    if (!periodo) {
      setErro('Escolha o período: manhã, tarde ou noite.');
      return;
    }

    const mensagem = [
      'Olá! Quero agendar minha aula experimental grátis na Imperium.',
      '',
      `Nome: ${nomeLimpo}`,
      `Telefone: ${mascaraTelefone(telefoneNumeros)}`,
      `Dia: ${dia}`,
      `Período: ${periodo}`,
    ].join('\n');

    window.open(`https://wa.me/${WHATSAPP_DONO}?text=${encodeURIComponent(mensagem)}`, '_blank');
    aoFechar();
  };

  return (
    <div className="fp-fundo" onClick={aoFechar}>
      {/* Clicar dentro da janela não fecha (só no fundo escuro) */}
      <div
        className="fp-janela"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fae-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <button type="button" className="fp-fechar" onClick={aoFechar} aria-label="Fechar">
          <X size={22} />
        </button>

        <span className="fp-plano">Aula experimental grátis</span>
        <h2 id="fae-titulo" className="fp-titulo">Agende sua aula</h2>
        <p className="fp-texto">Preencha e confirme o horário com a nossa equipe pelo WhatsApp.</p>

        <form className="fp-form" onSubmit={enviar} noValidate>
          <label className="fp-campo">
            <span>Nome completo</span>
            <input
              type="text"
              value={nome}
              onChange={(e) => { setNome(e.target.value); setErro(''); }}
              placeholder="Seu nome"
              autoComplete="name"
              maxLength={80}
            />
          </label>

          <label className="fp-campo">
            <span>Telefone (WhatsApp)</span>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => { setTelefone(mascaraTelefone(e.target.value)); setErro(''); }}
              placeholder="(88) 99999-9999"
              autoComplete="tel"
              inputMode="numeric"
            />
          </label>

          <label className="fp-campo">
            <span>Dia que quer vir</span>
            <input
              type="text"
              value={dia}
              onChange={(e) => { setDia(mascaraData(e.target.value)); setErro(''); }}
              placeholder="dd/mm/aaaa"
              inputMode="numeric"
              maxLength={10}
            />
          </label>

          <div className="fp-campo">
            <span>Período</span>
            <div className="fp-periodos">
              {PERIODOS.map((opcao) => (
                <button
                  key={opcao}
                  type="button"
                  className={`fp-periodo ${periodo === opcao ? 'fp-periodo--ativo' : ''}`}
                  aria-pressed={periodo === opcao}
                  onClick={() => { setPeriodo(opcao); setErro(''); }}
                >
                  {opcao}
                </button>
              ))}
            </div>
          </div>

          {erro && <p className="fp-erro" role="alert">{erro}</p>}

          <button type="submit" className="fp-enviar">
            <MessageCircle size={18} />
            Enviar pelo WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioAulaExperimental;
