import { Dispatch } from 'redux';
import { authAPI } from '../api/api';

export type AuthoriseStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isLogged: boolean;
};
const initialState: AuthoriseStateType = {
  userId: null,
  email: null,
  login: null,
  isLogged: false,
};

export const authoriseReducer = (
  state: AuthoriseStateType = initialState,
  action: AuthoriseReducerActionType,
): AuthoriseStateType => {
  switch (action.type) {
    case 'SET-USER-DATA':
      return {
        ...state,
        userId: action.userId,
        email: action.email,
        login: action.login,
        isLogged: true,
      };
    default:
      return state;
  }
};
export const setUserData = (userId: number, email: string, login: string) =>
  ({ type: 'SET-USER-DATA', userId, email, login } as const);
type AuthoriseReducerActionType = ReturnType<typeof setUserData>;

export const setLoginDataTC = () => {
  return (dispatch: Dispatch) => {
    authAPI.getLoginData().then((data) => {
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        dispatch(setUserData(id, email, login));
      }
    });
  };
};
