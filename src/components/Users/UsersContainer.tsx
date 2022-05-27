import { connect } from 'react-redux';
import { AppRootStateType } from '../../redux/redux-store';
import {
  follow,
  followUserTC,
  getUsersTC,
  toggleFollowingProgress,
  unfollow,
  unfollowUserTC,
  IUser,
} from '../../redux/users_reducer';
import React, { ComponentType } from 'react';
import { Users } from './Users';
import { Preloader } from '../Common/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import {
  getCurrentPageFromState,
  getFollowingProgressFromState,
  getIsFetchingFromState,
  getPageSizeFromState,
  getTotalUsersCountFromState,
  getUsersFromState,
} from '../../redux/users-selector';

type mapStateToPropsType = {
  users: Array<IUser>;
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  followingProgress: number[];
};
type mapDispatchToPropsType = {
  getUsersTC: (currentPage: number, pageSize: number) => void;
  unfollowUserTC: (userId: number) => void;
  followUserTC: (userId: number) => void;
};

class UsersContainer extends React.Component<mapStateToPropsType & mapDispatchToPropsType> {
  componentDidMount() {
    this.props.getUsersTC(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    this.props.getUsersTC(pageNumber, this.props.pageSize);
  };
  render() {
    return (
      <>
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            users={this.props.users}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            followingProgress={this.props.followingProgress}
            followUserTC={this.props.followUserTC}
            unfollowUserTC={this.props.unfollowUserTC}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
  return {
    /*users: state.usersPage.users,
    totalItemsCount: state.usersPage.totalItemsCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingProgress: state.usersPage.followingProgress,*/
    users: getUsersFromState(state),
    totalUsersCount: getTotalUsersCountFromState(state),
    pageSize: getPageSizeFromState(state),
    currentPage: getCurrentPageFromState(state),
    isFetching: getIsFetchingFromState(state),
    followingProgress: getFollowingProgressFromState(state),
  };
};

/*export default withAuthRedirect(
  connect(mapStateToProps, {
    follow,
    unfollow,
    toggleFollowingProgress,
    getUsersTC,
    unfollowUserTC,
    followUserTC,
  })(UsersContainer),
);*/
export default compose<ComponentType>(
  connect(mapStateToProps, {
    follow,
    unfollow,
    toggleFollowingProgress,
    getUsersTC,
    unfollowUserTC,
    followUserTC,
  }),
  withAuthRedirect,
)(UsersContainer);
