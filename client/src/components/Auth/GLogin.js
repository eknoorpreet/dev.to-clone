import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { FcGoogle } from '@react-icons/all-files/fc/FcGoogle';
import useHttpClient from '../../hooks/useHttpClient';

const GLogin = (props) => {
  const [showLoginButton, setShowLoginButton] = useState(true);
  const { setError } = useHttpClient();

  const onLoginSuccess = (res) => {
    props.onLogin(res);
    setShowLoginButton(false);
  };

  const onLoginFailure = (res) => {
    setError('Login with Google failed. Please try again!', res);
  };

  return (
    <div className='auth__google'>
      {showLoginButton && (
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          render={(renderProps) => (
            <button
              className='btn btn__social'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <i>
                <FcGoogle />
              </i>
              <span>Continue with Google</span>
            </button>
          )}
          buttonText='Login'
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
        />
      )}
    </div>
  );
};

export default GLogin;
