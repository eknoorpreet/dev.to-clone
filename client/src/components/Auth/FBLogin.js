import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { AiFillFacebook } from '@react-icons/all-files/ai/AiFillFacebook';

const FBLogin = (props) => {
  const responseFacebook = async (response) => {
    props.onLogin(response);
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FB_APP_ID}
      autoLoad={false}
      callback={responseFacebook}
      render={(renderProps) => (
        <button
          className='btn btn__social btn--fb'
          onClick={renderProps.onClick}
        >
          <i>
            <AiFillFacebook />
          </i>
          <span>Continue with Facebook</span>
        </button>
      )}
    />
  );
};

export default FBLogin;
