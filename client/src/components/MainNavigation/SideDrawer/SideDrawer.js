import React from 'react';
import ReactDOM from 'react-dom';
import { GrFormClose } from '@react-icons/all-files/gr/GrFormClose';
import LeftSidebar from '../../LeftSideBar/LeftSideBar';
import './SideDrawer.css';

const SideDrawer = (props) => {
  const content = (
    <aside className='side-drawer' onClick={props.onClick}>
      <div className='drawer__content'>
        <div className='side-drawer__top'>
          <h3>DEV Community</h3>
          <i onClick={props.onClose}>
            <GrFormClose />
          </i>
        </div>
        <LeftSidebar />
      </div>
    </aside>
  );
  return ReactDOM.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
