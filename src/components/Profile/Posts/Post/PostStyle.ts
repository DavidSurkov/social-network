import styled from 'styled-components';

export const PostStyle = styled.div`
  margin: 10px;
  border: 1px solid wheat;
  font-size: 20px;
  font-style: italic;
`;
export const Like = styled.div`
  display: flex;
  justify-content: flex-end;
  color: wheat;
  img {
    max-width: 20px;
    min-height: 20px;
    border-radius: 50%;
  }
`;
export const Avatar = styled.img`
  max-width: 40px;
  min-height: 40px;
  border-radius: 50%;
`;
