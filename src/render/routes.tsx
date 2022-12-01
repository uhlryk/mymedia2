import React from 'react';
import { ResourcePage } from './app/pages/resources/ResourcePage';
import { ProjectPage } from './app/pages/projects/ProjectPage';
import { CreateProjectPage } from './app/pages/createProject/CreateProjectPage';
import { ResourceListPage } from './app/pages/resources/pages/resourceList/ResourceListPage';
import { PlayListPage } from './app/pages/resources/pages/playList/PlayListPage';
import { TagsListPage } from './app/pages/resources/pages/tagsList/TagsListPage';
import { App } from './app/App';
import { getPatterns } from './utils/getPatterns';

export const routes = [
    {
        element: <App />,
        children: [
            {
                index: true,
                element: <ProjectPage />
            },
            {
                path: 'new-project',
                element: <CreateProjectPage />
            },
            {
                path: 'resources/:projectId',
                element: <ResourcePage />,
                children: [
                    {
                        path: 'resources',
                        element: <ResourceListPage />
                    },
                    {
                        path: 'tags',
                        element: <TagsListPage />
                    },
                    {
                        path: 'playlist',
                        element: <PlayListPage />
                    }
                ]
            }
        ]
    }
];

export const getRoutesPattern = (): string[] => {
    return getPatterns(routes);
}