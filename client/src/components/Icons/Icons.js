import React from 'react';
import { AiFillHeart } from '@react-icons/all-files/ai/AiFillHeart';
import { AiOutlineHeart } from '@react-icons/all-files/ai/AiOutlineHeart';
import { FaRegBookmark } from '@react-icons/all-files/fa/FaRegBookmark';
import { FaBookmark } from '@react-icons/all-files/fa/FaBookmark';

const LikeIcon = ({ state, color, size }) => {
  const Heart = state ? AiFillHeart : AiOutlineHeart;
  return (
    <Heart
      size={size}
      color={color}
      fill='currentColor'
      stroke='currentColor'
      style={{ cursor: 'pointer' }}
    />
  );
};

const BookmarkIcon = ({ state, color, size }) => {
  const Bookmark = state ? FaBookmark : FaRegBookmark;
  return (
    <Bookmark
      size={size}
      color={color}
      fill='currentColor'
      stroke='currentColor'
      style={{ cursor: 'pointer' }}
    />
  );
};

export { LikeIcon, BookmarkIcon };
