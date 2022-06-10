import React from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { Header } from './Header';
import { AuthoriseStateType, logOutTC } from '../../redux/authorise_reducer';
import { AppRootStateType } from '../../redux/redux-store';

//Styles
interface IHeaderContainer {
  userId: number | null;
  email: string | null;
  login: string | null;
  isLogged: boolean;
  logOutTC: () => void;
}
export function HeaderContainer(props: IHeaderContainer) {
  return <Header {...props} />;
}
const mapStateToProps = (state: AppRootStateType): AuthoriseStateType => {
  return {
    userId: state.authentication.userId,
    email: state.authentication.email,
    login: state.authentication.login,
    isLogged: state.authentication.isLogged,
    error: state.authentication.error,
    captcha: state.authentication.captcha,
  };
};
export default connect(mapStateToProps, { logOutTC })(HeaderContainer);
