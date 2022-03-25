import { FaRegComment } from '@react-icons/all-files/fa/FaRegComment';
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LikeIcon } from '../Icons/Icons';
import AuthModal from '../../components/Modal/AuthModal';
import usePostReaction from '../Post/PostReactions/hooks/usePostReaction';
import { readingTime } from '../../utils';

const PreviewReactions = ({ userId, post, showModal, setShowModal }) => {
  const { likes, bookmarks, comments, unicorns, titleURL, id, body, author } =
    post;
  const reactions = likes.length + bookmarks.length + unicorns.length;
  const { state, handleReaction } = usePostReaction(
    likes,
    unicorns,
    bookmarks,
    id,
    author
  );
  const { isBookmarked } = state;
  const action = isBookmarked ? 'unbookmark' : 'bookmark';
  const effect = isBookmarked ? 'negative' : 'positive';

  const postLengthRef = useRef();
  useEffect(() => {
    const span = postLengthRef.current;
    span.innerText = readingTime(body);
  }, [body]);

  const handleClick = () => {
    !userId
      ? setShowModal(true)
      : handleReaction(action, effect, bookmarks, 'isBookmarked');
  };

  return (
    <div className='preview__reactions'>
      <div className='preview__reactions--left'>
        <Link to={`/posts/${titleURL}/${id}`} className='reactions__total'>
          <i>
            <LikeIcon size='2rem' />
          </i>
          <span>
            {reactions} <span className='reactions__text'>Reactions</span>
          </span>
        </Link>
        <Link to={`/posts/${titleURL}/${id}`} className='comments__total'>
          <i>
            <FaRegComment size='2rem' />
          </i>
          <span>
            {comments.length} <span className='reactions__text'>Comments</span>
          </span>
        </Link>
        <AuthModal onClose={() => setShowModal(false)} show={showModal} />
      </div>
      <div className='preview__reactions--right'>
        <span className='read-time' ref={postLengthRef} />

        <button className='btn btn--save btn--hover' onClick={handleClick}>
          {isBookmarked ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
};

export default PreviewReactions;
