import React from 'react';
import { Link } from 'react-router-dom';

export const PostImage = (props) => {
  if (props.link) {
    return (
      <div className={`preview__image ${props.className}`}>
        <Link to={props.link}>
          <img src={props.src} alt={props.alt} />
        </Link>
      </div>
    );
  }
  return (
    <div className={`post__image ${props.className}`}>
      <img src={props.src} alt={props.alt} />
    </div>
  );
};
