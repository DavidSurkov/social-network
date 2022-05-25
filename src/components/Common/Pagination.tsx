import React from 'react';
import styled from 'styled-components';
//Styles
const PaginationContainer = styled.div`
  width: 900px;
  height: max-content;
  overflow: scroll;
`;
const PageStyle = styled.span<{ isSelected: boolean }>`
  padding: 5px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  font-weight: ${(props) => (props.isSelected ? 'bold' : '')};
  color: ${(props) => (props.isSelected ? 'yellow' : '')};
`;
interface IPagination {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (p: number) => void;
}
const Pagination: React.FC<IPagination> = ({ totalUsersCount, currentPage, onPageChanged, pageSize }) => {
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages: number[] = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  return (
    <PaginationContainer>
      {pages.map((p) => {
        return (
          <PageStyle
            key={Math.random()}
            onClick={() => {
              onPageChanged(p);
            }}
            isSelected={currentPage === p}
          >
            {p}
          </PageStyle>
        );
      })}
    </PaginationContainer>
  );
};

export default Pagination;
