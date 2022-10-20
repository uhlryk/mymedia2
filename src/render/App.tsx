import React, { useState } from "react";
import "./App.css";
import fetch from "./communication/fetch";
import ResourceList from "./pages/resourceList/ResourceList";
import SelectProject from "./pages/selectProject/SelectProject";


fetch<string>('get/project-list', 'ping').then(res => console.log(res))

export default function App(): JSX.Element {
  const [project, setProject] = useState(null);

  let component;
  if (project) {
    component = <ResourceList />; 
  } else {
    component = <SelectProject />;
  }

  return (
    <div className="app">
      {component}
    </div>
  );
}