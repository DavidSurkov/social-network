import { addPostAC, deletePost, IProfile } from '../../../redux/profile_reducer';
import { connect } from 'react-redux';
import { MyPosts } from './MyPosts';
import { AppRootStateType } from '../../../redux/redux-store';
import { Dispatch } from 'redux';

interface IMapStateToProps {
  profileData: IProfile;
}
interface IMapDispatchToProps {
  addPost: (data: { post: string }) => void;
  deletePost: (id: number) => void;
}

const mapStateToProps = (state: AppRootStateType): IMapStateToProps => {
  return {
    profileData: state.profileData,
  };
};
const mapDispatchToProps = (dispatch: Dispatch): IMapDispatchToProps => {
  return {
    addPost: (data: { post: string }) => {
      dispatch(addPostAC(data));
    },
    deletePost: (id: number) => {
      dispatch(deletePost(id));
    },
  };
};

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);
