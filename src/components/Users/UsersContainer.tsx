import { connect } from 'react-redux';
import { AppRootStateType } from '../../redux/redux-store';
import {
  followAC,
  setCurrentPageAC,
  setTotalUsersCountAC,
  setUsersAC,
  unfollowAC,
  User,
  UsersType,
} from '../../redux/users_reducer';
import { Dispatch } from 'redux';
import React from 'react';
import axios from 'axios';
import { Users } from './Users';

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
}

class UsersC extends React.Component<IUser> {
  componentDidMount() {
    axios
      .get(
        `https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`,
      )
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
      });
  }

  onPageChanged = (p: number) => {
    this.props.setCurrentPage(p);
    axios
      .get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`)
      .then((response) => {
        this.props.setUsers(response.data.items);
      });
  };
  render() {
    return (
      <Users
        users={this.props.users}
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        follow={this.props.follow}
        unfollow={this.props.unfollow}
        currentPage={this.props.currentPage}
        onPageChanged={this.onPageChanged}
      />
    );
  }
}

const mapStateToProps = (state: AppRootStateType): UsersType => {
  return {
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
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
    setCurrentPage: (currentPage: number) => {
      dispatch(setCurrentPageAC(currentPage));
    },
    setTotalUsersCount: (totalUsersCount: number) => {
      dispatch(setTotalUsersCountAC(totalUsersCount));
    },
  };
};

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersC);
