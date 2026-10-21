// Funções usadas pelos formulários do site (plano e aula experimental)

// WhatsApp oficial da Imperium (+55 88 97400-9356): os formulários enviam pra cá.
export const WHATSAPP_DONO = '5588974009356';

// Data de hoje no formato AAAA-MM-DD, no horário do Brasil (não em UTC)
export const dataDeHoje = () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const dia = String(hoje.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
};

// Deixa só os números
export const soNumeros = (texto: string) => texto.replace(/\D/g, '');

// Enquanto digita: 24112026 vira 24/11/2026
export const mascaraData = (texto: string) => {
  const n = soNumeros(texto).slice(0, 8);
  if (n.length <= 2) return n;
  if (n.length <= 4) return `${n.slice(0, 2)}/${n.slice(2)}`;
  return `${n.slice(0, 2)}/${n.slice(2, 4)}/${n.slice(4)}`;
};

// "24/11/2026" vira "2026-11-24" (formato pra comparar com a data de hoje).
// Se a data não existir (ex: 31/02/2026), devolve vazio.
export const converterData = (data: string) => {
  const [dia, mes, ano] = data.split('/').map(Number);
  if (!dia || !mes || !ano || String(ano).length !== 4) return '';
  const teste = new Date(ano, mes - 1, dia);
  const existe = teste.getFullYear() === ano && teste.getMonth() === mes - 1 && teste.getDate() === dia;
  if (!existe) return '';
  return `${ano}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
};

// Enquanto digita: 88974009356 vira (88) 97400-9356
export const mascaraTelefone = (texto: string) => {
  const n = soNumeros(texto).slice(0, 11);
  if (n.length <= 2) return n;
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 10) return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
};

// Enquanto digita: 12345678900 vira 123.456.789-00
export const mascaraCpf = (texto: string) => {
  const n = soNumeros(texto).slice(0, 11);
  if (n.length <= 3) return n;
  if (n.length <= 6) return `${n.slice(0, 3)}.${n.slice(3)}`;
  if (n.length <= 9) return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6)}`;
  return `${n.slice(0, 3)}.${n.slice(3, 6)}.${n.slice(6, 9)}-${n.slice(9)}`;
};
