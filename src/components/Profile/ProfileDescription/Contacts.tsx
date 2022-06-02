import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IAboutMeForm } from './AboutMeDescription';
import { ProfileFormEnum } from '../../../redux/profile_reducer';
import styled from 'styled-components';

//Styles
const AllContactsContainer = styled.div`
  max-width: 300px;
`;
const ContactContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin: 10px 0 0 10px;
`;
const StyledButton = styled.button`
  text-transform: uppercase;
  font-size: 20px;
  margin: 10px;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
//Types
interface IContacts {
  contacts: {
    facebook: string | null;
    website: string | null;
    vk: string | null;
    twitter: string | null;
    instagram: string | null;
    youtube: string | null;
    github: string | null;
    mainLink: string | null;
  };
  isOwner: boolean;
  saveProfileTC: (profileData: IContactsForm | IAboutMeForm, updateFlag: ProfileFormEnum) => void;
}
export interface IContactsForm {
  facebook: string | null;
  website: string | null;
  vk: string | null;
  twitter: string | null;
  instagram: string | null;
  youtube: string | null;
  github: string | null;
  mainLink: string | null;
}
export const Contacts = (props: IContacts) => {
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit } = useForm<IContactsForm>({ defaultValues: { ...props.contacts } });
  const onSubmit = (data: IContactsForm) => {
    setEditMode(false);
    props.saveProfileTC(data, ProfileFormEnum.CONTACTS);
  };

  return (
    <AllContactsContainer>
      {!editMode && props.isOwner && (
        <StyledButton
          onClick={() => {
            setEditMode(true);
          }}
        >
          Edit
        </StyledButton>
      )}
      {!editMode && (
        <div>
          <b>Contacts:</b>
          {Object.keys(props.contacts).map((key) => {
            return (
              <Contact key={key} contactTitle={key} contactValue={props.contacts[key as keyof typeof props.contacts]} />
            );
          })}
        </div>
      )}
      {editMode && (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledButton>save</StyledButton>
          <b>Contacts:</b>
          {Object.keys(props.contacts).map((key) => {
            return (
              <ContactContainer key={key}>
                <b>{key}:</b> <input key={key} {...register(`${key as keyof typeof props.contacts}`)} />
              </ContactContainer>
            );
          })}
        </StyledForm>
      )}
    </AllContactsContainer>
  );
};
interface IContact {
  contactTitle: string;
  contactValue: string | null;
}
const Contact: React.FC<IContact> = ({ contactTitle, contactValue }) => {
  return (
    <ContactContainer>
      <b>{contactTitle}:</b> {contactValue}
    </ContactContainer>
  );
};
