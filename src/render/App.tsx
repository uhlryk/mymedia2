import React, { useState } from "react";
import { IProjectListElement } from "../main/IProjectList";
import "./App.css";

import ResourceList from "./pages/resourceList/ResourceList";
import SelectProject from "./pages/selectProject/SelectProject";

export default function App(): JSX.Element {
  const [project, setProject] = useState<IProjectListElement | null>(null);

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