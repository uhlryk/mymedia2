import React, { ReactNode, ReactElement, createContext } from 'react';
import { useAppStore, AppStore } from './useAppStore';

export const AppStoreContext = createContext<AppStore | null>(null);

type Props = {
  children: ReactNode;
};

export const AppStoreContextProvider = ({ children }: Props): ReactElement => {
  const appStore = useAppStore();
  return (
    <AppStoreContext.Provider value={appStore}>
      {children}{' '}
    </AppStoreContext.Provider>
  );
};
