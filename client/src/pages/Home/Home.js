import React, { useState, useEffect } from 'react';
import Posts from '../../components/Post/Posts';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import useHttpClient from '../../hooks/useHttpClient';

const Home = () => {
  const [tags, setTags] = useState([]);
  const { sendReq } = useHttpClient();
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/tags/home`
        );
        setTags(responseData.tags);
      } catch (err) {}
    };
    fetchPosts();
  }, [sendReq]);

  return (
    <div className='container-layout'>
      <div className='container-sidebar'>
        <LeftSideBar />
      </div>
      <Posts cover={true} />
      <RightSideBar tags={tags} />
    </div>
  );
};

export default Home;
