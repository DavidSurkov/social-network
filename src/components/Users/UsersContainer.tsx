import { connect } from 'react-redux';
import { Users } from './Users';
import { AppRootStateType } from '../../redux/redux-store';
import { followAC, setUsersAC, unfollowAC, User, UsersType } from '../../redux/users_reducer';
import { Dispatch } from 'redux';

const mapStateToProps = (state: AppRootStateType): UsersType => {
  return {
    users: state.usersPage.users,
  };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    follow: (userID: number) => {
      dispatch(followAC(userID));
    },
    unfollow: (userID: number) => {
      dispatch(unfollowAC(userID));
    },
    setUsers: (users: User[]) => {
      dispatch(setUsersAC(users));
    },
  };
};

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);
