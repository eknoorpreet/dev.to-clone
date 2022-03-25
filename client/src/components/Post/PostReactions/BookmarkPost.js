import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth';
import { BookmarkIcon } from '../../Icons/Icons';

export const BookmarkPost = ({
  bookmarks,
  isBookmarked,
  handleReaction,
  setShowModal,
  id,
  children,
}) => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;
  const action = isBookmarked ? 'unbookmark' : 'bookmark';
  const effect = isBookmarked ? 'negative' : 'positive';

  const handleClick = () => {
    !currentUserId
      ? setShowModal(true)
      : handleReaction(action, effect, bookmarks, 'isBookmarked');
  };
  return (
    <>
      <div
        className={`${
          isBookmarked
            ? 'reactions__block clicked--bookmark'
            : 'reactions__block '
        }`}
      >
        <i
          onClick={handleClick}
          className={`${
            isBookmarked
              ? 'reactions__save reactions__saved'
              : 'reactions__save'
          }`}
        >
          <BookmarkIcon state={isBookmarked} size='2.5rem' />
        </i>
        <span>{bookmarks && bookmarks.length}</span>
      </div>
    </>
  );
};
