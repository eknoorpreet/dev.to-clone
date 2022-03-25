import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  currentUser: {},
  login: () => {},
  logout: () => {},
});
