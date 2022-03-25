import React from 'react';

import Modal from './Modal';

const ErrorModal = (props) => {
  return (
    <Modal
      title='An Error Occurred!'
      show={!!props.error}
      onClose={props.onClose}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
