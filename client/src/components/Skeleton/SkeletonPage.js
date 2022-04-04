import React from 'react';
import { renderRepeatedSkeletons } from '../../utils';
import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

export const SkeletonPage = () => {
  return (
    <div className='skeleton-container'>
      <div className='skeleton-wrapper skeleton--page'>
        <div className='skeleton-profile skeleton--post'>
          <SkeletonElement type='thumbnail' />
          <SkeletonElement type='title' />
          {renderRepeatedSkeletons(<SkeletonElement type='text' />, 17)}
          <SkeletonElement type='thumbnail' />
          <Shimmer />
        </div>
        <div className='skeleton--author'>
          <SkeletonElement type='title' />
          <SkeletonElement type='title' />
          {renderRepeatedSkeletons(<SkeletonElement type='text' />, 14)}
          <Shimmer />
        </div>
      </div>
    </div>
  );
};
