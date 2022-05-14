import { Dispatch } from 'redux';
import { authAPI, FormData } from '../api/api';

export type AuthoriseStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isLogged: boolean;
  error: string | null;
};
const initialState: AuthoriseStateType = {
  userId: null,
  email: null,
  login: null,
  isLogged: false,
  error: null,
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
        isLogged: action.isLogged,
      };
    case 'LOG-OUT': {
      return {
        ...state,
        isLogged: false,
      };
    }
    case 'LOG-IN': {
      return {
        ...state,
        isLogged: true,
      };
    }
    case 'SET-ERROR': {
      return {
        ...state,
        error: action.message,
      };
    }
    default:
      return state;
  }
};
export const setUserData = (userId: number | null, email: string | null, login: string | null, isLogged: boolean) =>
  ({ type: 'SET-USER-DATA', userId, email, login, isLogged } as const);
export const logOut = () => ({ type: 'LOG-OUT' } as const);
export const logIn = () => ({ type: 'LOG-IN' } as const);
export const setError = (message: string | null) => ({ type: 'SET-ERROR', message } as const);

type AuthoriseReducerActionType =
  | ReturnType<typeof setUserData>
  | ReturnType<typeof logOut>
  | ReturnType<typeof setError>
  | ReturnType<typeof logIn>;

export const setLoginDataTC = () => {
  return (dispatch: Dispatch) => {
    authAPI.getLoginData().then((data) => {
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        dispatch(setUserData(id, email, login, true));
      }
    });
  };
};
export const logOutTC = () => {
  return (dispatch: Dispatch) => {
    authAPI.logOut().then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
      }
    });
  };
};
export const logInTC = (data: FormData) => {
  return (dispatch: Dispatch) => {
    authAPI.logIn(data).then((response) => {
      if (response.data.resultCode === 0) {
        // @ts-ignore
        dispatch(setLoginDataTC());
      } else {
        dispatch(setError(response.data.messages[0]));
        setTimeout(() => {
          dispatch(setError(null));
        }, 2000);
      }
    });
  };
};
