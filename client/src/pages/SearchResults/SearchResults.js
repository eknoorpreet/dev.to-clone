import React, { useContext } from 'react';
import PostList from '../../components/PostList/PostList';
import { SearchContext } from '../../context/search';

const SearchResults = (props) => {
  const searchContext = useContext(SearchContext);
  const { searched, searchResults, searchValue } = searchContext;

  return (
    <>
      <div className='container-posts container-search-results'>
        <h2 className='results__heading'>Search results for "{searchValue}"</h2>
        {searched && (
          <PostList
            cover={false}
            items={searchResults}
            onDeletePost={[]}
            searched={searched}
          />
        )}
      </div>
    </>
  );
};

export default SearchResults;
