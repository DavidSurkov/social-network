import React, { ChangeEvent } from 'react';
import { Post } from './Post/Post';
import styled from 'styled-components';
import { IProfile } from '../../../redux/profile_reducer';

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
    height: 30px;
    width: 150px;
    color: wheat;
    background: darkolivegreen;
  }
`;

interface IPost {
  profileData: IProfile;
  changeNewText: (text: string) => void;
  addPost: () => void;
}
export const MyPosts = (props: IPost) => {
  const postsElements = props.profileData.posts.map((p) => (
    <Post key={p.id} id={p.id} message={p.text} likes={p.likeCounter} />
  ));

  const newPostElementHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    props.changeNewText(e.currentTarget.value);
    //const newText = e.currentTarget.value;
    //props.dispatch({ type: 'CHANGE-NEW-TEXT', newText: e.currentTarget.value });
    //props.dispatch(changeNewTextAC(e.currentTarget.value));
  };
  const addPostCallback = () => {
    props.addPost();
  };
  return (
    <>
      <MyPostsStyle>
        <h2>My posts</h2>
        <div>New post</div>
        <textarea value={props.profileData.textForNewPost} onChange={newPostElementHandler} />
        <button onClick={addPostCallback}>Add New Post</button>
      </MyPostsStyle>
      {postsElements}
    </>
  );
};
