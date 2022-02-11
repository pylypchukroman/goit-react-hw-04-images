import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
// import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={style.Overlay} onClick={handleOverlayClick}>
      <div className={style.Modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
