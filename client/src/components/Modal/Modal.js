import { GrFormClose } from '@react-icons/all-files/gr/GrFormClose';
import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import './Modal.css';

const Modal = (props) => {
  const nodeRef = React.useRef(null);
  const content = (
    <CSSTransition
      nodeRef={nodeRef}
      in={props.show}
      unmountOnExit
      timeout={{ enter: 0, exit: 300 }}
    >
      <div ref={nodeRef} className='modal' onClick={props.onClose}>
        <div className='modal__content' onClick={(e) => e.stopPropagation()}>
          <div className='modal__header'>
            <h4 className='modal__title'>{props.title}</h4>
            <i>
              <GrFormClose size='2.5rem' onClick={props.onClose} />
            </i>
          </div>
          <div className='modal__body'>{props.children}</div>
          <div className='modal__footer'>{props.footer}</div>
        </div>
      </div>
    </CSSTransition>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

export default Modal;
