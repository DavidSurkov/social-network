import { Dispatch } from 'redux';
import { PhotoResponseType, profileAPI, SaveProfileRequestType } from '../api/api';
import { AppThunk } from './redux-store';
import { IContactsForm } from '../components/Profile/ProfileDescription/Contacts';
import { IAboutMeForm } from '../components/Profile/ProfileDescription/AboutMeDescription';

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

export enum ProfileFormEnum {
  CONTACTS = 'CONTACTS',
  DESCRIPTION = 'DESCRIPTION',
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
    case 'DELETE-POST': {
      return { ...state, posts: [...state.posts.filter((p) => p.id != action.id)] };
    }
    case 'SET-NEW-PHOTOS': {
      debugger;
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    }
    default:
      return state;
  }
};
export const addPostAC = (data: { post: string }) => ({ type: 'ADD-POST', data } as const);
export const setUserProfile = (profile: IUserProfile) => ({ type: 'SET-USER-PROFILE', profile } as const);
export const setStatus = (status: string) => ({ type: 'SET-STATUS', status } as const);
export const deletePost = (id: number) => ({ type: 'DELETE-POST', id } as const);
export const setNewPhotos = (photos: PhotoResponseType) => ({ type: 'SET-NEW-PHOTOS', photos } as const);

export type ProfileActionType =
  | ReturnType<typeof addPostAC>
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setStatus>
  | ReturnType<typeof deletePost>
  | ReturnType<typeof setNewPhotos>;

export const getUserProfileTC = (userId: number) => {
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
export const updateProfilePhotoTC =
  (photo: Blob | string): AppThunk =>
  async (dispatch, getState) => {
    try {
      const response = await profileAPI.updatePhoto(photo);
      const userId = getState().authentication.userId;
      if (response.data.resultCode === 0) {
        dispatch(getUserProfileTC(userId as number));
      }
    } catch (e) {
      console.log(e);
    }
  };
export const saveProfileTC =
  (profileData: IContactsForm | IAboutMeForm, updateFlag: ProfileFormEnum): AppThunk =>
  async (dispatch, getState) => {
    const userId = Number(getState().authentication.userId);
    const profile = getState().profileData.profile;
    let profileObj = {} as SaveProfileRequestType;
    if (updateFlag === ProfileFormEnum.CONTACTS) {
      if ('instagram' in profileData) {
        profileObj = {
          fullName: profile.fullName,
          aboutMe: 'ho',
          userId: userId,
          lookingForAJob: profile.lookingForAJob,
          lookingForAJobDescription: profile.lookingForAJobDescription,
          contacts: profileData,
        };
      }
    } else if (updateFlag === ProfileFormEnum.DESCRIPTION) {
      if ('lookingForAJob' in profileData && 'fullName' in profileData && 'lookingForAJobDescription' in profileData) {
        profileObj = {
          contacts: profile.contacts,
          userId: userId,
          aboutMe: 'ho',
          lookingForAJob: profileData.lookingForAJob,
          lookingForAJobDescription: profileData.lookingForAJobDescription,
          fullName: profileData.fullName,
        };
      }
    }
    try {
      const response = await profileAPI.saveProfile(profileObj);
      if (response.data.resultCode === 0) {
        dispatch(getUserProfileTC(userId));
      }
    } catch (e) {
      console.log(e);
    }
  };
