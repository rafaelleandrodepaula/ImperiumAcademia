// Gera os PNGs do carrossel usando o Chrome instalado no PC (sem Playwright).
// Como usar: node render.js   (rodar dentro desta pasta)
import { execFileSync } from 'child_process';
import path from 'path';
import fs from 'fs';

const caminhoDoChrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const totalDeSlides = 7;
const pastaAtual = import.meta.dirname;
const arquivoHtml = path.join(pastaAtual, 'carrossel.html');
const pastaDeSaida = path.join(pastaAtual, 'instagram');

fs.mkdirSync(pastaDeSaida, { recursive: true });

for (let numero = 1; numero <= totalDeSlides; numero++) {
  const nomeDoArquivo = 'slide-' + String(numero).padStart(2, '0') + '.png';
  const endereco = 'file:///' + arquivoHtml.replace(/\\/g, '/') + '?slide=' + numero;

  execFileSync(caminhoDoChrome, [
    '--headless',
    '--hide-scrollbars',
    '--window-size=1080,1350',
    '--virtual-time-budget=5000', // espera as fontes do Google carregarem
    '--screenshot=' + path.join(pastaDeSaida, nomeDoArquivo),
    endereco,
  ]);

  console.log('Gerado: instagram/' + nomeDoArquivo);
}
