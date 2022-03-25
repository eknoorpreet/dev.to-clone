import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <p>
        DEV.from is a clone of{' '}
        <a href='https://dev.to/' className='hvr-underline'>
          DEV.to
        </a>{' '}
        (A constructive and inclusive social network for software developers)
      </p>
      <p>
        Made with love and{' '}
        <a href='https://github.com/facebook/react' className='hvr-underline'>
          React
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
