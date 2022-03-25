import React from 'react';
import './UserSideBar.css';

export const UserSideBar = ({ user }) => {
  return (
    <div className='user__side'>
      <div className='user__skills'>
        <h4>Skills/languages</h4>
        <p>{user.skills}</p>
      </div>
      <div className='user__stats'>
        <h4>Stats</h4>

        <ul>
          <li>{user.posts && user.posts.length} posts published</li>
          <li>{user.comments && user.comments.length} comments written</li>
          <li>{user.followedTags && user.followedTags.length} tags followed</li>
        </ul>
      </div>
    </div>
  );
};
