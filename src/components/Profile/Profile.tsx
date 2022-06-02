import React from 'react';
import '../../App.css';
import { Banner } from './Banner/Banner';
import { ProfileDescription } from './ProfileDescription/ProfileDescription';
import styled from 'styled-components';
import { MyPostsContainer } from './Posts/MyPostsContainer';
import { IPosts, IUserProfile, ProfileFormEnum } from '../../redux/profile_reducer';
import { IContactsForm } from './ProfileDescription/Contacts';
import { IAboutMeForm } from './ProfileDescription/AboutMeDescription';

//Styles
const ProfileStyle = styled.div``;
//Types
interface IProfile {
  posts: Array<IPosts>;
  profile: IUserProfile;
  status: string;
  updateProfileStatusTC: (status: string) => void;
  updateProfilePhotoTC: (photo: Blob | string) => void;
  isOwner: boolean;
  saveProfileTC: (profileData: IContactsForm | IAboutMeForm, updateFlag: ProfileFormEnum) => void;
}
//JSX
export function Profile(props: IProfile) {
  return (
    <ProfileStyle>
      <Banner />
      <ProfileDescription
        profile={props.profile}
        status={props.status}
        updateProfileStatusTC={props.updateProfileStatusTC}
        updateProfilePhotoTC={props.updateProfilePhotoTC}
        isOwner={props.isOwner}
        saveProfileTC={props.saveProfileTC}
      />
      <MyPostsContainer />
    </ProfileStyle>
  );
}
