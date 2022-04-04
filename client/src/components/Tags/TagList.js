import React from 'react';
import TagItem from './TagItem';
import SkeletonTags from '../Skeleton/SkeletonTags';

const TagList = (props) => {
  if (!props.isLoading && props.tags && props.tags.length === 0) {
    return <div className='center'>No tags found!</div>;
  }

  return (
    <div className='container tags'>
      {props.isLoading && <SkeletonTags />}
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
