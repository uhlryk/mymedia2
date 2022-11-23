import React, { ReactElement } from 'react';

type Props = {
  pages: {
    [key: string]: ReactElement;
  };
  currentPage: string
};
export const Router = ({ pages, currentPage }: Props): ReactElement => {
  return (
    <>{pages[currentPage] || null}</>
  );
};
