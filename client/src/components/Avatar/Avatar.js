import React from 'react';
import { Link } from 'react-router-dom';
import './Avatar.css';

const Avatar = (props) => {
  if (props.link) {
    return (
      <div className={`author__image ${props.className}`}>
        <Link to={props.link}>
          <img src={props.src} alt={props.alt ? props.alt : 'avatar'} />
        </Link>
      </div>
    );
  }
  return (
    <div className={`author__image ${props.className}`}>
      <img src={props.src} alt={props.alt ? props.alt : 'avatar'} />
    </div>
  );
};

export default Avatar;
