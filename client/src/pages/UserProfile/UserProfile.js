import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useHttpClient } from '../../hooks/useHttpClient';
import PostList from '../../components/PostList/PostList';
import ErrorModal from '../../components/Modal/ErrorModal';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { FollowUser } from '../../components/FollowUser/FollowUser';
import AuthModal from '../../components/Modal/AuthModal';
import Avatar from '../../components/Avatar/Avatar';
import { UserInfo } from '../../components/User/UserInfo/UserInfo';
import { UserSideBar } from '../../components/User/UserSideBar/UserSideBar';
import { AuthContext } from '../../context/auth';

const UserProfile = () => {
  const [user, setUser] = useState({});
  // const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { isLoading, sendReq, error, clearError } = useHttpClient();
  const { userId } = useParams();
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;

  const { posts } = user;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const responseData = await sendReq(
          `${process.env.REACT_APP_BASE_URL}/users/${userId}`
        );
        setUser(responseData.user);
        // setPosts(responseData.posts);
      } catch (err) {}
    };
    fetchUser();
  }, [sendReq, userId]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <ErrorModal error={error} onClose={clearError} />
      <AuthModal onClose={() => setShowModal(false)} show={showModal} />
      {!isLoading && (
        <div className='container-layout container-user'>
          <div className='user__main'>
            <Avatar src={user.avatar} />
            <div className='main__cta'>
              <h2>{user.name}</h2>
              {userId === currentUserId ? (
                <Link
                  className='btn btn--profile-cta btn--profile-edit'
                  to={`/users/${userId}/edit`}
                >
                  Edit Profile
                </Link>
              ) : (
                <FollowUser
                  followId={user.id}
                  followers={user.followers}
                  userToFollow={user}
                  setShowModal={setShowModal}
                />
              )}
            </div>
            <UserInfo user={user} />
          </div>
          <div className='user__content'>
            <UserSideBar user={user} />
            <div className='wrapper__user--posts'>
              {posts && <PostList cover={false} items={posts} author={user} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
