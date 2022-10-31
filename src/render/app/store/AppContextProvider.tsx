import React, { FC } from "react";
import { AppContext, useAppReducer } from "./store";

export const AppStoreContextProvider: FC = ({ children }) => {
    const appStore = useAppReducer();

    return (<AppContext.Provider value={appStore}>{children} </AppContext.Provider>)
}