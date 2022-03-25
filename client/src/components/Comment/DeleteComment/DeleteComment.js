import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import useHttpClient from '../../../hooks/useHttpClient';
import ErrorModal from '../../Modal/ErrorModal';
import { CommentContext } from '../Comments';
import { DeleteCommentButton } from './DeleteCommentButton';

export const DeleteComment = ({ commentId, authorId }) => {
  const { setActiveComment, comments, setComments } =
    useContext(CommentContext);
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;
  const { sendReq, error, clearError } = useHttpClient();

  const deleteComment = async (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment.id !== commentId
    );

    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/comments/${commentId}`,
        'DELETE',
        JSON.stringify({ author: currentUserId }),
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
    } catch (err) {}
    setComments(updatedComments);
    setActiveComment(null);
  };

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <DeleteCommentButton
        currentUserId={currentUserId}
        commentId={commentId}
        authorId={authorId}
        deleteComment={deleteComment}
      />
    </>
  );
};
