import React from 'react';
import '../../App.css';
import { Banner } from './Banner/Banner';
import { ProfileDescription } from './ProfileDescription/ProfileDescription';
import styled from 'styled-components';
import { MyPostsContainer } from './Posts/MyPostsContainer';
import { IPosts, IUserProfile } from '../../redux/profile_reducer';

//Styles
const ProfileStyle = styled.div``;

interface IProfile {
  textForNewPost: string;
  posts: Array<IPosts>;
  profile: IUserProfile;
}
export function Profile(props: IProfile) {
  return (
    <ProfileStyle>
      <Banner />
      <ProfileDescription profile={props.profile} />
      <MyPostsContainer />
    </ProfileStyle>
  );
}
