import { NavLink } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const DialogStyle = styled.div`
  img {
    height: 40px;
    width: 40px;
  }
`;

interface IDialog {
  image: string;
  name: string;
  id: number;
}

export const Dialog = (props: IDialog) => {
  return (
    <DialogStyle>
      <img src={props.image} alt={'dialogAvatar'} />
      <NavLink to={'/Dialogs/' + props.id}>{props.name}</NavLink>
    </DialogStyle>
  );
};
