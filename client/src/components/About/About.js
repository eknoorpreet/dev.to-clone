import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import { GuestNavLinks } from '../MainNavigation/NavLinks/GuestNavLinks';
import './About.css';

const About = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div className='about'>
      <p className='about__bold'>
        <Link to='/' className='about__bold--co hvr-underline'>
          DEV Community
        </Link>{' '}
        is a community of 743,999 amazing developers
      </p>
      <p>
        We're a place where coders share, stay up-to-date and grow their
        careers.
      </p>
      <ul className='about__links'>{!isLoggedIn && <GuestNavLinks />}</ul>
    </div>
  );
};

export default About;
