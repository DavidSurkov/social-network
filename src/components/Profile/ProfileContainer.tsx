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
} from '../../redux/profile_reducer';
import { AppRootStateType } from '../../redux/redux-store';
import { useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

type PropsType = MapStateToProps & MapDispatchToProps;
type MapStateToProps = {
  posts: Array<IPosts>;
  profile: IUserProfile;
  status: string;
};
type MapDispatchToProps = {
  getUserProfileTC: (userId: number | string | undefined) => void;
  setProfileStatusTC: (userId: number) => void;
  updateProfileStatusTC: (status: string) => void;
};

function ProfileContainer(props: PropsType) {
  const { userId } = useParams<string>();
  useEffect(() => {
    props.getUserProfileTC(userId);
    props.setProfileStatusTC(Number(userId));
  }, [userId]);
  return <Profile {...props} />;
}

const mapStateToProps = (state: AppRootStateType): IProfile => {
  return {
    profile: state.profileData.profile,
    posts: state.profileData.posts,
    status: state.profileData.status,
  };
};

export default withAuthRedirect(
  connect(mapStateToProps, { getUserProfileTC: getUserProfileTC, setProfileStatusTC, updateProfileStatusTC })(
    ProfileContainer,
  ),
);
