import React from 'react';
import './AuthorInfo.css';

export const AuthorInfo = ({ author, date, status }) => {
  if (status === 'preview') {
    return (
      <div className='author__details'>
        <p className='author__name'>{author.name}</p>
        <p className='author__date'>{date}</p>
      </div>
    );
  }
  return (
    <>
      {author.bio && (
        <div className='author__bio'>
          <p>{author.bio}</p>
        </div>
      )}
      {author.skills && (
        <div className='author__skills'>
          <h4>Skills/Languages</h4>
          <p>{author.skills}</p>
        </div>
      )}
      {author.location && (
        <div className='author__location'>
          <h4>Location</h4>
          <p>{author.location}</p>
        </div>
      )}
      {author.work && (
        <div className='author__work'>
          <h4>Work</h4>
          <p>{author.work}</p>
        </div>
      )}
      {author.doB && (
        <div className='author__doB'>
          <h4>Joined</h4>
          <p>{author.doB}</p>
        </div>
      )}
    </>
  );
};
