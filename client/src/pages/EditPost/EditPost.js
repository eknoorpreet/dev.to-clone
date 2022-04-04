import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useHttpClient } from '../../hooks/useHttpClient';
import { AuthContext } from '../../context/auth';
import useForm from '../../hooks/useForm';
import { editPostForm, prefillEditPostForm } from '../../utils/formConfig';
import { appendData } from '../../utils';
import ErrorModal from '../../components/Modal/ErrorModal';
import SkeletonForm from '../../components/Skeleton/SkeletonForm';

const EditPost = () => {
  const { sendReq, isLoading, error, clearError } = useHttpClient();
  const { currentUser } = useContext(AuthContext);
  const [loadedPost, setLoadedPost] = useState({});
  const { postId, titleURL } = useParams();
  const history = useHistory();
  const { renderFormInputs, renderFormValues, setForm, isFormValid } =
    useForm(editPostForm);
  let formValues = renderFormValues();
  let formInputs = renderFormInputs();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts/${titleURL}/${postId}`
        );
        prefillEditPostForm(responseData.post);
        if (currentUser.userId !== responseData.post.author.id) {
          history.push('/');
        }
        setLoadedPost(responseData.post);
        await setForm(editPostForm);
      } catch (err) {}
    };
    fetchPost();
  }, [sendReq, postId, titleURL, setForm, currentUser, history]);

  const postSubmitHandle = async (evt) => {
    evt.preventDefault();
    const formData = appendData(formValues);
    formData.append('author', currentUser.userId);
    try {
      await sendReq(
        `${process.env.REACT_APP_BASE_URL}/posts/${titleURL}/${postId}`,
        'PATCH',
        formData,
        {
          Authorization: `Bearer ${currentUser.token}`,
        }
      );
      history.push(`/posts/${titleURL}/${postId}`);
    } catch (err) {}
  };

  return (
    <>
      <ErrorModal error={error} onClose={clearError} />

      <div className='container-edit-page'>
        {isLoading ? (
          <SkeletonForm />
        ) : (
          <form className='form form__edit'>
            <h2>Edit Post</h2>
            {!isLoading && loadedPost.image && loadedPost.body && formInputs}
            <button
              type='button'
              onClick={postSubmitHandle}
              className='btn btn-submit'
              disabled={!isFormValid()}
            >
              Update Post
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default EditPost;
