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
  posts: Array<IPosts>;
  profile: IUserProfile;
  status: string;
  updateProfileStatusTC: (status: string) => void;
}
export function Profile(props: IProfile) {
  return (
    <ProfileStyle>
      <Banner />
      <ProfileDescription
        profile={props.profile}
        status={props.status}
        updateProfileStatusTC={props.updateProfileStatusTC}
      />
      <MyPostsContainer />
    </ProfileStyle>
  );
}
