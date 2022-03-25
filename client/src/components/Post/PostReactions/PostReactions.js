import React from 'react';
import { LikePost } from './LikePost';
import { UnicornPost } from './UnicornPost';
import { BookmarkPost } from './BookmarkPost';
import usePostReaction from './hooks/usePostReaction';
import './PostReactions.css';

const PostReactions = ({ post, setShowModal, handleInteraction }) => {
  const { likes, unicorns, bookmarks, id, author } = post;
  const { state, handleReaction } = usePostReaction(
    likes,
    unicorns,
    bookmarks,
    id,
    author
  );
  const { isLiked, isUnicorned, isBookmarked } = state;
  return (
    <div className='post__reactions'>
      <LikePost
        likes={likes}
        isLiked={isLiked}
        setShowModal={setShowModal}
        handleReaction={handleReaction}
      />
      <UnicornPost
        unicorns={unicorns}
        isUnicorned={isUnicorned}
        setShowModal={setShowModal}
        handleReaction={handleReaction}
      />
      <BookmarkPost
        bookmarks={bookmarks}
        isBookmarked={isBookmarked}
        setShowModal={setShowModal}
        handleReaction={handleReaction}
      />
    </div>
  );
};

export default PostReactions;
