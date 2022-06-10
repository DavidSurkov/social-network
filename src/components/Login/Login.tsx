import React from 'react';
import { useForm } from 'react-hook-form';
import { connect, useSelector } from 'react-redux';
import { AuthoriseStateType, logInTC } from '../../redux/authorise_reducer';
import { AppRootStateType } from '../../redux/redux-store';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
//Styles
const ErrorSpan = styled.span`
  color: red;
  margin-left: 5px;
`;
const ErrorDiv = styled.div`
  color: red;
  font-weight: 700;
`;
const LoginContainer = styled.div`
  align-self: start;
  display: flex;
  flex-direction: column;
`;
//Types
type MapStateToPropsType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isLogged: boolean;
  error: string | null;
  captcha?: string;
};
type MapDispatchToPropsType = {
  logInTC: (data: FormData) => void;
};
type LoginType = MapStateToPropsType & MapDispatchToPropsType;

const Login = (props: LoginType) => {
  return (
    <LoginContainer>
      <h1>Login</h1>
      <LoginForm captcha={props.captcha} serverError={props.error} logInTC={props.logInTC} />
    </LoginContainer>
  );
};
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
export default connect(mapStateToProps, { logInTC })(Login);
//Types
type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
type LoginFormType = {
  logInTC: (data: FormData) => void;
  serverError: string | null;
  captcha?: string;
};
const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const LoginForm: React.FC<LoginFormType> = ({ logInTC, serverError, captcha }) => {
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
    return <Navigate to={'/profile/' + authentication.userId} />;
  }
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder={'Email'} {...register('email', { required: true })} />
        {errors.email && <ErrorSpan>Field is required</ErrorSpan>}
      </div>
      <div>
        <input type={'password'} placeholder={'Password'} {...register('password', { required: true })} />
        {errors.password && <ErrorSpan>Field is required</ErrorSpan>}
      </div>
      <div>
        <label>Remember Me</label>
        <input {...register('rememberMe')} type={'checkbox'} />
      </div>
      {captcha && <img src={captcha} alt={''} />}
      {captcha && <input {...register('captcha')} />}
      {serverError && <ErrorDiv>{serverError}</ErrorDiv>}
      <button>Submit</button>
    </StyledForm>
  );
};
