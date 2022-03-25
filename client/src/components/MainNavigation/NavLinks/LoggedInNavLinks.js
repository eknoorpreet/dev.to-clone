import { RiNotificationLine } from '@react-icons/all-files/ri/RiNotificationLine';
import React, { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from '../../Avatar/Avatar';
import { Dropdown } from '../Dropdown';
import { useHistory } from 'react-router-dom';

export const LoggedInNavLinks = ({
  unreadNotifications,
  setUnreadNotifications,
  currentUser,
  logout,
}) => {
  const history = useHistory();
  const handleRedirect = useCallback((url) => history.push(url), [history]);
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = () => {
    setUnreadNotifications([]);
    handleRedirect(`/users/${currentUser && currentUser.userId}/notifications`);
  };

  const handleDropdown = () => {
    setShowMenu((showMenu) => !showMenu);
  };

  const handleLogout = () => {
    setShowMenu(false);
    logout();
  };
  return (
    <React.Fragment>
      <li className='list__item list__item--mobile item--create'>
        <NavLink className='create-link' to='/posts/new' exact>
          Create Post
        </NavLink>
      </li>
      <li
        className='list__item list__item--notifs hvr-bg-lt'
        onClick={handleClick}
      >
        <NavLink
          className='link'
          to={`/users/${currentUser && currentUser.userId}/notifications`}
          exact
        >
          <div className='link--notifs-icon'>
            <RiNotificationLine size='2.5rem' />
            {unreadNotifications && unreadNotifications.length > 0 && (
              <div className='notif__counter'>{unreadNotifications.length}</div>
            )}
          </div>
        </NavLink>
      </li>

      <li>
        <button
          className='btn nav__btn'
          onClick={handleDropdown}
          onBlur={() => setShowMenu(false)}
        >
          <Avatar src={currentUser && currentUser.avatar} />
        </button>
      </li>

      <Dropdown
        showMenu={showMenu}
        handleLogout={handleLogout}
        setShowMenu={setShowMenu}
        currentUser={currentUser}
      />
    </React.Fragment>
  );
};
