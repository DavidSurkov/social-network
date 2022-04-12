import React from 'react';
import { User } from '../../redux/users_reducer';
import styled from 'styled-components';
import axios from 'axios';

interface IUser {
  users: Array<User>;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  setUsers: (users: User[]) => void;
}
//Styles
const UsersStyle = styled.div``;
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

export const Users = (props: IUser) => {
  const getUsers = () => {
    debugger;
    if (props.users.length === 0) {
      axios.get('https://social-network.samuraijs.com/api/1.0/users').then((response) => {
        props.setUsers(response.data.users);
      });
    }
  };
  return (
    <UsersStyle>
      <button onClick={getUsers}>Get users</button>
      {props.users.map((user) => (
        <UserBlockStyle key={user.id}>
          <PhotoBlockStyle>
            <img src={user.image} alt={user.fullName.name} />
            {user.followed ? (
              <button
                onClick={() => {
                  props.unfollow(user.id);
                }}
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => {
                  props.follow(user.id);
                }}
              >
                Follow
              </button>
            )}
          </PhotoBlockStyle>
          <InfoBlockStyle>
            <FullNameStyle>
              <div>Name: {user.fullName.name}</div>
              <div>Last name: {user.fullName.surname}</div>
            </FullNameStyle>
            <StatusStyle>
              Status:
              <br />
              {user.status}
            </StatusStyle>
            <LocationStyle>
              <div>Country: {user.location.country}</div>
              <div>City: {user.location.city}</div>
            </LocationStyle>
          </InfoBlockStyle>
        </UserBlockStyle>
      ))}
    </UsersStyle>
  );
};
