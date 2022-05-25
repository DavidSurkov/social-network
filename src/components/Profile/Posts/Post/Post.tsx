import React from 'react';
import styled from 'styled-components';

//Styles
const PostStyle = styled.div`
  margin: 10px 0;
  border: 1px dashed #014d55;
  font-size: 20px;
  font-style: italic;
  padding: 5px;
`;
const Like = styled.div`
  display: flex;
  justify-content: flex-end;
  color: wheat;
  img {
    max-width: 20px;
    min-height: 20px;
    border-radius: 50%;
  }
`;
const Avatar = styled.span`
  img {
    max-width: 70px;
    min-height: 40px;
    border-radius: 50%;
  }
`;
const DeleteButton = styled.button`
  margin: 5px;
`;

interface IPost {
  id: number;
  message: string;
  likes: number;
  deletePost: (id: number) => void;
}
export const Post = (props: IPost) => {
  const onClickHandler = () => {
    props.deletePost(props.id);
  };
  return (
    <PostStyle>
      <Avatar>
        <img src={'https://i.pinimg.com/originals/32/3b/c2/323bc2e28f35a760b8d7afe48f3ffe48.png'} alt={'Avatar'} />
      </Avatar>
      <span>{props.message}</span>
      <DeleteButton onClick={onClickHandler}>X</DeleteButton>
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
