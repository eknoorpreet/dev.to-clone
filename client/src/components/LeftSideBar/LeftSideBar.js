import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { FcHome } from '@react-icons/all-files/fc/FcHome';
import { FcReading } from '@react-icons/all-files/fc/FcReading';
import { FaTags } from '@react-icons/all-files/fa/FaTags';
import { FcIdea } from '@react-icons/all-files/fc/FcIdea';
import { FaDev } from '@react-icons/all-files/fa/FaDev';
import { GrContact } from '@react-icons/all-files/gr/GrContact';
import About from '../About/About';
import './LeftSideBar.css';

const LeftSideBar = () => {
  const auth = useContext(AuthContext);
  const { currentUser } = auth;
  const currentUserId = currentUser && currentUser.userId;

  return (
    <>
      <div className='sidebar sidebar--left'>
        <React.Fragment>
          <About />
          <ul className='sidebar__list'>
            <li className='list__item hvr-bg-lt'>
              <NavLink to='/' exact>
                <i>
                  <FcHome />
                </i>
                <span>Home</span>
              </NavLink>
            </li>
            {currentUserId && (
              <li className='list__item hvr-bg-lt'>
                <NavLink to={`/users/${currentUserId}/readinglist`} exact>
                  <i>
                    <FcReading />
                  </i>
                  Reading List
                </NavLink>
              </li>
            )}
            <li className='list__item hvr-bg-lt'>
              <NavLink to='/tags' exact>
                <i>
                  <FaTags />
                </i>
                Tags
              </NavLink>
            </li>
            <li className='list__item hvr-bg-lt'>
              <NavLink to='/FAQ' exact>
                <i>
                  <FcIdea />
                </i>
                FAQ
              </NavLink>
            </li>
            <li className='list__item hvr-bg-lt'>
              <NavLink to='/About' exact>
                <i>
                  <FaDev />
                </i>
                About
              </NavLink>
            </li>
            <li className='list__item hvr-bg-lt'>
              <NavLink to='/Contact' exact>
                <i>
                  <GrContact />
                </i>
                Contact
              </NavLink>
            </li>
          </ul>
          <div className='sidebar-tags'>
            {currentUser && currentUser.tags && currentUser.tags.length > 0 && (
              <>
                <h3>My Tags</h3>
                <ul className='sidebar-tags-list'>
                  {currentUser.tags.map((tag, i) => (
                    <li key={i} className='list__item hvr-bg-lt'>
                      <Link to={`/tags/${tag.name}`}>#{tag.name}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </React.Fragment>
      </div>
    </>
  );
};

export default LeftSideBar;
