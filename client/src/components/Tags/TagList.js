import React from 'react';
import TagItem from './TagItem';

const TagList = (props) => {
  if (props.tags.length === 0) {
    return <div>No posts found!</div>;
  }
  return (
    <div className='container tags'>
      {props.tags.map((tag, index) => (
        <TagItem
          name={tag.name}
          id={tag.id}
          key={tag.id}
          followers={tag.followers}
        />
      ))}
    </div>
  );
};

export default TagList;
