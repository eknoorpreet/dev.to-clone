import { GiUnicorn } from '@react-icons/all-files/gi/GiUnicorn';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/auth';

export const UnicornPost = ({
  unicorns,
  isUnicorned,
  handleReaction,
  setShowModal,
}) => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;

  const action = isUnicorned ? 'ununicorn' : 'unicorn';
  const effect = isUnicorned ? 'negative' : 'positive';

  const handleClick = () => {
    !currentUserId
      ? setShowModal(true)
      : handleReaction(action, effect, unicorns, 'isUnicorned');
  };
  return (
    <div
      className={`${
        isUnicorned ? 'reactions__block clicked--unicorn' : 'reactions__block '
      }`}
    >
      <i
        onClick={handleClick}
        className={`${
          isUnicorned
            ? 'reactions__unicorn reactions__unicorned'
            : 'reactions__unicorn'
        }`}
      >
        <GiUnicorn size='2.5rem' />
      </i>
      <span>{unicorns && unicorns.length}</span>
    </div>
  );
};
