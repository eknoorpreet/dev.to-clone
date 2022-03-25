import React from 'react';

import Modal from './Modal';

const DeletionModal = (props) => {
  return (
    <Modal
      title='Are you sure?'
      show={props.show}
      onClose={props.onClose}
      footer={
        <>
          <button
            onClick={props.cancelDeleteHandler}
            className='btn btn--cancel'
          >
            Cancel
          </button>
          <button
            onClick={props.confirmDeleteHandler}
            className='btn btn--delete'
          >
            Delete
          </button>
        </>
      }
    >
      <p>
        Do you want to proceed and delete this post? Please note that this
        action can't be undone!
      </p>
    </Modal>
  );
};

export default DeletionModal;
