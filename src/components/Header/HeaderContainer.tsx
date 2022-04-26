import React, { useEffect } from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { Header } from './Header';
import { AuthoriseStateType, setLoginDataTC } from '../../redux/authorise_reducer';
import { AppRootStateType } from '../../redux/redux-store';

//Styles
interface IHeaderContainer {
  userId: number | null;
  email: string | null;
  login: string | null;
  isLogged: boolean;
  setLoginDataTC: () => void;
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
  };
};
export default connect(mapStateToProps, { setLoginDataTC })(HeaderContainer);
