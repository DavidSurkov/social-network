import React from 'react';
import { User } from '../../redux/users_reducer';

interface IUser {
  users: Array<User>;
  follow: (userID: number) => void;
  unfollow: (userID: number) => void;
  setUsers: (users: User[]) => void;
}

export const Users = (props: IUser) => {
  return (
    <div>
      {props.users.map((user) => (
        <div key={user.id}>
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
          <div>{user.fullName.name}</div>
          <div>{user.fullName.surname}</div>
          <div>{user.status}</div>
          <div>{user.location.country}</div>
          <div>{user.location.city}</div>
        </div>
      ))}
    </div>
  );
};
