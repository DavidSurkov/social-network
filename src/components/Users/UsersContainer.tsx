import { connect } from 'react-redux';
import { AppRootStateType } from '../../redux/redux-store';
import {
  follow,
  followUserTC,
  getUsersTC,
  toggleFollowingProgress,
  unfollow,
  unfollowUserTC,
  User,
} from '../../redux/users_reducer';
import React from 'react';
import { Users } from './Users';
import { Preloader } from '../Common/Preloader';

type mapStateToPropsType = {
  users: Array<User>;
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  followingProgress: number[];
};
type mapDispatchToPropsType = {
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void;
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
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            followingProgress={this.props.followingProgress}
            toggleFollowingProgress={this.props.toggleFollowingProgress}
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
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingProgress: state.usersPage.followingProgress,
  };
};

export default connect(mapStateToProps, {
  follow,
  unfollow,
  toggleFollowingProgress,
  getUsersTC,
  unfollowUserTC,
  followUserTC,
})(UsersContainer);
