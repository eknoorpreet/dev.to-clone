import React, { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';

import MainHeader from './MainHeader';
import Nav from './Nav/Nav';

const MainNavigation = (props) => {
  const [showSearchOnMobile, setShowSearchOnMobile] = useState(false);
  const onSearchIconClick = () => {
    setShowSearchOnMobile(!showSearchOnMobile);
  };

  return (
    <>
      <MainHeader>
        <Nav onSearchIconClick={onSearchIconClick}>
          <SearchBar showSearchOnMobile={false} />
        </Nav>
        <div className='search-mobile-container'>
          <SearchBar showSearchOnMobile={showSearchOnMobile} />
        </div>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
