import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const Dropdown = ({ showMenu, currentUser, handleLogout }) => {
  const history = useHistory();
  const handleRedirect = useCallback((url) => history.push(url), [history]);
  const currentUserEmail = currentUser && currentUser.email;

  return (
    <div className={showMenu ? 'dropdown' : 'dropdown--close'}>
      <ul className='dropdown__list'>
        <li className='list__item hvr-bg-lt'>
          <button
            onMouseDown={() =>
              handleRedirect(`/users/${currentUser && currentUser.userId}`)
            }
            className='btn dropdown__btn'
            to={`/users/${currentUser && currentUser.userId}`}
          >
            <div>{currentUser && currentUser.name}</div>
            <small className='u-name-id'>
              {currentUserEmail && currentUserEmail.split('.')[0]}
            </small>
          </button>
        </li>
        <li className='list__item hvr-bg-lt'>
          <button
            className='btn dropdown__btn'
            onMouseDown={() => handleRedirect('/posts/new')}
          >
            Create Post
          </button>
        </li>
        <li className='list__item hvr-bg-lt'>
          <button
            className='btn dropdown__btn'
            onMouseDown={() =>
              handleRedirect(
                `/users/${currentUser && currentUser.userId}/readinglist`
              )
            }
          >
            Reading List
          </button>
        </li>
        <li className='list__item hvr-bg-lt'>
          <button
            className='btn dropdown__btn'
            onMouseDown={() =>
              handleRedirect(`/users/${currentUser && currentUser.userId}/edit`)
            }
          >
            Edit Profile
          </button>
        </li>
        <li className='list__item hvr-bg-lt'>
          <button className='btn dropdown__btn' onMouseDown={handleLogout}>
            Signout
          </button>
        </li>
      </ul>
    </div>
  );
};
