import React, { useEffect } from 'react';
import '../../App.css';
import { connect } from 'react-redux';
import { Header } from './Header';
import axios from 'axios';
import { AuthoriseStateType, setUserData } from '../../redux/authorise_reducer';
import { AppRootStateType } from '../../redux/redux-store';

//Styles
interface IHeaderContainer {
  userId: number | null;
  email: string | null;
  login: string | null;
  isLogged: boolean;
  setUserData: (userId: number, email: string, login: string) => void;
}
export function HeaderContainer(props: IHeaderContainer) {
  useEffect(() => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { withCredentials: true }).then((response) => {
      if (response.data.resultCode === 0) {
        const { id, email, login } = response.data.data;
        props.setUserData(id, email, login);
      }
    });
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
export default connect(mapStateToProps, { setUserData })(HeaderContainer);
