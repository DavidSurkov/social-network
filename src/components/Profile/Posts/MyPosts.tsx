import React from 'react';
import { Post } from './Post/Post';
import { MyPostsStyle } from './MyPostsStyle';

export const MyPosts = () => {
  return (
    <>
      <MyPostsStyle>
        my postsS
        <div>New post</div>
        <input />
        <button>Add New Post</button>
      </MyPostsStyle>
      <Post message={'Good afternoon'} likes={7} />
      <Post message={'I would like to say something'} likes={5} />
      <Post message={'But I will not'} likes={1} />
    </>
  );
};

export default MyPosts;
