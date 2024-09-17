import React, { useEffect, useState } from 'react';
import fetchProdutos from '../../services/fetchProdutos';
import Modal from '../Modal/Modal';
import './ProductList.css';
import { FaCheckCircle } from 'react-icons/fa';
import Shape from '../../assets/Logo.png';

const ProductList = () => {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [quantidades, setQuantidades] = useState({});
  const [mensagemSucesso, setMensagemSucesso] = useState(null);
  const [alertaProdutoExistente, setAlertaProdutoExistente] = useState(false);


  useEffect(() => {
    const carrinhoLocal = JSON.parse(localStorage.getItem('carrinho')) || [];
    if (carrinhoLocal.length > 0) {
      setCarrinho(carrinhoLocal);
    }
  }, []);

  useEffect(() => {
    if (carrinho.length > 0) {
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
    }
  }, [carrinho]);

  useEffect(() => {
    const getProdutos = async () => {
      const produtosFromFirebase = await fetchProdutos();
      if (produtosFromFirebase && produtosFromFirebase.length > 0) {
        setProdutos(produtosFromFirebase);
      }
    };
    getProdutos();
  }, []);

  const calcularTotalCarrinho = () => {
    return carrinho.reduce((total, item) => total + item["preço"] * item.quantidade, 0);
  };

  const totalCarrinho = calcularTotalCarrinho();

  const ajustarQuantidade = (produtoId, operacao) => {
    setQuantidades((prevQuantidades) => {
      const quantidadeAtual = prevQuantidades[produtoId] || 1;
      const novaQuantidade = operacao === 'incrementar' ? quantidadeAtual + 1 : quantidadeAtual - 1;
      return {
        ...prevQuantidades,
        [produtoId]: novaQuantidade > 0 ? novaQuantidade : 1,
      };
    });
  };

  const adicionarAoCarrinho = (produto) => {
    const produtoExistente = carrinho.find((item) => item.id === produto.id);
    const quantidadeSelecionada = quantidades[produto.id] || 1;

    if (produtoExistente) {
      setAlertaProdutoExistente(true);
      setTimeout(() => {
        setAlertaProdutoExistente(false);
      }, 2000);
    } else {
      const novoProduto = { ...produto, quantidade: quantidadeSelecionada };
      setCarrinho([...carrinho, novoProduto]);

      setMensagemSucesso('Produto adicionado com sucesso!');
      setTimeout(() => {
        setMensagemSucesso(null);
      }, 1000);
    }
  };

  const esvaziarCarrinho = () => {
    setCarrinho([]);
    localStorage.removeItem('carrinho');
  };

  return (
    <div>
      <header className="header">
        <h1>COGNYSHOES</h1>
        <img src={Shape} alt="Logo CognyShoes" className="logo" />
      </header>

      {mensagemSucesso && (
        <div className="mensagem-sucesso">
          <FaCheckCircle size={24} />
          <span>{mensagemSucesso}</span>
        </div>
      )}
      {alertaProdutoExistente && (
        <div className="alerta-produto-existente">
          <span>O produto já está adicionado no carrinho!</span>
        </div>
      )}

      <div className='page'>
        <ul>
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <li key={produto.id}>
                <img src={produto.imagemUrl} alt={produto["descrição"]} width="260" height="260" />
                <h2>{produto["descrição"] || "Descrição não disponível"}</h2>
                <p>
                  {produto["preço"] ? `R$ ${produto["preço"].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "Valor não disponível"}
                </p>

                <div className="quantidade-e-botao">
                  <div className="quantidade-controle">
                    <div className="seta-container">
                      <span className="seta seta-cima" onClick={() => ajustarQuantidade(produto.id, 'incrementar')}>▲</span>
                      <span className="quantidade">{quantidades[produto.id] || 1}</span>
                      <span className="seta seta-baixo" onClick={() => ajustarQuantidade(produto.id, 'diminuir')}>▼</span>
                    </div>
                  </div>
                  <button className="adicionar-carrinho" onClick={() => adicionarAoCarrinho(produto)}>
                    ADICIONAR AO CARRINHO
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p>Carregando produtos ou nenhum produto disponível.</p>
          )}
        </ul>
      </div>

      <button className="cart-button" onClick={() => setModalAberto(true)}>
        <span className="cart-button-text">Meu carrinho</span>
        <span className="cart-button-subtext">{carrinho.length} itens</span>
      </button>

      <Modal
        show={modalAberto}
        handleClose={() => setModalAberto(false)}
        total={totalCarrinho}
        carrinho={carrinho}
        setCarrinho={setCarrinho}
        onFinalizar={() => {
          const numeroPedido = Math.floor(100000 + Math.random() * 900000);
          alert(`Pedido finalizado com sucesso! Número do pedido: ${numeroPedido}`);
          esvaziarCarrinho();
        }}
      >
        {carrinho.length > 0 && (
          <button className="m-esvaziar" onClick={() => esvaziarCarrinho()}>Esvaziar Carrinho</button>
        )}
              {carrinho.length > 0 ? (
          <div className='card'>
            <div className='flex'>
              <div className='primeira'> <span className='titulo-card'>PRODUTO</span></div>
              <div className='primeira'> <span className='titulo-card'>QTD</span>
              <span className='titulo-card-preco'>PREÇO</span>
              </div>
            </div>
            <ul>
              {carrinho.map((item, index) => (
                <li key={item.id}>
                  <div className='primeira'>
                    <img src={item.imagemUrl} alt={item["descrição"]} width="50" />
                    <div className='titulo-preco'>
                      <h3>{item["descrição"]}</h3>
                      <p>R$ {item["preço"].toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                  </div>
                  <div className="segunda">
                    <p>
                      <input 
                        className='qtd'
                        type="number"
                        min="1"
                        value={item.quantidade}
                        onChange={(e) => {
                          const novaQuantidade = Math.max(1, parseInt(e.target.value));
                          const novoCarrinho = [...carrinho];
                          novoCarrinho[index].quantidade = novaQuantidade;
                          setCarrinho(novoCarrinho);
                        }}
                      />
                    </p>
                    <p className='valor'>R$ {(item["preço"] * item.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="carrinho-vazio">
            <h3>Seu carrinho está vazio!</h3>
            <p>Que tal adicionar alguns produtos incríveis? Explore nossa lista de produtos e encontre o que você precisa!</p>
            <button className="add-products-button" onClick={() => setModalAberto(false)}>Ver Produtos</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProductList;
