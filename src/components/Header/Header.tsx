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
  logOutTC: () => void;
}

//Styles
const HeaderStyle = styled.header`
  margin: 10px 0 0;
  grid-area: h;
  background-color: #191f26;
  border: 1px dashed #014d55;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ImageBlock = styled.div`
  img {
    width: 100px;
  }
`;
const LoginBlock = styled.div`
  font-size: 20px;
  color: #00c4e2;

  a {
    color: #00c4e2;
    text-decoration: none;
  }
`;

export function Header(props: IHeader) {
  const onClickCallBack = () => {
    props.logOutTC();
  };
  return (
    <HeaderStyle>
      <ImageBlock>
        <img src={headerLogo} alt={'LOGO'} />
      </ImageBlock>
      <LoginBlock>
        <div>
          {props.isLogged ? (
            <div>
              <span>{props.login}</span>
              <button onClick={onClickCallBack}>Log out</button>
            </div>
          ) : (
            <NavLink to={'/login'}>Login</NavLink>
          )}
        </div>
      </LoginBlock>
    </HeaderStyle>
  );
}
