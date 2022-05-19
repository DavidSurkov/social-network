import axios from 'axios';

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
type ResponseDataType = {
  id: number;
  email: string;
  login: string;
};
export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => {
      return response.data;
    });
  },
  unfollowUser(userId: number) {
    return instance.delete(`follow/${userId}`).then((response) => {
      return response.data;
    });
  },
  followUser(userId: number) {
    return instance.post(`follow/${userId}`).then((response) => {
      return response.data;
    });
  },
};
export const profileAPI = {
  getProfileData(userId: number | string | undefined) {
    return instance.get(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },
  getProfileStatus(userId: number) {
    return instance.get(`profile/status/${userId}`);
  },
  updateProfileStatus(status: string) {
    return instance.put('profile/status', { status });
  },
};
export const authAPI = {
  authMe() {
    return instance.get<APIResponseType<ResponseDataType>>(`auth/me`).then((response) => {
      return response.data;
    });
  },
  logIn(data: FormData) {
    return instance.post<APIResponseType<{ userId: number }>>(`auth/login`, data).then((response) => {
      return response;
    });
  },
  logOut() {
    return instance.delete<APIResponseType>(`auth/login`).then((response) => {
      return response;
    });
  },
};
