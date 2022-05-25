import { APIResponseType, usersAPI } from '../api/api';
import { Dispatch } from 'redux';
import { updateObjectInArray } from '../utils/object-helper';

export interface IUser {
  name: string;
  id: number;
  uniqueUrlName: null;
  photos: {
    small: null;
    large: null;
  };
  status: string | null;
  followed: boolean;
}

const initialState = {
  users: [] as IUser[],
  pageSize: 5,
  totalUsersCount: 20,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as number[],
};
export type UsersType = typeof initialState;

export const usersReducer = (state: UsersType = initialState, action: UsersActionType): UsersType => {
  switch (action.type) {
    case 'users/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', { followed: true }),
        /*state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: true };
          }
          return u;
        }),*/
      };
    case 'users/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userID, 'id', { followed: false }),
        /*state.users.map((u) => {
          if (u.id === action.userID) {
            return { ...u, followed: false };
          }
          return u;
          /!*u.id === action.userID ? { ...u, followed: false } : u*!/
        }),*/
      };
    case 'users/SET-USERS': {
      return {
        ...state,
        users: [...action.users],
      };
    }
    case 'users/SET-CURRENT-PAGE': {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case 'users/SET-TOTAL-USERS-COUNT': {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    }
    case 'users/TOGGLE-IS-FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case 'users/TOGGLE-FOLLOWING-PROGRESS': {
      return {
        ...state,
        followingProgress: action.isFetching
          ? [...state.followingProgress, action.userId]
          : state.followingProgress.filter((id) => id != action.userId),
      };
    }
    default:
      return state;
  }
};
export const follow = (userID: number) => ({ type: 'users/FOLLOW', userID } as const);
export const unfollow = (userID: number) => ({ type: 'users/UNFOLLOW', userID } as const);
export const setUsers = (users: Array<IUser>) => ({ type: 'users/SET-USERS', users } as const);
export const setCurrentPage = (currentPage: number) => ({ type: 'users/SET-CURRENT-PAGE', currentPage } as const);
export const setTotalUsersCount = (totalUsersCount: number) =>
  ({ type: 'users/SET-TOTAL-USERS-COUNT', totalUsersCount } as const);
export const toggleIsFetching = (isFetching: boolean) => ({ type: 'users/TOGGLE-IS-FETCHING', isFetching } as const);
export const toggleFollowingProgress = (isFetching: boolean, userId: number) =>
  ({ type: 'users/TOGGLE-FOLLOWING-PROGRESS', isFetching, userId } as const);

export type UsersActionType =
  | ReturnType<typeof follow>
  | ReturnType<typeof unfollow>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof toggleFollowingProgress>;

export const getUsersTC = (currentPage: number, pageSize: number) => async (dispatch: Dispatch) => {
  dispatch(setCurrentPage(currentPage));
  dispatch(toggleIsFetching(true));
  const data = await usersAPI.getUsers(currentPage, pageSize);
  dispatch(toggleIsFetching(false));
  dispatch(setUsers(data.items));
  dispatch(setTotalUsersCount(data.totalCount));
};
const followUnfollowFlow = async (
  dispatch: Dispatch,
  userId: number,
  apiMethod: (userId: number) => Promise<APIResponseType>,
  actionCreator: (userId: number) => ReturnType<typeof follow> | ReturnType<typeof unfollow>,
) => {
  dispatch(toggleFollowingProgress(true, userId));
  const data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));
};

export const unfollowUserTC = (userId: number) => async (dispatch: Dispatch) => {
  /*dispatch(toggleFollowingProgress(true, userId));
  const data = await usersAPI.unfollowUser(userId);
  if (data.resultCode === 0) {
    dispatch(unfollow(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));*/
  await followUnfollowFlow(dispatch, userId, usersAPI.unfollowUser, unfollow);
};
export const followUserTC = (userId: number) => async (dispatch: Dispatch) => {
  /*dispatch(toggleFollowingProgress(true, userId));
  const data = await usersAPI.followUser(userId);
  if (data.resultCode === 0) {
    dispatch(follow(userId));
  }
  dispatch(toggleFollowingProgress(false, userId));*/
  await followUnfollowFlow(dispatch, userId, usersAPI.followUser, follow);
};
