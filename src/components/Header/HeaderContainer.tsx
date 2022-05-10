import React, { useEffect } from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { Header } from './Header';
import { AuthoriseStateType, logOutTC, setLoginDataTC } from '../../redux/authorise_reducer';
import { AppRootStateType } from '../../redux/redux-store';
import { Navigate } from 'react-router-dom';

//Styles
interface IHeaderContainer {
  userId: number | null;
  email: string | null;
  login: string | null;
  isLogged: boolean;
  setLoginDataTC: () => void;
  logOutTC: () => void;
}
export function HeaderContainer(props: IHeaderContainer) {
  useEffect(() => {
    props.setLoginDataTC();
  }, []);
  return <Header {...props} />;
}
const mapStateToProps = (state: AppRootStateType): AuthoriseStateType => {
  return {
    userId: state.authentication.userId,
    email: state.authentication.email,
    login: state.authentication.login,
    isLogged: state.authentication.isLogged,
    error: state.authentication.error,
  };
};
export default connect(mapStateToProps, { setLoginDataTC, logOutTC })(HeaderContainer);
