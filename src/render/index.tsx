import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { Router } from './Router';

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
