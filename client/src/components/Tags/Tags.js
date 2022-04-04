import React, { useState, useEffect } from 'react';
import { useHttpClient } from '../../hooks/useHttpClient';
import ErrorModal from '../../components/Modal/ErrorModal';
import TagList from './TagList';
import './Tags.css';

const Tags = () => {
  const [loadedTags, setLoadedTags] = useState([]);
  const { isLoading, sendReq, error, clearError } = useHttpClient();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/tags/`
        );
        setLoadedTags(responseData.tags);
      } catch (err) {}
    };
    fetchTags();
  }, [sendReq]);
  return (
    <>
      <ErrorModal error={error} onClose={clearError} />
      <TagList isLoading={isLoading} tags={loadedTags} />
    </>
  );
};

export default Tags;
