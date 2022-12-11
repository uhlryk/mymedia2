import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/store';
import { clearProjectDetails, selectIsProjectDetailsLoaded, setProjectDetails } from '../store/resourcesSlice';
import { useParams } from 'react-router-dom';
import { getProjectData } from '../api/getProjectData';
import { selectProjects, setCurrentProject } from '../../../store/projectsSlice';

export const useCurrentProject = () => {
    const dispatch = useAppDispatch();
    const { current: currentProject, list: projectList } = useAppSelector(selectProjects);
    const { projectId } = useParams();
    const isLoaded = useAppSelector(selectIsProjectDetailsLoaded);

    useEffect(() => {
        if (!currentProject || (currentProject.id !== projectId)) {
            const project = projectList.find(project => project.id === projectId);
            dispatch(setCurrentProject(project))
            dispatch(clearProjectDetails());
        } else {
            getProjectData(currentProject.id).then((projectDetails) => {
                dispatch(setProjectDetails(projectDetails));
            });
        }
    }, [currentProject, projectId]);

    return isLoaded && currentProject && (currentProject.id === projectId);
}