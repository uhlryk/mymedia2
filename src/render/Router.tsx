import React, { ReactElement } from 'react';

import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { ResourcePage } from './app/pages/resources/ResourcePage';
import { ProjectPage } from './app/pages/projects/ProjectPage';
import { CreateProjectPage } from './app/pages/createProject/CreateProjectPage';
import { ResourceListPage } from './app/pages/resources/pages/resourceList/ResourceListPage';
import { PlayListPage } from './app/pages/resources/pages/playList/PlayListPage';
import { TagsListPage } from './app/pages/resources/pages/tagsList/TagsListPage';
import { App } from './app/App';

const router = createMemoryRouter([
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
        path: 'resources',
        element: <ResourcePage />,
        children: [
          {
            index: true,
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
]);

export const Router = (): ReactElement => {
  return (
    <RouterProvider router={router} />
  );
};
