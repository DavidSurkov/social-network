import { connect } from 'react-redux';
import { AppRootStateType } from '../../redux/redux-store';
import {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleFollowingProgress,
  toggleIsFetching,
  unfollow,
  User,
  UsersType,
} from '../../redux/users_reducer';
import React from 'react';
import { Users } from './Users';
import { Preloader } from '../Common/Preloader';
import { usersAPI } from '../../api/api';

interface IUser {
  users: Array<User>;
  totalUsersCount: number;
  pageSize: number;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  setUsers: (users: User[]) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  setTotalUsersCount: (totalUsersCount: number) => void;
  toggleIsFetching: (isFetching: boolean) => void;
  isFetching: boolean;
  followingProgress: number[];
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void;
}

class UsersC extends React.Component<IUser> {
  componentDidMount() {
    this.props.toggleIsFetching(true);
    usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then((data) => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
      this.props.setTotalUsersCount(data.totalCount);
    });
  }

  onPageChanged = (pageNumber: number) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    usersAPI.getUsers(pageNumber, this.props.pageSize).then((data) => {
      this.props.toggleIsFetching(false);
      this.props.setUsers(data.items);
    });
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
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: AppRootStateType): UsersType => {
  return {
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingProgress: state.usersPage.followingProgress,
  };
};

export const UsersContainer = connect(mapStateToProps, {
  follow,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  unfollow,
  toggleFollowingProgress,
})(UsersC);
