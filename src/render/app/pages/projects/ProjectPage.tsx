import React, { ReactElement, ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { AppStore } from '../../store/useAppStore';
import { AppStoreContext } from '../../store/AppStoreContextProvider';
import { setProject } from '../../store/appStoreActions';
import { useProjectList } from './hooks/useProjectList';
import { removeProjectFromList } from './api/removeProjectFromList';
import { ProjectList } from './components/ProjectList';

export const ProjectPage = (): ReactElement => {
  console.log(`[SelectProject] start `);
  const [, dispatchAppState] = useContext<AppStore>(AppStoreContext);
  const [projectList, isLoading, setProjectList] = useProjectList();


  const onSelectProject = (id: string) => {
    const project = projectList.find((project) => project.id === id);
    dispatchAppState(setProject(project));
  };

  const onRemoveProject = (projectId: string) => {
    removeProjectFromList(projectId).then((projects) => {
      setProjectList(projects);
    });
  };


  return (
    <ProjectList projectList={projectList} onSelectProject={onSelectProject} onRemoveProject={onRemoveProject} />
  )
};
