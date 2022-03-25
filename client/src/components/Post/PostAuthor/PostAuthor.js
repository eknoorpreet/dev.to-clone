import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/auth';
import Avatar from '../../Avatar/Avatar';
import { FollowUser } from '../../FollowUser/FollowUser';
import { AuthorInfo } from '../../AuthorInfo/AuthorInfo';

const PostAuthor = ({ setShowModal, author }) => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser && currentUser.userId;
  return (
    <div className='author flow-content'>
      <div className='author__content'>
        <Avatar link={`/users/${author.id}`} src={author.avatar} />
        <div className='author__details'>
          <h3>{author.name}</h3>
        </div>
      </div>
      {currentUserId === author.id ? (
        <Link
          className='btn btn--profile-cta btn--profile-edit'
          to={`/users/${author.id}/edit`}
        >
          Edit Profile
        </Link>
      ) : (
        <FollowUser
          followId={author.id}
          setShowModal={setShowModal}
          followers={author.followers}
          userToFollow={author}
        />
      )}
      <AuthorInfo author={author} />
    </div>
  );
};

export default PostAuthor;
