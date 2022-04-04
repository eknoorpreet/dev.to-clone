import React from 'react';
import { renderAlternateSkeletons } from '../../utils';
import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';
import './SkeletonElement.css';

const SkeletonForm = ({ type }) => {
  return (
    <>
      {renderAlternateSkeletons(
        <SkeletonElement type='span' />,
        <SkeletonElement type='text' />,
        20
      )}
      <Shimmer />
    </>
  );
};

export default SkeletonForm;
