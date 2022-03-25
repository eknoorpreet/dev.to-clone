import React from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className='welcome'>
      <h2 className='welcome__title'>Welcome to DEV Community</h2>
      <p className='welcome__slogan'>
        <Link to='/'>DEV Community</Link> is a community of 748,239 amazing
        developers
      </p>
    </div>
  );
};

export default Welcome;
