import React from 'react';
import LoginGithub from 'react-login-github';
import { AiFillGithub } from '@react-icons/all-files/ai/AiFillGithub';

const GHLogin = (props) => {
  const onSuccess = (res) => {
    console.log(res);
    props.onLogin(res);
  };

  const onFailure = (res) => {
    console.log(res);
  };

  const buttonText = (
    <>
      <i>
        <AiFillGithub />
      </i>
      <span>Continue with GitHub</span>
    </>
  );

  return (
    <LoginGithub
      className='btn btn__social btn--gh'
      buttonText={buttonText}
      clientId={process.env.REACT_APP_GITHUB_CLIENT_ID}
      onSuccess={onSuccess}
      onFailure={onFailure}
    />
  );
};

export default GHLogin;
