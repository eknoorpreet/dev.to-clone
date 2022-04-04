import { createContext } from 'react';

export const SearchContext = createContext({
  // searched: false,
  searchValue: '',
  searchResults: [],
});
