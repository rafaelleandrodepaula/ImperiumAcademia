import { useState } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2, PackageOpen, MessageCircle } from 'lucide-react';
import './Loja.css';

// WhatsApp da loja. ATENÇÃO: é o número de teste do Rafael — trocar pelo da Imperium Suplementos antes de lançar.
const WHATSAPP_LOJA = '5593991057986';

// Um produto dentro do carrinho
type ItemDoCarrinho = {
  id: string;
  nome: string;
  preco: number;
  quantidade: number;
};

// Mostra o número como dinheiro: 59.9 vira "R$ 59,90"
const formatarPreco = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const Loja = () => {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  // Os produtos vão entrar aqui quando a loja estiver ligada ao Supabase
  const [itensDoCarrinho, setItensDoCarrinho] = useState<ItemDoCarrinho[]>([]);

  const totalDeItens = itensDoCarrinho.reduce((soma, item) => soma + item.quantidade, 0);
  const valorTotal = itensDoCarrinho.reduce((soma, item) => soma + item.preco * item.quantidade, 0);

  // Soma ou tira 1 da quantidade. Se chegar a 0, o item sai do carrinho.
  const mudarQuantidade = (id: string, diferenca: number) => {
    setItensDoCarrinho((itens) =>
      itens
        .map((item) => (item.id === id ? { ...item, quantidade: item.quantidade + diferenca } : item))
        .filter((item) => item.quantidade > 0)
    );
  };

  const removerItem = (id: string) => {
    setItensDoCarrinho((itens) => itens.filter((item) => item.id !== id));
  };

  // Monta a lista do pedido e abre o WhatsApp da loja com a mensagem pronta
  const finalizarPeloWhatsApp = () => {
    const linhas = itensDoCarrinho.map(
      (item) => `• ${item.quantidade}x ${item.nome} — ${formatarPreco(item.preco * item.quantidade)}`
    );
    const mensagem = [
      'Olá! Quero fazer este pedido na Loja Imperium:',
      '',
      ...linhas,
      '',
      `Total: ${formatarPreco(valorTotal)}`,
    ].join('\n');
    window.open(`https://wa.me/${WHATSAPP_LOJA}?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  const linkDuvidas = `https://wa.me/${WHATSAPP_LOJA}?text=${encodeURIComponent(
    'Olá, vim pelo site e quero saber quais suplementos vocês têm disponíveis.'
  )}`;

  return (
    <div className="page-content loja-page">

      {/* Topo da loja (os itens entram em cascata) */}
      <section className="loja-hero">
        <div className="container loja-hero-conteudo">
          <span className="loja-kicker loja-entrada" style={{ animationDelay: '0.1s' }}>Imperium Suplementos</span>
          <h1 className="loja-titulo loja-entrada" style={{ animationDelay: '0.25s' }}>Loja Imperium</h1>
          <div className="loja-linha loja-entrada" style={{ animationDelay: '0.4s' }}></div>
          <p className="loja-subtitulo loja-entrada" style={{ animationDelay: '0.5s' }}>
            Suplementos pra acompanhar o seu treino. Monte seu pedido e finalize pelo WhatsApp.
          </p>
        </div>
      </section>

      {/* Produtos */}
      <section className="loja-produtos">
        <div className="container">
          <div className="loja-produtos-topo loja-entrada" style={{ animationDelay: '0.65s' }}>
            <h2 className="loja-produtos-titulo">Produtos</h2>
            <button className="loja-botao-carrinho" onClick={() => setCarrinhoAberto(true)}>
              <ShoppingCart size={18} />
              Carrinho
              <span className="loja-contador">{totalDeItens}</span>
            </button>
          </div>

          {/* Enquanto não tem produtos cadastrados */}
          <div className="loja-vazio loja-entrada" style={{ animationDelay: '0.8s' }}>
            <PackageOpen size={44} className="loja-vazio-icone" />
            <h3>Produtos chegando em breve</h3>
            <p>Estamos preparando a vitrine. Enquanto isso, chame no WhatsApp e veja o que temos disponível.</p>
            <a href={linkDuvidas} target="_blank" rel="noreferrer" className="loja-botao-whatsapp">
              <MessageCircle size={18} />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Botão flutuante do carrinho (aparece no celular e no computador) */}
      <button className="loja-carrinho-flutuante" onClick={() => setCarrinhoAberto(true)} aria-label="Abrir carrinho">
        <ShoppingCart size={24} />
        {totalDeItens > 0 && <span className="loja-contador loja-contador--flutuante">{totalDeItens}</span>}
      </button>

      {/* Fundo escuro atrás do carrinho (clicar fecha) */}
      <div
        className={`loja-carrinho-fundo ${carrinhoAberto ? 'loja-carrinho-fundo--aberto' : ''}`}
        onClick={() => setCarrinhoAberto(false)}
      ></div>

      {/* Painel do carrinho, abre pela direita */}
      <aside className={`loja-carrinho ${carrinhoAberto ? 'loja-carrinho--aberto' : ''}`} aria-hidden={!carrinhoAberto}>
        <div className="loja-carrinho-topo">
          <h2>Seu carrinho</h2>
          <button className="loja-carrinho-fechar" onClick={() => setCarrinhoAberto(false)} aria-label="Fechar carrinho">
            <X size={22} />
          </button>
        </div>

        {itensDoCarrinho.length === 0 ? (
          <div className="loja-carrinho-vazio">
            <ShoppingCart size={40} />
            <p>Seu carrinho está vazio.</p>
          </div>
        ) : (
          <>
            <ul className="loja-carrinho-lista">
              {itensDoCarrinho.map((item) => (
                <li key={item.id} className="loja-carrinho-item">
                  <div className="loja-carrinho-item-info">
                    <span className="loja-carrinho-item-nome">{item.nome}</span>
                    <span className="loja-carrinho-item-preco">{formatarPreco(item.preco * item.quantidade)}</span>
                  </div>
                  <div className="loja-carrinho-item-acoes">
                    <button onClick={() => mudarQuantidade(item.id, -1)} aria-label="Diminuir"><Minus size={14} /></button>
                    <span>{item.quantidade}</span>
                    <button onClick={() => mudarQuantidade(item.id, 1)} aria-label="Aumentar"><Plus size={14} /></button>
                    <button className="loja-carrinho-remover" onClick={() => removerItem(item.id)} aria-label="Remover">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="loja-carrinho-rodape">
              <div className="loja-carrinho-total">
                <span>Total</span>
                <strong>{formatarPreco(valorTotal)}</strong>
              </div>
              <button className="loja-botao-finalizar" onClick={finalizarPeloWhatsApp}>
                <MessageCircle size={18} />
                Finalizar pelo WhatsApp
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default Loja;
