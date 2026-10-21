import { useEffect, useState, type FormEvent } from 'react';
import { X, MessageCircle } from 'lucide-react';
import './FormularioPlano.css';

// WhatsApp do dono da Imperium: os pedidos de plano chegam aqui.
// ATENÇÃO: confirmar se o número está certo (celular normalmente tem 9 dígitos depois do DDD).
const WHATSAPP_MATRICULA = '558874009356';

type Props = {
  plano: string; // nome do plano clicado (ex: "Mensal")
  aoFechar: () => void;
};

// Data de hoje no formato do campo de data (AAAA-MM-DD), no horário do Brasil (não em UTC)
const dataDeHoje = () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

// "2026-10-25" vira "25/10/2026"
const formatarData = (data: string) => {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
};

// Deixa só os números
const soNumeros = (texto: string) => texto.replace(/\D/g, '');

// Enquanto digita: 88974009356 vira (88) 97400-9356
const mascaraTelefone = (texto: string) => {
  const n = soNumeros(texto).slice(0, 11);
  if (n.length <= 2) return n;
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
};

// Enquanto digita: 12345678900 vira 123.456.789-00
const mascaraCpf = (texto: string) => {
  const n = soNumeros(texto).slice(0, 11);
  if (n.length <= 3) return n;
  if (n.length <= 6) return `${n.slice(0, 3)}.${n.slice(3)}`;
  if (n.length <= 9) return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6)}`;
  return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6, 9)}-${n.slice(9)}`;
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
      setErro('Escolha a data em que quer começar.');
      return;
    }
    if (dataInicio < dataDeHoje()) {
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
    linhas.push(`Quero começar em: ${formatarData(dataInicio)}`);

    const link = `https://wa.me/${WHATSAPP_MATRICULA}?text=${encodeURIComponent(linhas.join('\n'))}`;
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
              type="date"
              value={dataInicio}
              min={dataDeHoje()}
              onChange={(e) => { setDataInicio(e.target.value); setErro(''); }}
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
