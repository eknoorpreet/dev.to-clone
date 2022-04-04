import React from 'react';
import { renderRepeatedSkeletons } from '../../utils';
import SkeletonElement from './SkeletonElement';
import Shimmer from './Shimmer';

export const SkeletonTags = () => {
  return (
    <>
      {renderRepeatedSkeletons(
        <div className='skeleton__tag-item'>
          {renderRepeatedSkeletons(<SkeletonElement type='text' />, 4)}
        </div>,
        10
      )}
      <Shimmer />
    </>
  );
};

export default SkeletonTags;
