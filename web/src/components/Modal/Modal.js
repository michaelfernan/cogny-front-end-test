import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ show, handleClose, children, onFinalizar, total, carrinho }) => {
  const [pedidoFinalizado, setPedidoFinalizado] = useState(false);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  const handleFinalizarPedido = () => {
    onFinalizar();
    setPedidoFinalizado(true);
    setTimeout(() => {
      setPedidoFinalizado(false);
      handleClose();
    }, 2000);
  };

  return (
    <>
      {show && (
        <div className="m-modal">
          <div className="m-modal-content">
            <span className="m-close" onClick={handleClose}>
              &times;
            </span>
            {children}

            {pedidoFinalizado && (
              <div className="mensagem-sucesso">
                <span>Pedido finalizado com sucesso!</span>
              </div>
            )}

            {carrinho.length > 0 && !pedidoFinalizado && (
              <div className="modal-footer">
                <button className="m-finalizar-pedido" onClick={handleFinalizarPedido}>
                  Finalizar Pedido
                </button>
                <span className="total">
                  Total
                  <span className='m-total-value'>
                    R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
