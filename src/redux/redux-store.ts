import { applyMiddleware, combineReducers, createStore } from 'redux';
import { profileReducer } from './profile_reducer';
import { dialogsReducer } from './dialogs_reducer';
import { sidebarReducer } from './sidebar_reducer';
import { usersReducer } from './users_reducer';
import { authoriseReducer } from './authorise_reducer';
import thunkMiddleware from 'redux-thunk';

export const rootReducer = combineReducers({
  profileData: profileReducer,
  dialogsData: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  authentication: authoriseReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
