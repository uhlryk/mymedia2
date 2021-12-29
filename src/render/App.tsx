import React from "react";
import "./App.css";
import Button from '@mui/material/Button';
import ProjectList from "./modules/projectList/ProjectList";
export default function App(): JSX.Element {
  return (
    <div className="app">
      <ProjectList ></ProjectList>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
    </div>
  );
}