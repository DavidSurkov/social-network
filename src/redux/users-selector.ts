import { AppRootStateType } from './redux-store';
import { createSelector } from 'reselect';

export const _getUsersFromState = (state: AppRootStateType) => {
  return state.usersPage.users;
};
export const getUsersFromState = createSelector(_getUsersFromState, (users) => users.filter((u) => true));

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
