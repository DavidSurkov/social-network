import { Dispatch } from 'redux';
import { authAPI, FormData } from '../api/api';
import { initialisedSuccessAC } from './app_reducer';

export type AuthoriseStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isLogged: boolean;
  error: string | null;
};
const initialState = {} as AuthoriseStateType;

export const authoriseReducer = (
  state: AuthoriseStateType = initialState,
  action: AuthoriseReducerActionType,
): AuthoriseStateType => {
  switch (action.type) {
    case 'authorise/SET-USER-DATA':
      return {
        ...state,
        userId: action.userId,
        email: action.email,
        login: action.login,
        isLogged: action.isLogged,
      };
    case 'authorise/LOG-OUT': {
      return {
        ...state,
        isLogged: false,
      };
    }
    case 'authorise/LOG-IN': {
      return {
        ...state,
        isLogged: true,
      };
    }
    case 'authorise/SET-ERROR': {
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
  ({ type: 'authorise/SET-USER-DATA', userId, email, login, isLogged } as const);
export const logOut = () => ({ type: 'authorise/LOG-OUT' } as const);
export const logIn = () => ({ type: 'authorise/LOG-IN' } as const);
export const setError = (message: string | null) => ({ type: 'authorise/SET-ERROR', message } as const);

type AuthoriseReducerActionType =
  | ReturnType<typeof setUserData>
  | ReturnType<typeof logOut>
  | ReturnType<typeof setError>
  | ReturnType<typeof logIn>;

export const initialiseAuthDataTC = () => async (dispatch: Dispatch) => {
  const response = await authAPI.authMe();
  if (response.data.resultCode === 0) {
    const { id, email, login } = response.data.data;
    dispatch(setUserData(id, email, login, true));
  }
  dispatch(initialisedSuccessAC());
};

export const logOutTC = () => async (dispatch: Dispatch) => {
  const response = await authAPI.logOut();
  if (response.data.resultCode === 0) {
    dispatch(setUserData(null, null, null, false));
  }
};

export const logInTC = (data: FormData) => async (dispatch: Dispatch<AuthoriseReducerActionType | any>) => {
  const response = await authAPI.logIn(data);
  if (response.data.resultCode === 0) {
    dispatch(initialiseAuthDataTC());
  } else {
    dispatch(setError(response.data.messages[0]));
    setTimeout(() => {
      dispatch(setError(null));
    }, 2000);
  }
};
