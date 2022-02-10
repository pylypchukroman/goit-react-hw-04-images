import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
// import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { children } = this.props;

    return createPortal(
      <div className={style.Overlay} onClick={this.handleOverlayClick}>
        <div className={style.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
