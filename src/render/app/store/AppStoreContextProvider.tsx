import React, { ReactNode, ReactElement } from 'react';
import { useAppStore, AppStore } from './useAppStore';

type Props = {
  children: ReactNode;
};

export const AppStateContext = React.createContext<AppStore | null>(null);

export const AppStoreContextProvider = ({ children }: Props): ReactElement => {
  const appState = useAppStore();
  return (
    <AppStateContext.Provider value={appState}>
      {children}{' '}
    </AppStateContext.Provider>
  );
};
