import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
//Styles
const PaginationContainer = styled.div`
  height: max-content;
  align-self: center;
  /*overflow: scroll;*/
`;
const PageStyle = styled.span<{ isSelected: boolean }>`
  padding: 5px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
  font-weight: ${(props) => (props.isSelected ? 'bold' : '')};
  color: ${(props) => (props.isSelected ? 'yellow' : '')};
`;
const StyledButton = styled.button`
  font-size: 20px;
`;
interface IPagination {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (p: number) => void;
  portionSize?: number;
}
export const Pagination: React.FC<IPagination> = ({
  totalItemsCount,
  currentPage,
  onPageChanged,
  pageSize,
  portionSize = 15,
}) => {
  useEffect(() => setPortionNumber(Math.ceil(currentPage / portionSize)), [currentPage]);
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages: number[] = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }
  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionNumber = portionNumber * portionSize;
  const changeToPreviousPage = () => {
    setPortionNumber(portionNumber - 1);
  };
  const changeToNextPage = () => {
    setPortionNumber(portionNumber + 1);
  };

  return (
    <PaginationContainer>
      {portionNumber > 1 && <StyledButton onClick={changeToPreviousPage}>⇦</StyledButton>}
      {pages
        .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
        .map((p) => {
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
      {portionCount > portionNumber && <StyledButton onClick={changeToNextPage}>⇨</StyledButton>}
    </PaginationContainer>
  );
};
