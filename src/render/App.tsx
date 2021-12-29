import React from "react";
import "./App.css";
import Button from '@mui/material/Button';
import Router from "./Router";
export default function App(): JSX.Element {
  return (
    <div className="app">
      <Router ></Router>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}