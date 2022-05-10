import { Dispatch } from 'redux';
import { profileAPI } from '../api/api';

const initialState: IProfile = {
  posts: [
    { id: 1, text: 'Good afternoon', likeCounter: 8 },
    { id: 2, text: 'I would like to say something', likeCounter: 4 },
    { id: 3, text: 'But I will not', likeCounter: 133 },
  ],
  profile: {} as IUserProfile,
  status: '',
};

export interface IPosts {
  id: number;
  text: string;
  likeCounter: number;
}
export interface IUserProfile {
  aboutMe: string | null;
  contacts: {
    facebook: string | null;
    website: string | null;
    vk: string | null;
    twitter: string | null;
    instagram: string | null;
    youtube: string | null;
    github: string | null;
    mainLink: string | null;
  };
  lookingForAJob: boolean;
  lookingForAJobDescription: string | null;
  fullName: string | null;
  userId: number;
  photos: {
    small: string;
    large: string;
  };
}
export interface IProfile {
  posts: Array<IPosts>;
  profile: IUserProfile;
  status: string;
}
export const profileReducer = (state: IProfile = initialState, action: ProfileActionType): IProfile => {
  switch (action.type) {
    case 'ADD-POST': {
      const newPost: IPosts = { id: Math.random() * 100, text: action.data.post, likeCounter: 0 };
      return { ...state, posts: [...state.posts, newPost] };
    }
    case 'SET-USER-PROFILE': {
      return { ...state, profile: action.profile };
    }
    case 'SET-STATUS': {
      return { ...state, status: action.status };
    }
    default:
      return state;
  }
};
export const addPostAC = (data: { post: string }) => ({ type: 'ADD-POST', data } as const);
export const setUserProfile = (profile: IUserProfile) => ({ type: 'SET-USER-PROFILE', profile } as const);
export const setStatus = (status: string) => ({ type: 'SET-STATUS', status } as const);

export type ProfileActionType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setStatus>;

export const getUserProfileTC = (userId: number | string | undefined) => {
  return (dispatch: Dispatch) => {
    profileAPI.getProfileData(userId).then((data) => {
      dispatch(setUserProfile(data));
    });
  };
};
export const setProfileStatusTC = (userId: number) => {
  return (dispatch: Dispatch) => {
    profileAPI.getProfileStatus(userId).then((response) => {
      if (response.status < 400) {
        dispatch(setStatus(response.data));
      }
    });
  };
};
export const updateProfileStatusTC = (status: string) => {
  return (dispatch: Dispatch) => {
    profileAPI.updateProfileStatus(status).then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    });
  };
};
