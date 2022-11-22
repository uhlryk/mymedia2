import React, { ReactNode, ReactElement, createContext } from 'react';
import { ResourceStore } from './useResourcesStore';


export const ResourceContext = createContext<ResourceStore | null>(null);

type Props = {
    children: ReactNode;
};

// export const ResourceContextProvider = ({ children }: Props): ReactElement => {
//     const appStore = useAppStore();
//     return (
//         <ResourceContext.Provider value={appStore}>
//             {children}{' '}
//         </ResourceContext.Provider>
//     );
// };