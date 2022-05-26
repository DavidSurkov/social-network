import axios from 'axios';
import { IUser } from '../redux/users_reducer';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'd3ccdc4a-e093-4c52-baa5-dff42aec2ee0',
  },
});
export type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};
export type APIResponseType<T = Record<string, never>> = {
  resultCode: number;
  messages: string[];
  data: T;
};
type AuthResponseType = {
  id: number;
  email: string;
  login: string;
};
type GetUsersResponseType = {
  items: IUser[];
  totalCount: number;
  error: string | null;
};
export const usersAPI = {
  async getUsers(currentPage: number, pageSize: number) {
    const response = await instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${pageSize}`);
    return response.data;
  },
  async unfollowUser(userId: number) {
    const response = await instance.delete<APIResponseType>(`follow/${userId}`);
    return response.data;
  },
  async followUser(userId: number) {
    const response = await instance.post<APIResponseType>(`follow/${userId}`);
    return response.data;
  },
};
export const profileAPI = {
  async getProfileData(userId: number | string | undefined) {
    const response = await instance.get(`profile/${userId}`);
    return response.data;
  },
  getProfileStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateProfileStatus(status: string) {
    return instance.put('profile/status', { status });
  },
};
export const authAPI = {
  async authMe() {
    return await instance.get<APIResponseType<AuthResponseType>>(`auth/me`);
  },
  async logIn(data: FormData) {
    return await instance.post<APIResponseType<{ userId: number }>>(`auth/login`, data);
  },
  async logOut() {
    return await instance.delete<APIResponseType>(`auth/login`);
  },
};
type ApiMethodsType = { unfollowUser(userId: number): void };
