export interface User {
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
  users: [] as User[],
  pageSize: 5,
  totalUsersCount: 20,
  currentPage: 1,
  isFetching: false,
  followingProgress: [] as number[],
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
    case 'TOGGLE-IS-FETCHING': {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case 'TOGGLE-FOLLOWING-PROGRESS': {
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
export const follow = (userID: number) => ({ type: 'FOLLOW', userID } as const);
export const unfollow = (userID: number) => ({ type: 'UNFOLLOW', userID } as const);
export const setUsers = (users: Array<User>) => ({ type: 'SET-USERS', users } as const);
export const setCurrentPage = (currentPage: number) => ({ type: 'SET-CURRENT-PAGE', currentPage } as const);
export const setTotalUsersCount = (totalUsersCount: number) =>
  ({ type: 'SET-TOTAL-USERS-COUNT', totalUsersCount } as const);
export const toggleIsFetching = (isFetching: boolean) => ({ type: 'TOGGLE-IS-FETCHING', isFetching } as const);
export const toggleFollowingProgress = (isFetching: boolean, userId: number) =>
  ({ type: 'TOGGLE-FOLLOWING-PROGRESS', isFetching, userId } as const);

export type UsersActionType =
  | ReturnType<typeof follow>
  | ReturnType<typeof unfollow>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof toggleFollowingProgress>;
