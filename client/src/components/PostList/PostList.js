import React from 'react';
import PostPreview from '../PostPreview/PostPreview';
import './PostList.css';

const PostList = (props) => {
  if (props.items.length === 0) {
    return <div>No posts found!</div>;
  }
  return (
    <div className='container container-posts'>
      <ul>
        {props.items &&
          props.items.map((post, i) => {
            return (
              <PostPreview
                cover={i === 0 ? props.cover : false}
                key={post.id}
                id={post.id}
                title={post.title}
                body={post.body}
                image={post.image}
                imgAlt={post.imgAlt}
                date={post.date}
                author={props.author || post.author}
                tags={post.tags}
                titleURL={post.titleURL}
                likes={post.likes}
                unicorns={post.unicorns}
                bookmarks={post.bookmarks}
                comments={post.comments}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default PostList;
