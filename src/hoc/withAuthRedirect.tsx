import React, { ComponentType } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppRootStateType } from '../redux/redux-store';

type MapStateToPropsType = {
  isLogged: boolean;
};

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => {
  return {
    isLogged: state.authentication.isLogged,
  };
};

export function withAuthRedirect<T>(Component: ComponentType<T>) {
  const RedirectComponent = (props: MapStateToPropsType) => {
    const { isLogged, ...restProps } = props;
    if (!isLogged) return <Navigate to="/login/" />;
    return <Component {...(restProps as T)} />;
  };
  return connect(mapStateToProps)(RedirectComponent);
}
