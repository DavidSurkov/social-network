import React from 'react';
import { User } from '../../redux/users_reducer';
import styled from 'styled-components';
import image from '../../images/Avatarka-10.webp';
import { NavLink } from 'react-router-dom';

interface IUser {
  users: Array<User>;
  totalUsersCount: number;
  pageSize: number;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  currentPage: number;
  onPageChanged: (p: number) => void;
  followingProgress: number[];
  toggleFollowingProgress: (isFetching: boolean, userId: number) => void;
  unfollowUserTC: (userId: number) => void;
  followUserTC: (userId: number) => void;
}
//Styles
const UsersStyle = styled.div``;
const PaginationContainer = styled.div`
  width: 900px;
  height: max-content;
  overflow: scroll;
`;
const UserBlockStyle = styled.div`
  display: flex;
  border: 1px solid black;
  border-radius: 10px;
  padding: 5px;
  margin: 10px 0;
`;
const PhotoBlockStyle = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
  img {
    width: 100px;
    height: 100px;
  }
`;
const InfoBlockStyle = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'a b'
    'c c';
`;
const FullNameStyle = styled.div`
  grid-area: a;
`;
const LocationStyle = styled.div`
  margin: 0 0 0 20px;
  grid-area: b;
`;
const StatusStyle = styled.div`
  grid-area: c;
`;
const PageStyle = styled.span<{ isSelected: boolean }>`
  padding: 5px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  font-weight: ${(props) => (props.isSelected ? 'bold' : '')};
  color: ${(props) => (props.isSelected ? 'yellow' : '')};
`;

export const Users = (props: IUser) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages: number[] = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <UsersStyle>
      <PaginationContainer>
        {pages.map((p) => {
          return (
            <PageStyle
              key={Math.random()}
              onClick={() => {
                props.onPageChanged(p);
              }}
              isSelected={props.currentPage === p}
            >
              {p}
            </PageStyle>
          );
        })}
      </PaginationContainer>
      {props.users.map((user) => (
        <UserBlockStyle key={user.id}>
          <PhotoBlockStyle>
            <NavLink to={'/profile/' + user.id}>
              <img src={user.photos.small != null ? user.photos.small : image} alt={user.name} />
            </NavLink>
            {user.followed ? (
              <button
                disabled={props.followingProgress.some((id: number) => id === user.id)}
                onClick={() => {
                  props.unfollowUserTC(user.id);
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                disabled={props.followingProgress.some((id: number) => id === user.id)}
                onClick={() => {
                  props.followUserTC(user.id);
                }}
              >
                Follow
              </button>
            )}
          </PhotoBlockStyle>
          <InfoBlockStyle>
            <FullNameStyle>
              <div>Name: {user.name}</div>
              <div>Last name: {user.name}</div>
            </FullNameStyle>
            <StatusStyle>
              Status:
              <br />
              {user.status}
            </StatusStyle>
            <LocationStyle>
              <div>Country: {'user.location.country'}</div>
              <div>City: {'user.location.city'}</div>
            </LocationStyle>
          </InfoBlockStyle>
        </UserBlockStyle>
      ))}
    </UsersStyle>
  );
};
