import { useEffect, useState, type FormEvent } from 'react';
import { X, MessageCircle } from 'lucide-react';
import {
  WHATSAPP_DONO,
  dataDeHoje,
  soNumeros,
  mascaraData,
  converterData,
  mascaraTelefone,
  mascaraCpf,
} from '../utils/formulario';
import './FormularioPlano.css';

type Props = {
  plano: string; // nome do plano clicado (ex: "Mensal")
  aoFechar: () => void;
};

const FormularioPlano = ({ plano, aoFechar }: Props) => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cpf, setCpf] = useState('');
  const [dataInicio, setDataInicio] = useState('');
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
    const cpfNumeros = soNumeros(cpf);

    // Confere os campos antes de abrir o WhatsApp
    if (nomeLimpo.length < 3) {
      setErro('Digite seu nome completo.');
      return;
    }
    if (telefoneNumeros.length < 10) {
      setErro('Digite um telefone com DDD.');
      return;
    }
    if (cpfNumeros.length > 0 && cpfNumeros.length !== 11) {
      setErro('O CPF precisa ter 11 números (ou deixe em branco).');
      return;
    }
    if (!dataInicio) {
      setErro('Digite a data em que quer começar.');
      return;
    }
    const dataConvertida = converterData(dataInicio);
    if (!dataConvertida) {
      setErro('Digite uma data válida, no formato dia/mês/ano (ex: 24/11/2026).');
      return;
    }
    if (dataConvertida < dataDeHoje()) {
      setErro('A data de início não pode ser no passado.');
      return;
    }

    const linhas = [
      `Olá! Quero fechar o Plano ${plano} na Imperium.`,
      '',
      `Nome: ${nomeLimpo}`,
      `Telefone: ${mascaraTelefone(telefoneNumeros)}`,
    ];
    if (cpfNumeros.length === 11) {
      linhas.push(`CPF: ${mascaraCpf(cpfNumeros)}`);
    }
    linhas.push(`Quero começar em: ${dataInicio}`);

    const link = `https://wa.me/${WHATSAPP_DONO}?text=${encodeURIComponent(linhas.join('\n'))}`;
    window.open(link, '_blank');
    aoFechar();
  };

  return (
    <div className="fp-fundo" onClick={aoFechar}>
      {/* Clicar dentro da janela não fecha (só no fundo escuro) */}
      <div
        className="fp-janela"
        role="dialog"
        aria-modal="true"
        aria-labelledby="fp-titulo"
        onClick={(evento) => evento.stopPropagation()}
      >
        <button type="button" className="fp-fechar" onClick={aoFechar} aria-label="Fechar">
          <X size={22} />
        </button>

        <span className="fp-plano">Plano {plano}</span>
        <h2 id="fp-titulo" className="fp-titulo">Falta pouco!</h2>
        <p className="fp-texto">Preencha seus dados e finalize a matrícula pelo WhatsApp.</p>

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
            <span>CPF <em>(opcional)</em></span>
            <input
              type="text"
              value={cpf}
              onChange={(e) => { setCpf(mascaraCpf(e.target.value)); setErro(''); }}
              placeholder="000.000.000-00"
              inputMode="numeric"
            />
          </label>

          <label className="fp-campo">
            <span>Quero começar em</span>
            <input
              type="text"
              value={dataInicio}
              onChange={(e) => { setDataInicio(mascaraData(e.target.value)); setErro(''); }}
              placeholder="dd/mm/aaaa"
              inputMode="numeric"
              maxLength={10}
            />
          </label>

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

export default FormularioPlano;
