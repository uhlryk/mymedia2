import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "./App";

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <App />

    </React.StrictMode>,
    document.getElementById("root"));
}
render();