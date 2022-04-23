import { addPostAC, changeNewTextAC, IProfile } from '../../../redux/profile_reducer';
import { connect } from 'react-redux';
import { MyPosts } from './MyPosts';
import { AppRootStateType } from '../../../redux/redux-store';
import { Dispatch } from 'redux';

interface IMapStateToProps {
  profileData: IProfile;
}
interface IMapDispatchToProps {
  changeNewText: (text: string) => void;
  addPost: () => void;
}

const mapStateToProps = (state: AppRootStateType): IMapStateToProps => {
  return {
    profileData: state.profileData,
  };
};
const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
  return {
    changeNewText: (text: string) => {
      dispatch(changeNewTextAC(text));
    },
    addPost: () => {
      dispatch(addPostAC());
    },
  };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
