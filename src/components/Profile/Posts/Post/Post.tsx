import React from 'react';
import { PostStyle } from './PostStyle';

export const Post = () => {
  return (
    <PostStyle>
      <img
        src={'https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg'}
        alt={'Avatar'}
      />
      <span>Post</span>
    </PostStyle>
  );
};
