import React from 'react';
import { canModifyComment } from '../../../utils';

export const DeleteCommentButton = ({
  currentUserId,
  commentId,
  authorId,
  deleteComment,
}) => {
  return (
    <>
      {canModifyComment(currentUserId, authorId) && (
        <button
          className='btn auth__delete comment__auth'
          onClick={() => deleteComment(commentId)}
        >
          Delete
        </button>
      )}
    </>
  );
};
