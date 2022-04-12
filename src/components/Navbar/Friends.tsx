import React from 'react';
import styled from 'styled-components';

const FriendsStyle = styled.div`
  display: flex;
  margin: 20px 0;
  img {
    max-height: 50px;
  }
`;

interface IFriends {
  id: number;
  name: string;
  image: string;
}

export const Friends = (props: IFriends) => {
  return (
    <FriendsStyle>
      <img src={props.image} alt={'friend'} />
      <div>{props.name}</div>
    </FriendsStyle>
  );
};
