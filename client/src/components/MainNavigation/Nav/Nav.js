import React, { useContext, useEffect, useState } from 'react';
import { FaDev } from '@react-icons/all-files/fa/FaDev';
import NavLinks from '../NavLinks/NavLinks';
import './Nav.css';
import { SocketContext } from '../../../context/socket';
import SideDrawer from '../SideDrawer/SideDrawer';
import { AuthContext } from '../../../context/auth';
import { useHttpClient } from '../../../hooks/useHttpClient';
import { NavLink } from 'react-router-dom';

const Nav = ({ children, onSearchIconClick }) => {
  const { currentUser } = useContext(AuthContext);
  const { current } = useContext(SocketContext).socket;

  let userId;
  if (currentUser) {
    ({ userId } = currentUser);
  }

  const { sendReq } = useHttpClient();
  const [unreadNotifications, setUnreadNotifications] = useState([]);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  useEffect(() => {
    if (userId) {
      const fetchUnreadNotifications = async () => {
        try {
          const responseData = await sendReq(
            `${process.env.REACT_APP_BASE_URL}/users/${userId}/notifications/unread`,
            'GET',
            null,
            {
              Authorization: `Bearer ${currentUser.token}`,
            }
          );
          setUnreadNotifications(responseData.notifications);
        } catch (err) {}
      };
      fetchUnreadNotifications();
    }
  }, [sendReq, userId, currentUser]);

  useEffect(() => {
    current?.on('notificationReceived', (data) => {
      setUnreadNotifications((unreadNotifications) => {
        return [...unreadNotifications, data];
      });
    });
  }, [current]);


  return (
    <div className='container container-nav'>
      {drawerIsOpen && (
        <SideDrawer onClose={closeDrawerHandler} onClick={closeDrawerHandler} />
      )}

      <div className='header__hamburger-menu' onClick={openDrawerHandler}></div>
      <div className='header__logo-search'>
        <NavLink to='/' className='header__logo'>
          <FaDev size='4.125rem' />
        </NavLink>
        {children}
      </div>
      <nav className='nav'>
        <NavLinks
          unreadNotifications={unreadNotifications}
          setUnreadNotifications={setUnreadNotifications}
          onSearchIconClick={onSearchIconClick}
        />
      </nav>
    </div>
  );
};

export default Nav;
