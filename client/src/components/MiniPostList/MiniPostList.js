import React from 'react';
import { Link } from 'react-router-dom';

const MiniPostList = (props) => {
  if (props.posts?.length === 0) {
    return <div>No posts found!</div>;
  }

  return (
    <>
      <div className={props.tag}>
        <h3>#{props.tag}</h3>
        <ul>
          {props.posts &&
            props.posts.map((post, i) => (
              <div className='post__item' key={post.id}>
                <Link
                  className='title-link'
                  to={`/posts/${post.titleURL}/${post.id}`}
                >
                  {post.title}
                </Link>
              </div>
            ))}
        </ul>
      </div>
    </>
  );
};

export default MiniPostList;
