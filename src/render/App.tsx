import React, { useState } from "react";
import { IProject } from "../shared/IProject";
import "./App.css";

import ResourceList from "./pages/resourceList/ResourceList";
import SelectProject from "./pages/selectProject/SelectProject";

export default function App(): JSX.Element {
  const [project, setProject] = useState<IProject | null>(null);

  let component;
  if (project) {
    component = <ResourceList project={project} />;
  } else {
    component = <SelectProject setProject={setProject} />;
  }

  return (
    <div className="app">
      {component}
    </div>
  );
}