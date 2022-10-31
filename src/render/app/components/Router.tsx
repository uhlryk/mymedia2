import React, { useContext, FC } from 'react';
import { AppContext, AppContextType } from '../store/store';

type Props = {
    pages: {
        [key: string]: JSX.Element
    }
}
export const Router: FC<Props> = ({ pages }) => {
    const { appState: { page } } = useContext<AppContextType>(AppContext);
    if (pages[page]) {
        return pages[page]
    } else {
        return <></>
    }
}