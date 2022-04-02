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
  const DEFAULT_COMMENT_AVATAR =
    'https://res.cloudinary.com/drkvr9wta/image/upload/v1647701003/undraw_profile_pic_ic5t_ncxyyo.png';
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
              : DEFAULT_COMMENT_AVATAR
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
