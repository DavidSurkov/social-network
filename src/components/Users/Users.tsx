import React from 'react';
import { IUser } from '../../redux/users_reducer';
import styled from 'styled-components';
import { User } from './User';
import Pagination from '../Common/Pagination';

interface IUsers {
  users: Array<IUser>;
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (p: number) => void;
  followingProgress: number[];
  unfollowUserTC: (userId: number) => void;
  followUserTC: (userId: number) => void;
}
//Styles
const UsersStyle = styled.div``;

export const Users = (props: IUsers) => {
  return (
    <UsersStyle>
      <Pagination
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
      />
      {props.users.map((user) => (
        <User
          user={user}
          followingProgress={props.followingProgress}
          unfollowUserTC={props.unfollowUserTC}
          followUserTC={props.followUserTC}
        />
      ))}
    </UsersStyle>
  );
};
