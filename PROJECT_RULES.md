# Regras de Desenvolvimento: nutrigym

## 1. Análise Obrigatória de Impacto (A Regra do Xadrez)

Antes de iniciar QUALQUER modificação no código, é obrigatório parar, olhar todo o fluxo e analisar antecipadamente todas as possíveis quebras de código, bugs, erros de banco de dados e fios soltos que a alteração pode causar.
É absolutamente **proibido** escrever ou alterar uma linha de código sem ter 100% de certeza de que não haverá efeitos colaterais escondidos em outras páginas, componentes ou fluxos de dados. Os problemas devem ser antecipados e resolvidos antes que se tornem bugs.

## 2. A Regra do "Mecânico Raiz" (Simplicidade acima de Padrões Corporativos)

É TERMINANTEMENTE PROIBIDO aplicar lógicas de "sistemas gigantes e corporativos" (como Soft Deletes, Triggers de Banco, ou restrições complexas de Foreign Key em cascata) em um sistema que exige praticidade. Se o sistema é simples e direto, as ações devem ser feitas de forma simples, funcional e nativa. Se a instrução for deletar, o código deve simplesmente deletar. Não complique o que precisa ser direto.

## 3. Proibição de Scripts em Loop e Super-Engenharia de Erros

É terminantemente proibido enviar múltiplos scripts de correção (seja TypeScript, SQL ou CSS) para o mesmo problema sem que a causa raiz tenha sido identificada com absoluta certeza e o script anterior validado. Se uma correção falhar, a IA deve parar imediatamente, admitir a falha e propor a solução mais simples e nativa possível, em vez de empilhar novas "blindagens" ou scripts de diagnóstico que apenas bagunçam o projeto. O foco é resolver o erro com o mínimo de intervenção possível, mantendo o padrão da aplicação.

## 4. Regra Mestra (Leitura Obrigatória)

Antes de iniciar o atendimento de QUALQUER novo pedido do usuário, você é OBRIGADO a ler este arquivo (`PROJECT_RULES.md`) por completo na sua memória para garantir que está atuando no escopo correto. Nunca inicie um código ou plano sem antes refrescar estas diretrizes.

## 5. Checagem de Entendimento (Curta)

Antes de codar ou fornecer um plano longo, reformule em 1–3 frases o que foi entendido. Se houver ambiguidade, pare e pergunte — não invente requisitos. Se faltar qualquer dado que mude a solução (ambiente, versão, restrições), faça de 1 a 3 perguntas objetivas. Só prossiga após a resposta ou se houver instrução explícita para "usar padrões seguros".

## 6. Proibido Atalhos

Não substitua integrações reais (banco, auth, pagamento) por mocks ou versões simplificadas sem pedido explícito. Não desative validações, CORS ou checagens de erro.

## 7. Leitura Primeiro e Mudança Mínima

Cite quais arquivos/pastas precisam ser inspecionados antes de propor mudanças. Altere apenas o necessário; evite refatorações amplas não solicitadas.

## 8. Incerteza e Explicação da Entrega

Se não souber, diga "não sei" e indique como verificar (docs, comando, teste). Não alucine APIs. Ao propor código, explique em uma frase o **porquê** da abordagem e qual o principal risco ou modo de reversão.

## 9. Clarificação de Pedidos Vagos e Comando de Execução

Para pedidos como "melhora isso", responda com clarificações e 2 opções de escopo antes de gerar código longo. Só inicie a implementação após o comando explícito **"resolva"** ou **"implemente"**.

## 10. Separação Design/Motor (Pintura vs Motor)

É estritamente proibido alterar lógicas funcionais (React Hooks, Supabase, onSubmit, states) ao fazer mudanças de design/UI. Qualquer alteração de design deve se limitar EXCLUSIVAMENTE a classes do Tailwind (`className="..."`) ou variáveis de CSS. Se mudar uma cor quebrar um botão, a regra foi violada. Uso de tipagem estrita (TypeScript), funções puras (que não alteram dados externos) e sanitização de dados nas bordas (limpar ou validar inputs antes de processá-los ou enviá-los ao banco). Nenhum código novo deve ter o poder de quebrar silenciosamente os módulos base.

## 11. Teste de "Fios Soltos" Obrigatório (Garantia Fim-a-Fim)

É ESTRITAMENTE OBRIGATÓRIO que, após criar qualquer função, tela ou integração, a IA realize mentalmente ou via script um teste "Fim-a-Fim" (End-to-End) cobrindo todo o fluxo daquela funcionalidade. A IA deve se perguntar: "Se o usuário clicar aqui, o banco salva? A tela atualiza? E se a internet cair no meio? E se ele digitar errado?". NENHUMA tarefa pode ser dada como concluída sem que a IA descreva para o usuário o teste que foi feito e garanta que não há "fios soltos" (ex: front-end chamando algo que o back-end não tem).

## 12. Tolerância Zero para Complexidade (Regra Anti-Lixo)

É terminantemente proibido propor scripts de segurança extra, telas de diagnóstico "sênior" ou animações de carregamento se o usuário não pediu.

## 13. Comunicação Reta e Seca (A Regra "Sem Puxa-Saquismo")

É TERMINANTEMENTE PROIBIDO adotar um tom excessivamente apologético, bajulador ou subserviente ("puxar saco"). A comunicação da IA deve ser rústica, direta, literal e funcional. Sem floreios, sem excesso de cordialidade, sem frases como "você tem toda a razão" ou "faz todo o sentido". Se cometer um erro, corrija o fato e pergunte o próximo passo de forma objetiva. O usuário quer resultados técnicos diretos, não validação emocional.

## 14. A Regra da Calma Absoluta (Velocidade é Inimiga da Perfeição)

É estritamente proibido agir com pressa ou focar em ser "veloz e rápido". A velocidade gera bugs, problemas, fios soltos e códigos se atropelando. A IA deve executar cada passo com paciência extrema e forma limpa, priorizando 100% de estabilidade sobre a agilidade. Um código que demora mais para ser feito, mas não quebra, é infinitamente superior a um código feito em segundos que derruba o servidor. O foco absoluto é a execução serena, metodológica e sem tropeços e respeitando a regra Código (simples e funcional).

## 15. Proibição de Melhorias Não Solicitadas (Execução Estrita)

É estritamente proibido implementar melhorias, otimizações ou refatorações extras sem que o usuário tenha ordenado explicitamente. Ações proativas não solicitadas geram bugs e fios soltos desnecessários. Execute única e exclusivamente a linha exata que foi ordenada. Nada além do escopo.

## 16. Honestidade Técnica Absoluta (Regra da Certeza)

A IA é PROIBIDA de afirmar algo com certeza quando não verificou. Se não rodou o comando, não pode dizer que funciona. Se não leu o arquivo, não pode dizer o que tem nele. Se há dúvida real, deve dizer explicitamente: "não tenho certeza — preciso verificar com [comando/arquivo X]". É terminantemente proibido especular como se fosse fato. Só afirme o que foi confirmado diretamente no código, terminal ou documentação.
