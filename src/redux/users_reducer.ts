import dialogAvatar from '../images/dialogAvatar.jpg';
import dialogAvatar1 from '../images/dialogAvatar1.jpg';
import dialogAvatar2 from '../images/dialogAvatar2.jpg';
import dialogAvatar3 from '../images/dialogAvatar3.jpg';
import dialogAvatar4 from '../images/dialogAvatar4.png';
export interface User {
  id: number;
  image: string;
  followed: boolean;
  fullName: { name: string; surname: string };
  status: string;
  location: { country: string; city: string };
}

const initialState = {
  users: [
    {
      id: 1,
      image: dialogAvatar1,
      followed: false,
      fullName: { name: 'Cristian', surname: 'Cerullo' },
      status: 'Here I am, walking into hurricane',
      location: { country: 'Italy', city: 'Palermo' },
    },
    {
      id: 2,
      image: dialogAvatar3,
      followed: true,
      fullName: { name: 'Emanuella', surname: 'Martone' },
      status: 'Love pizza and prochutto',
      location: { country: 'Italy', city: 'Milano' },
    },
    {
      id: 3,
      image: dialogAvatar2,
      followed: false,
      fullName: { name: 'Francesco', surname: 'Vitae' },
      status: 'Hate to stay here',
      location: { country: 'Italy', city: 'Catania' },
    },
  ] as Array<User>,
};
export type UsersType = typeof initialState;

export const usersReducer = (state: UsersType = initialState, action: UsersActionType): UsersType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: false };
          }
          return u;
          /*u.id === action.userID ? { ...u, followed: false } : u*/
        }),
      };
    case 'SET-USERS': {
      return {
        ...state,
        users: [...state.users, ...action.users],
      };
    }
    default:
      return state;
  }
};
export const followAC = (userID: number) => ({ type: 'FOLLOW', userID } as const);
export const unfollowAC = (userID: number) => ({ type: 'UNFOLLOW', userID } as const);
export const setUsersAC = (users: Array<User>) => ({ type: 'SET-USERS', users } as const);
export type UsersActionType =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setUsersAC>;
