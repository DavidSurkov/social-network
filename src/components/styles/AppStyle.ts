import styled from 'styled-components';

export const AppStyle = styled.div`
  color: white;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-areas:
    'h h'
    'n c';
  grid-template-rows: 60px 1fr;
  grid-auto-columns: 2fr 10fr;
  font-family: 'Helvetica Neue';
  button {
    height: fit-content;
    width: content-box;
    color: wheat;
    background: #014d55;
  }
`;

export const Wrapper = styled.div`
  grid-area: c;
  background-color: #191f26;
  padding: 10px;
  border: 1px dashed #014d55;
`;
