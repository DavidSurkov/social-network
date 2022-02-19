import React from 'react';
import { PostStyle } from './PostStyle';
import { Like, Avatar } from './PostStyle';

interface IPost {
  message: string;
  likes: number;
}
export const Post = (props: IPost) => {
  return (
    <PostStyle>
      <Avatar
        src={'https://shapka-youtube.ru/wp-content/uploads/2021/02/prikolnaya-avatarka-dlya-patsanov.jpg'}
        alt={'Avatar'}
      />
      <span>{props.message}</span>
      <Like>
        <span>{props.likes}</span>
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/000/420/238/small/Multimedia__28407_29.jpg"
          alt="like"
        />
      </Like>
    </PostStyle>
  );
};
