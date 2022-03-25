import React, { useContext } from 'react';
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { AuthContext } from '../../../context/auth';
import { LoggedInNavLinks } from './LoggedInNavLinks';
import { GuestNavLinks } from './GuestNavLinks';

const NavLinks = ({
  onSearchIconClick,
  unreadNotifications,
  setUnreadNotifications,
}) => {
  const { isLoggedIn, currentUser, logout } = useContext(AuthContext);

  const handleSearchClick = () => {
    onSearchIconClick();
  };

  return (
    <ul className='nav__list'>
      <li>
        <i className='search-icon'>
          <FiSearch size='2.5rem' onClick={handleSearchClick} />
        </i>
      </li>

      {isLoggedIn ? (
        <LoggedInNavLinks
          unreadNotifications={unreadNotifications}
          setUnreadNotifications={setUnreadNotifications}
          currentUser={currentUser}
          logout={logout}
        />
      ) : (
        <GuestNavLinks loginFirst={true} />
      )}
    </ul>
  );
};

export default NavLinks;
