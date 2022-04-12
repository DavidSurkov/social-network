import React from 'react';
import '../../App.css';
import headerLogo from '../../images/headerLogo.png';
import styled from 'styled-components';

//Styles
export const HeaderStyle = styled.header`
  margin: 10px 0;
  grid-area: h;
  background-color: aqua;
  display: flex;
  justify-content: center;

  img {
    width: 100px;
  }
`;

export function Header() {
  return (
    <HeaderStyle>
      <img src={headerLogo} alt={'LOGO'} />
    </HeaderStyle>
  );
}
