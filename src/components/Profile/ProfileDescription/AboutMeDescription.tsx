import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { IContactsForm } from './Contacts';
import { ProfileFormEnum } from '../../../redux/profile_reducer';

//Styles
const AboutMeDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  text-align: center;
`;
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const StyledButton = styled.button`
  text-transform: uppercase;
  font-size: 20px;
  margin: 10px;
`;
const StyledLabel = styled.label`
  margin-top: 10px;
`;

//Types
interface IAboutMeDescription {
  fullName: string | null;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  isOwner: boolean;
  saveProfileTC: (profileData: IContactsForm | IAboutMeForm, updateFlag: ProfileFormEnum) => void;
}
export interface IAboutMeForm {
  fullName: string | null;
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
}
export const AboutMeDescription = (props: IAboutMeDescription) => {
  const [editMode, setEditMode] = useState(false);
  const { register, handleSubmit } = useForm<IAboutMeForm>({
    defaultValues: {
      fullName: props.fullName,
      lookingForAJobDescription: props.lookingForAJobDescription,
      lookingForAJob: props.lookingForAJob,
    },
  });
  const onSubmit = (data: IAboutMeForm) => {
    setEditMode(false);
    props.saveProfileTC(data, ProfileFormEnum.DESCRIPTION);
  };
  return (
    <AboutMeDescriptionContainer>
      {props.isOwner && !editMode && (
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
          <div>Name: {props.fullName}</div>
          {props.lookingForAJob && (
            <div>
              <div>Looking for a job</div>
              <div>{props.lookingForAJobDescription}</div>
            </div>
          )}
        </div>
      )}

      {editMode && (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <StyledButton>save</StyledButton>
          <StyledLabel>Full name</StyledLabel>
          <input {...register('fullName')} type={'text'} />
          <StyledLabel>Looking for a job?</StyledLabel>
          <input {...register('lookingForAJob')} type={'checkbox'} />
          <StyledLabel>Skills</StyledLabel>
          <textarea {...register('lookingForAJobDescription')} />
        </StyledForm>
      )}
    </AboutMeDescriptionContainer>
  );
};
