import { applyMiddleware, combineReducers, createStore } from 'redux';
import { ProfileActionType, profileReducer } from './profile_reducer';
import { DialogsActionType, dialogsReducer } from './dialogs_reducer';
import { sidebarReducer } from './sidebar_reducer';
import { UsersActionType, usersReducer } from './users_reducer';
import { authoriseReducer, AuthoriseReducerActionType } from './authorise_reducer';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { AppActionType, appReducer } from './app_reducer';

export const rootReducer = combineReducers({
  profileData: profileReducer,
  dialogsData: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  authentication: authoriseReducer,
  app: appReducer,
});
export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>;
type AppActionsType =
  | ProfileActionType
  | AppActionType
  | AuthoriseReducerActionType
  | DialogsActionType
  | UsersActionType;
