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
      <Post />
      <Post />
      <Post />
    </>
  );
};

export default MyPosts;
