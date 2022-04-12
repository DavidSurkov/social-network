import React from 'react';
import '../../App.css';
import { Banner } from './Banner/Banner';
import { ProfileDescription } from './ProfileDescription/ProfileDescription';
import styled from 'styled-components';
import { MyPostsContainer } from './Posts/MyPostsContainer';

//Styles
const ProfileStyle = styled.div``;

interface IProfiles {
  //profileData: IProfile;
}
export function Profile() {
  return (
    <ProfileStyle>
      <Banner />
      <ProfileDescription />
      <MyPostsContainer />
    </ProfileStyle>
  );
}
