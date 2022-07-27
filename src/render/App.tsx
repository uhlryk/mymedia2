import React from "react";
import "./App.css";
// import invoke from "./communication/invoke";


import Router from "./modules/router/Router";

// invoke<string>('get/project-list', 'ping' ).then(res => console.log(res))

export default function App(): JSX.Element {
  return (
    <div className="app">
      <Router ></Router>
    </div>
  );
}