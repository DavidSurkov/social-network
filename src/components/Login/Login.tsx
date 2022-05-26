import React from 'react';
import { useForm } from 'react-hook-form';
import { connect, useSelector } from 'react-redux';
import { AuthoriseStateType, logInTC } from '../../redux/authorise_reducer';
import { AppRootStateType } from '../../redux/redux-store';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
type MapStateToPropsType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isLogged: boolean;
  error: string | null;
};
type MapDispatchToPropsType = {
  logInTC: (data: FormData) => void;
};
type LoginType = MapStateToPropsType & MapDispatchToPropsType;

const ErrorSpan = styled.span`
  color: red;
  margin-left: 5px;
`;
const ErrorDiv = styled.div`
  color: red;
  font-weight: 700;
`;

const Login = (props: LoginType) => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm serverError={props.error} logInTC={props.logInTC} />
    </div>
  );
};
const mapStateToProps = (state: AppRootStateType): AuthoriseStateType => {
  return {
    userId: state.authentication.userId,
    email: state.authentication.email,
    login: state.authentication.login,
    isLogged: state.authentication.isLogged,
    error: state.authentication.error,
  };
};
export default connect(mapStateToProps, { logInTC })(Login);

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};
type LoginFormType = {
  logInTC: (data: FormData) => void;
  serverError: string | null;
};
const LoginForm: React.FC<LoginFormType> = ({ logInTC, serverError }) => {
  const authentication = useSelector<AppRootStateType, AuthoriseStateType>((state) => state.authentication);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit = (data: FormData) => {
    logInTC(data);
    reset();
  };
  if (authentication.isLogged) {
    return <Navigate to="/dialogs/" />;
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder={'Email'} {...register('email', { required: true })} />
        {errors.email && <ErrorSpan>Field is required</ErrorSpan>}
      </div>
      <div>
        <input placeholder={'Password'} {...register('password', { required: true })} />
        {errors.password && <ErrorSpan>Field is required</ErrorSpan>}
      </div>
      <div>
        <label>Remember Me</label>
        <input {...register('rememberMe')} type={'checkbox'} />
      </div>
      {serverError && <ErrorDiv>{serverError}</ErrorDiv>}
      <button>Submit</button>
    </form>
  );
};
