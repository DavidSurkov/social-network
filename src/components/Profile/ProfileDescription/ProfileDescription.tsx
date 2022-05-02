import React from 'react';
import { IUserProfile } from '../../../redux/profile_reducer';
import altPhoto from '../../../images/dialogAvatar1.jpg';
import { Preloader } from '../../Common/Preloader';
import styled from 'styled-components';
import { ProfileStatus } from './ProfileStatus';

const StatusBlock = styled.div``;
interface IProfileDescription {
  profile: IUserProfile;
  status: string;
  updateProfileStatusTC: (status: string) => void;
}
export const ProfileDescription = (props: IProfileDescription) => {
  if (!props.profile.photos) {
    return <Preloader />;
  }
  return (
    <>
      <StatusBlock>
        {props.profile.photos.large ? (
          <img src={props.profile.photos.large} alt={altPhoto} />
        ) : (
          <img src={altPhoto} alt={altPhoto} />
        )}
        <ProfileStatus status={props.status} updateProfileStatusTC={props.updateProfileStatusTC} />
      </StatusBlock>
      <div>Name: {props.profile.fullName}</div>
      <div>About: {props.profile.aboutMe}</div>
      <div>{props.profile.lookingForAJob && props.profile.lookingForAJobDescription}</div>
      <div>
        <div>Contacts: </div>
        <div>VK: {props.profile.contacts.vk}</div>
        <div>Github: {props.profile.contacts.github}</div>
        <div>Facebook: {props.profile.contacts.facebook}</div>
        <div>Twitter: {props.profile.contacts.twitter}</div>
        <div>Instagram: {props.profile.contacts.instagram}</div>
      </div>
    </>
  );
};
