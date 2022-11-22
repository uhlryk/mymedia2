import React, { ReactNode, ReactElement, createContext } from 'react';
import { useResources } from '../hooks/useResources';
import { ResourceStore } from './useResourcesStore';


export const ResourceStoreContext = createContext<ResourceStore | null>(null);

type Props = {
    children: ReactNode;
    projectPath: string;
};

export const ResourceStoreContextProvider = ({ children, projectPath }: Props): ReactElement => {
    const resourceStore = useResources(projectPath);
    return (
        <ResourceStoreContext.Provider value={resourceStore}>
            {children}{' '}
        </ResourceStoreContext.Provider>
    );
};