import React from 'react';
import { IUser } from '../../redux/users_reducer';
import styled from 'styled-components';
import { User } from './User';
import { Pagination } from '../Common/Pagination';

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
const UsersStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Users = (props: IUsers) => {
  return (
    <UsersStyle>
      <Pagination
        totalItemsCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
      />
      <div>
        {props.users.map((user) => (
          <User
            key={user.id}
            user={user}
            followingProgress={props.followingProgress}
            unfollowUserTC={props.unfollowUserTC}
            followUserTC={props.followUserTC}
          />
        ))}
      </div>
    </UsersStyle>
  );
};
