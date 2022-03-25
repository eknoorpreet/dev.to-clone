import React from 'react';
import { NavLink } from 'react-router-dom';

export const GuestNavLinks = (props) => {
  if (props.loginFirst) {
    return (
      <React.Fragment>
        <li className='list__item list__item--mobile hvr-bg-lt'>
          <NavLink className='login-link' to='/auth' exact>
            Log in
          </NavLink>
        </li>
        <li className='list__item item--create'>
          <NavLink className='create-link' to='/auth/new-user' exact>
            Create account
          </NavLink>
        </li>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <li className='list__item item--create'>
          <NavLink className='create-link' to='/auth/new-user' exact>
            Create account
          </NavLink>
        </li>
        <li className='list__item list__item--mobile hvr-bg-lt'>
          <NavLink className='login-link' to='/auth' exact>
            Log in
          </NavLink>
        </li>
      </React.Fragment>
    );
  }
};
