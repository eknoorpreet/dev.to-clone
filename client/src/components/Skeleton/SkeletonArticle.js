import React from 'react';
import { renderRepeatedSkeletons } from '../../utils';
import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';
import './SkeletonElement.css';

const SkeletonArticle = ({ type, firstEl }) => {
  const miniArticle = type === 'mini' || !firstEl;
  return (
    <div className='skeleton-wrapper'>
      <div className='skeleton-article'>
        {miniArticle ? (
          <SkeletonElement type='title' />
        ) : (
          <SkeletonElement type='thumbnail' />
        )}
        {renderRepeatedSkeletons(<SkeletonElement type='text' />, 3)}
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonArticle;
