import { SpecificProject } from '../SpecificProject';

export const checkSpecificProject = async (specificProject: SpecificProject, projectId: string) => {
    if (!specificProject || !specificProject.verifyProject(projectId)) {
        console.error(
            `Requested id ${projectId} is different than current project ${specificProject.getProjectId()}`
        );
        throw new Error('Project not setup or wrong project path');
    }
    await specificProject.waitForResourcesPromise();
}