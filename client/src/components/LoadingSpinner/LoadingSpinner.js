import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && 'spinner--overlay'}`}>
      <div className='spinner'></div>
    </div>
  );
};

export default LoadingSpinner;
