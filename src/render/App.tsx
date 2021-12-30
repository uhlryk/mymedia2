import React from "react";
import "./App.css";

import Router from "./modules/router/Router";
export default function App(): JSX.Element {
  return (
    <div className="app">
      <Router ></Router>
    </div>
  );
}