import React, { ReactElement } from 'react';

import {
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import { routes } from './routes';


const router = createMemoryRouter(routes);

export const Router = (): ReactElement => {
  return (
    <RouterProvider router={router} />
  );
};
