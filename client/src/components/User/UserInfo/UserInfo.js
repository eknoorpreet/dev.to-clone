import { FaBirthdayCake } from '@react-icons/all-files/fa/FaBirthdayCake';
import { GoLocation } from '@react-icons/all-files/go/GoLocation';
import { GrMail } from '@react-icons/all-files/gr/GrMail';
import { MdWork } from '@react-icons/all-files/md/MdWork';
import React from 'react';
import './UserInfo.css';

export const UserInfo = ({ user }) => {
  return (
    <div className='user__info'>
      {user.bio && (
        <div className='info__bio'>
          <p>{user.bio}</p>
        </div>
      )}
      <div className='info__other'>
        {user.location && (
          <div className='user__location'>
            <i>
              <GoLocation size='2.5rem' />
            </i>
            <p>{user.location}</p>
          </div>
        )}
        {user.links && (
          <div className='user__links'>
            <i>
              <GrMail size='2.5rem' />
            </i>
            <p>{user.links}</p>
          </div>
        )}
        {user.work && (
          <div className='user__work'>
            <i>
              <MdWork size='2.5rem' />
            </i>
            <p>{user.work}</p>
          </div>
        )}
        {user.doB && (
          <div className='user__doB'>
            <i>
              <FaBirthdayCake size='2.5rem' />
            </i>
            <p>{user.doB}</p>
          </div>
        )}
      </div>
    </div>
  );
};
