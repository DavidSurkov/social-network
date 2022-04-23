import React, { useEffect } from 'react';
import { Profile } from './Profile';
import { connect } from 'react-redux';
import { IPosts, IProfile, IUserProfile, setUserProfile } from '../../redux/profile_reducer';
import { AppRootStateType } from '../../redux/redux-store';
import { useParams } from 'react-router-dom';
import { profileAPI } from '../../api/api';

type PropsType = MapStateToProps & MapDispatchToProps;
type MapStateToProps = {
  textForNewPost: string;
  posts: Array<IPosts>;
  profile: IUserProfile;
};
type MapDispatchToProps = {
  setUserProfile: (profile: IUserProfile) => void;
};

function ProfileContainer(props: PropsType) {
  const { userId } = useParams<string>();
  useEffect(() => {
    profileAPI.getProfileData(userId).then((data) => {
      props.setUserProfile(data);
    });
  }, [userId]);
  return <Profile {...props} />;
}

const mapStateToProps = (state: AppRootStateType): IProfile => {
  return {
    profile: state.profileData.profile,
    textForNewPost: state.profileData.textForNewPost,
    posts: state.profileData.posts,
  };
};

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer);
