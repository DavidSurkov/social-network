import axios from 'axios';

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': 'd3ccdc4a-e093-4c52-baa5-dff42aec2ee0',
  },
});

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return axiosInstance.get(`users?page=${currentPage}&count=${pageSize}`).then((response) => {
      return response.data;
    });
  },
  unfollowUser(userId: number) {
    return axiosInstance.delete(`follow/${userId}`).then((response) => {
      return response.data;
    });
  },
  followUser(userId: number) {
    return axiosInstance.post(`follow/${userId}`).then((response) => {
      return response.data;
    });
  },
};
export const profileAPI = {
  getProfileData(userId: number | string | undefined) {
    return axiosInstance.get(`profile/${userId}`).then((response) => {
      return response.data;
    });
  },
};
