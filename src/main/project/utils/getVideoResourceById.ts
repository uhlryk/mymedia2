import { IResource } from "../../../shared/IResource";
import Project from "../Project";
import { SpecificProject } from "../SpecificProject";
import { getResourceById } from "./getResourceById";

export const getVideoResourceById = async (specificProject: SpecificProject, projectPath: string, resourceId: string): Promise<IResource> => {
    const resource = await getResourceById(specificProject, projectPath, resourceId);
    const extension = resource.extension;
    if (!Project.VIDEO_EXTENSIONS.includes(extension)) {
        console.error(
            `Requested resource by path ${resource.relativePath} extension ${extension} is not supported for thumbnails`
        );
        throw new Error('Resource is not a video');
    }
    return resource;
}