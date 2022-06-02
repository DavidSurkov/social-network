import React, { useEffect } from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import {
  IPosts,
  IProfile,
  IUserProfile,
  getUserProfileTC,
  setProfileStatusTC,
  updateProfileStatusTC,
  updateProfilePhotoTC,
  saveProfileTC,
  ProfileFormEnum,
} from '../../redux/profile_reducer';
import { AppRootStateType } from '../../redux/redux-store';
import { useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { AuthoriseStateType } from '../../redux/authorise_reducer';
import { IContactsForm } from './ProfileDescription/Contacts';
import { IAboutMeForm } from './ProfileDescription/AboutMeDescription';

type PropsType = MapStateToProps & MapDispatchToProps;
type MapStateToProps = {
  posts: Array<IPosts>;
  profile: IUserProfile;
  status: string;
  userId: number | null;
};
const mapStateToProps = (state: AppRootStateType): IProfile & AuthoriseStateType => {
  return {
    profile: state.profileData.profile,
    posts: state.profileData.posts,
    status: state.profileData.status,
    userId: state.authentication.userId,
    login: state.authentication.login,
    email: state.authentication.email,
    error: state.authentication.error,
    isLogged: state.authentication.isLogged,
  };
};
type MapDispatchToProps = {
  getUserProfileTC: (userId: number) => void;
  setProfileStatusTC: (userId: number) => void;
  updateProfileStatusTC: (status: string) => void;
  updateProfilePhotoTC: (photo: Blob | string) => void;
  saveProfileTC: (profileData: IContactsForm | IAboutMeForm, updateFlag: ProfileFormEnum) => void;
};

function ProfileContainer(props: PropsType) {
  const { userId } = useParams<string>();
  const isOwner = Number(userId) === props.userId;
  useEffect(() => {
    props.getUserProfileTC(Number(userId));
    props.setProfileStatusTC(Number(userId));
  }, [userId]);
  return <Profile isOwner={isOwner} {...props} />;
}

export default withAuthRedirect(
  connect(mapStateToProps, {
    getUserProfileTC: getUserProfileTC,
    setProfileStatusTC,
    updateProfileStatusTC,
    updateProfilePhotoTC,
    saveProfileTC,
  })(ProfileContainer),
);
