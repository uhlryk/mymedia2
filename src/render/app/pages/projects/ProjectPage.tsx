import React, { ReactElement, useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { removeProjectFromList } from './api/removeProjectFromList';
import { ProjectList } from './components/ProjectList';
import { useDispatch, useSelector } from 'react-redux';
import { setProjects } from '../../store/projectsSlice';
import { getProjectList } from './api/getProjectList';
import { RootState } from '../../store/store';

export const ProjectPage = (): ReactElement => {
  console.log(`[SelectProject] start `);
  const { list: projectList } = useSelector((state: RootState) => state.projects)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getProjectList().then((projectList) => {
      setLoading(false);
      dispatch(setProjects(projectList))
    });
  }, []);

  const onSelectProject = (id: string) => {
    navigate(`/resources/${id}/resources`);
  };

  const onRemoveProject = (projectId: string) => {
    removeProjectFromList(projectId).then((projectList) => {
      dispatch(setProjects(projectList))
    });
  };


  return (
    <ProjectList projectList={projectList} onSelectProject={onSelectProject} onRemoveProject={onRemoveProject} />
  )
};
