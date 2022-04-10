import React from 'react';
import styled from 'styled-components';

const MessageStyle = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  border-radius: 50px;
  background-color: aqua;
  &:before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    border-left: 15px solid transparent;
    border-right: 12px solid aqua;
    border-top: 12px solid aqua;
    border-bottom: 12px solid transparent;
    left: -22px;
  }
`;

interface IMessage {
  message: string;
  id: number;
}
export const MessageSent = (props: IMessage) => {
  return <MessageStyle>{props.message}</MessageStyle>;
};
