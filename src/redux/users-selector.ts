import { AppRootStateType } from './redux-store';

export const getUsersFromState = (state: AppRootStateType) => {
  return state.usersPage.users;
};
export const getTotalUsersCountFromState = (state: AppRootStateType) => {
  return state.usersPage.totalUsersCount;
};
export const getPageSizeFromState = (state: AppRootStateType) => {
  return state.usersPage.pageSize;
};
export const getCurrentPageFromState = (state: AppRootStateType) => {
  return state.usersPage.currentPage;
};
export const getIsFetchingFromState = (state: AppRootStateType) => {
  return state.usersPage.isFetching;
};
export const getFollowingProgressFromState = (state: AppRootStateType) => {
  return state.usersPage.followingProgress;
};
