import React, { ReactNode, ReactElement } from 'react';
import { AppContext, useAppReducer } from './store';

type Props = {
  children: ReactNode
}

export const AppStoreContextProvider = ({ children }: Props): ReactElement => {
  const appStore = useAppReducer();

  return (
    <AppContext.Provider value={appStore}>{children} </AppContext.Provider>
  );
};
