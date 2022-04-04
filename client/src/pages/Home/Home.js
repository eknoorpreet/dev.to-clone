import React, { useState, useEffect, useContext } from 'react';
import Posts from '../../components/Post/Posts';
import RightSideBar from '../../components/RightSideBar/RightSideBar';
import LeftSideBar from '../../components/LeftSideBar/LeftSideBar';
import useHttpClient from '../../hooks/useHttpClient';
import { AuthContext } from '../../context/auth';

const Home = () => {
  const [tags, setTags] = useState([]);
  const { sendReq, isLoading } = useHttpClient();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const handleTwitterAuth = async () => {
      const responseData = await sendReq(
        `${process.env.REACT_APP_BASE_URL}/users/auth/twitter/success`,
        'GET',
        null,
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
        'include'
      );
      login(responseData.user);
    };
    handleTwitterAuth();
  }, [sendReq, login]);

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
      <RightSideBar tags={tags} isLoading={isLoading} />
    </div>
  );
};

export default Home;
