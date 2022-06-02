import React, { ChangeEvent } from 'react';
import { IUserProfile, ProfileFormEnum } from '../../../redux/profile_reducer';
import altPhoto from '../../../images/dialogAvatar1.jpg';
import { Preloader } from '../../Common/Preloader';
import styled from 'styled-components';
import { ProfileStatus } from './ProfileStatus';
import { AboutMeDescription, IAboutMeForm } from './AboutMeDescription';
import { Contacts, IContactsForm } from './Contacts';

//Styles
const ProfileDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StatusBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
`;
const PhotoStyle = styled.img`
  width: 250px;
  height: 250px;
`;
const AboutBlock = styled.div``;
const ContactsBlock = styled.div`
  margin-top: 15px;
`;
const ProfilePhotoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

//Types
interface IProfileDescription {
  profile: IUserProfile;
  status: string;
  updateProfileStatusTC: (status: string) => void;
  updateProfilePhotoTC: (photo: Blob | string) => void;
  isOwner: boolean;
  saveProfileTC: (profileData: IContactsForm | IAboutMeForm, updateFlag: ProfileFormEnum) => void;
}
//JSX
export const ProfileDescription = (props: IProfileDescription) => {
  const onChoiceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.updateProfilePhotoTC(e.target.files[0]);
    }
  };
  if (!props.profile.photos) {
    return <Preloader />;
  }
  return (
    <ProfileDescriptionContainer>
      <StatusBlock>
        <ProfilePhotoBlock>
          {props.profile.photos.large ? (
            <PhotoStyle src={props.profile.photos.large} alt={altPhoto} />
          ) : (
            <PhotoStyle src={altPhoto} alt={altPhoto} />
          )}
          {props.isOwner && <input type={'file'} onChange={onChoiceHandler} />}
        </ProfilePhotoBlock>
        <ProfileStatus
          status={props.status}
          updateProfileStatusTC={props.updateProfileStatusTC}
          isOwner={props.isOwner}
        />
        <AboutBlock>
          <AboutMeDescription
            fullName={props.profile.fullName}
            lookingForAJob={props.profile.lookingForAJob}
            lookingForAJobDescription={props.profile.lookingForAJobDescription}
            isOwner={props.isOwner}
            saveProfileTC={props.saveProfileTC}
          />
        </AboutBlock>
      </StatusBlock>
      <ContactsBlock>
        <Contacts contacts={props.profile.contacts} isOwner={props.isOwner} saveProfileTC={props.saveProfileTC} />
      </ContactsBlock>
    </ProfileDescriptionContainer>
  );
};
