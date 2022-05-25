import React from 'react';
import { NavLink } from 'react-router-dom';
import image from '../../images/Avatarka-10.webp';
import { IUser } from '../../redux/users_reducer';
import styled from 'styled-components';

interface IUserType {
  user: IUser;
  followingProgress: number[];
  unfollowUserTC: (userId: number) => void;
  followUserTC: (userId: number) => void;
}
//Styles
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
const StyledButton = styled.button`
  cursor: pointer;
  &:hover {
    color: black;
  }
`;

export const User: React.FC<IUserType> = ({ user, followUserTC, unfollowUserTC, followingProgress }) => {
  return (
    <UserBlockStyle key={user.id}>
      <PhotoBlockStyle>
        <NavLink to={'/profile/' + user.id}>
          <img src={user.photos.small != null ? user.photos.small : image} alt={user.name} />
        </NavLink>
        {user.followed ? (
          <StyledButton
            disabled={followingProgress.some((id: number) => id === user.id)}
            onClick={() => {
              unfollowUserTC(user.id);
            }}
          >
            Unfollow
          </StyledButton>
        ) : (
          <StyledButton
            disabled={followingProgress.some((id: number) => id === user.id)}
            onClick={() => {
              followUserTC(user.id);
            }}
          >
            Follow
          </StyledButton>
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
  );
};
