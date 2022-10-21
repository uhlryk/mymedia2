import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from "./App";
import { store } from './store/store';

function render() {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
        
    </React.StrictMode>,
  document.getElementById("root"));
}
render();