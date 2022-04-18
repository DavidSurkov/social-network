import dialogAvatar from '../images/dialogAvatar.jpg';
import dialogAvatar1 from '../images/dialogAvatar1.jpg';
import dialogAvatar2 from '../images/dialogAvatar2.jpg';
import dialogAvatar3 from '../images/dialogAvatar3.jpg';
import dialogAvatar4 from '../images/dialogAvatar4.png';
import exp from 'constants';
export interface User {
  /* id: number;
  image: string;
  followed: boolean;
  fullName: { name: string; surname: string };
  status: string;
  location: { country: string; city: string };*/
  name: string;
  id: number;
  uniqueUrlName: null;
  photos: {
    small: null;
    large: null;
  };
  status: null;
  followed: boolean;
}

const initialState = {
  users: [
    /* {
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
    },*/
  ] as Array<User>,
  pageSize: 5,
  totalUsersCount: 20,
  currentPage: 1,
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
        users: [...action.users],
      };
    }
    case 'SET-CURRENT-PAGE': {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case 'SET-TOTAL-USERS-COUNT': {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    }
    default:
      return state;
  }
};
export const followAC = (userID: number) => ({ type: 'FOLLOW', userID } as const);
export const unfollowAC = (userID: number) => ({ type: 'UNFOLLOW', userID } as const);
export const setUsersAC = (users: Array<User>) => ({ type: 'SET-USERS', users } as const);
export const setCurrentPageAC = (currentPage: number) => ({ type: 'SET-CURRENT-PAGE', currentPage } as const);
export const setTotalUsersCountAC = (totalUsersCount: number) =>
  ({ type: 'SET-TOTAL-USERS-COUNT', totalUsersCount } as const);
export type UsersActionType =
  | ReturnType<typeof followAC>
  | ReturnType<typeof unfollowAC>
  | ReturnType<typeof setCurrentPageAC>
  | ReturnType<typeof setTotalUsersCountAC>
  | ReturnType<typeof setUsersAC>;
