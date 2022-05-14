import React from 'react';
import { Post } from './Post/Post';
import styled from 'styled-components';
import { IProfile } from '../../../redux/profile_reducer';
import { useForm } from 'react-hook-form';

//Styles
export const MyPostsStyle = styled.div`
  margin: 50px 0;

  textarea {
    font-size: 20px;
    display: block;
    min-width: 600px;
    min-height: 100px;
  }
  button {
    font-size: 20px;
  }
`;
const ErrorText = styled.div`
  color: red;
`;

interface IPost {
  profileData: IProfile;
  addPost: (data: { post: string }) => void;
}
type FormType = {
  post: string;
};
export const MyPosts = (props: IPost) => {
  const postsElements = props.profileData.posts.map((p) => (
    <Post key={p.id} id={p.id} message={p.text} likes={p.likeCounter} />
  ));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>();
  const onSubmit = (data: FormType) => {
    props.addPost(data);
    reset();
  };
  return (
    <>
      <MyPostsStyle>
        <h2>My posts</h2>
        <div>New post</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea {...register('post', { maxLength: 50 })} />
          {errors.post && <ErrorText>Max length is 50 symbols</ErrorText>}
          <button>Add post</button>
        </form>
      </MyPostsStyle>
      {postsElements}
    </>
  );
};
