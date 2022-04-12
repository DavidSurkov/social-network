import styled from 'styled-components';

export const AppStyle = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-areas:
    'h h'
    'n c';
  grid-template-rows: 60px 1fr;
  grid-auto-columns: 2fr 10fr;
  font-family: 'Helvetica Neue';
`;

export const Wrapper = styled.div`
  grid-area: c;
  background-color: green;
  padding: 10px;
`;
