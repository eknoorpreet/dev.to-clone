import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import Avatar from '../../Avatar/Avatar';

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  initialText = '',
  handleCancel,
  avatar,
}) => {
  const { currentUser } = useContext(AuthContext);
  const [text, setText] = useState(initialText);
  const isTextAreaDisabled = text.length === 0;
  // const commentText = useRef(null);

  const inputHandler = (evt) => {
    evt.persist();
    setText(evt.target.value);
  };

  const commentSubmitHandle = async (evt) => {
    evt.preventDefault();
    handleSubmit(text);
    setText('');
  };

  return (
    <div className={`comment-form ${submitLabel === 'Reply' && 'reply-form'}`}>
      {avatar && (
        <Avatar
          src={
            currentUser && currentUser.avatar
              ? currentUser.avatar
              : process.env.REACT_APP_DEFAULT_COMMENT_AVATAR
          }
        />
      )}
      <form onSubmit={commentSubmitHandle}>
        <input
          type='textarea'
          placeholder='Add to the discussion'
          name='comment'
          value={text}
          onChange={inputHandler}
          // ref={commentText}
        />
        <div className='comments__btn'>
          {text && (
            <button className='btn btn--comment' disabled={isTextAreaDisabled}>
              {submitLabel}
            </button>
          )}
          {hasCancelButton && (
            <button
              className='btn btn--dismiss'
              type='button'
              onClick={handleCancel}
            >
              Dismiss
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
