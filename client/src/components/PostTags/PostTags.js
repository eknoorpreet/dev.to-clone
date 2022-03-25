import React from 'react';
import { Link } from 'react-router-dom';
import { getRandomColor } from '../../utils';

export const PostTags = ({ tags }) => {
  return (
    <ul className='preview__tags'>
      {tags &&
        tags.map((tag, i) => (
          <li key={i} className='preview__tag preview__tag--post'>
            <Link to={`/tags/${tag.name}`}>
              <span style={{ color: getRandomColor() }}>#</span>
              {tag.name}
            </Link>
          </li>
        ))}
    </ul>
  );
};
