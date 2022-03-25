import React, { useContext } from 'react';
import { canModifyComment } from '../../../utils';
import { CommentContext } from '../Comments';

export const EditCommentButton = ({ currentUserId, commentId, authorId }) => {
  const { setActiveComment } = useContext(CommentContext);
  return (
    <>
      {canModifyComment(currentUserId, authorId) && (
        <button
          className='btn auth__edit'
          onClick={() => setActiveComment({ id: commentId, type: 'editing' })}
        >
          Edit
        </button>
      )}
    </>
  );
};
