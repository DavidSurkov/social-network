import React from 'react';
import '../../App.css';
import headerLogo from '../../images/headerLogo.png';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

interface IHeader {
  userId: number | null;
  email: string | null;
  login: string | null;
  isLogged: boolean;
}

//Styles
const HeaderStyle = styled.header`
  margin: 10px 0;
  grid-area: h;
  background-color: aqua;
  display: flex;
  justify-content: center;

  img {
    width: 100px;
  }
`;
const LoginBlock = styled.div`
  float: right;
  color: black;
  a {
    color: black;
  }
`;

export function Header(props: IHeader) {
  return (
    <HeaderStyle>
      <img src={headerLogo} alt={'LOGO'} />
      <LoginBlock>{props.isLogged ? props.login : <NavLink to={'/login'}>Login</NavLink>}</LoginBlock>
    </HeaderStyle>
  );
}
