import React from 'react';
import { LikeIcon } from '../../Icons/Icons';

export const LikeCommentButton = ({ handleLike, isLiked, likes }) => {
  return (
    <button
      className={`btn comments__total ${isLiked && 'comment__liked'}`}
      onClick={handleLike}
    >
      <i className='like-comment-icon'>
        <LikeIcon state={isLiked} size='2rem' />
      </i>
      <span>
        {likes && likes.length}
        <span className='reactions__text'>likes</span>
      </span>
    </button>
  );
};
