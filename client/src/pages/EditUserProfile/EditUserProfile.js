import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/useHttpClient';
import { AuthContext } from '../../context/auth';
import useForm from '../../hooks/useForm';
import ErrorModal from '../../components/Modal/ErrorModal';
import SkeletonForm from '../../components/Skeleton/SkeletonForm';

import {
  editProfileForm,
  prefillEditProfileForm,
} from '../../utils/formConfig';
import { appendData } from '../../utils';

const EditUserProfile = () => {
  const [user, setUser] = useState({});
  const { renderFormInputs, renderFormValues, setForm } =
    useForm(editProfileForm);
  const history = useHistory();
  const { sendReq, isLoading, error, clearError } = useHttpClient();
  const { userId } = useParams();
  let auth = useContext(AuthContext);
  const { currentUser } = auth;
  let formValues = renderFormValues();
  let formInputs = renderFormInputs();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/users/${userId}`
        );
        // if (currentUser.userId !== responseData.user.id) {
        //   history.push("/");
        // }
        prefillEditProfileForm(responseData.user);
        setUser(responseData.user);
        setForm(editProfileForm);
      } catch (err) {}
    };
    fetchUser();
  }, [sendReq, userId, setForm, currentUser, history]);

  const infoSubmitHandle = async (evt) => {
    evt.preventDefault();
    const formData = appendData(formValues);
    try {
      const responseData = await sendReq(
        `${process.env.REACT_APP_BASE_URL}/users/${userId}`,
        'PATCH',
        formData,
        {
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      const { name, bio, email, profilePic } = responseData.user;
      const { setUser: setAppUser } = auth;
      setAppUser({ ...currentUser, name, bio, email, profilePic });
      history.push(`/users/${userId}`);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <div className='container-edit-page'>
        {isLoading ? (
          <SkeletonForm />
        ) : (
          <form className='form form__edit' onSubmit={infoSubmitHandle}>
            <h2>Edit Profile</h2>
            {!isLoading && user.avatar && formInputs}
            <button onClick={infoSubmitHandle} className='btn btn-submit'>
              Update Profile
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditUserProfile;
