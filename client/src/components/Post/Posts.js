import React, { useState, useEffect } from 'react';
import ErrorModal from '../../components/Modal/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import useHttpClient from '../../hooks/useHttpClient';
import PostList from '../PostList/PostList';
const Posts = ({ cover }) => {
  const [loadedPosts, setLoadedPosts] = useState([]);
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/posts`
        );
        setLoadedPosts(responseData.posts);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendReq]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <ErrorModal error={error} onClose={clearError} />
      {!isLoading && loadedPosts && (
        <PostList isLoading={isLoading} items={loadedPosts} cover={cover} />
      )}
    </>
  );
};

export default Posts;
