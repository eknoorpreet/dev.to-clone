import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/auth';
import useHttpClient from '../../hooks/useHttpClient';
import { checkInArray } from '../../utils';

export const FollowTag = ({ followers, tagId, setShowModal }) => {
  const auth = useContext(AuthContext);
  const { currentUser } = auth;
  const currentUserId = currentUser && currentUser.userId;
  const { sendReq } = useHttpClient();

  const [following, setFollowing] = useState(false);

  useEffect(() => {
    setFollowing(checkInArray(followers, currentUserId));
  }, [followers, currentUserId]);

  const handleFollow = () => {
    !currentUserId ? setShowModal(true) : followTag(tagId);
  };

  const followTag = async (tagId) => {
    let action = following ? 'unfollow' : 'follow';
    setFollowing((following) => !following);
    const reqData = { userId: currentUserId, tagId };
    try {
      const responseData = await sendReq(
        `${process.env.REACT_APP_BASE_URL}/tags/${tagId}/${action}`,
        'PUT',
        JSON.stringify(reqData),
        {
          Authorization: `Bearer ${currentUser.token}`,
          'Content-Type': 'application/json',
        }
      );
      const { followedTags } = responseData.user;
      const { setUser: setAppUser } = auth;
      setAppUser({ ...currentUser, tags: followedTags });
    } catch (err) {}
  };
  return (
    <button
      className={`btn btn-tag-follow ${following ? 'btn-following' : ''}`}
      onClick={handleFollow}
    >
      {following ? 'Following' : 'Follow'}
    </button>
  );
};
