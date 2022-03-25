import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { AuthContext } from '../../context/auth';
import { SearchContext } from '../../context/search';
import { SocketContext } from '../../context/socket';
import useAuth from '../../hooks/useAuth';
import '../../App.css';

const AppProviders = ({ children }) => {
  const { token, login, logout, userId, user, setUser } = useAuth();
  const [searched, setSearched] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const socket = useRef();

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(process.env.REACT_APP_SOCKET_IO_URL);
    }

    if (socket.current && userId) {
      socket.current.emit('join', {
        userId: userId,
      });
    }
  }, [socket, userId]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        login,
        logout,
        currentUser: user,
        setUser,
      }}
    >
      <SearchContext.Provider
        value={{
          searched,
          setSearched,
          searchValue,
          setSearchValue,
          searchResults,
          setSearchResults,
        }}
      >
        <SocketContext.Provider value={{ socket }}>
          {children}
        </SocketContext.Provider>
      </SearchContext.Provider>
    </AuthContext.Provider>
  );
};

export default AppProviders;
