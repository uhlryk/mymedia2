import * as path from 'path';
import fs from 'fs/promises';
import { IResource } from '../../../shared/IResource';
import Project from "../Project";
import getMetadata, { IMetadata } from './getMetadata';
import generateThumbnail from './generateThumbnail';

export interface ResourceExtraParts extends IMetadata {
    thumbnails: string[];

}
export const calculateExtraResourceProps = async (projectPath: string, resource: IResource): Promise<ResourceExtraParts> => {
    const extension = resource.extension;
    if (!Project.EXTENSIONS_FOR_THUMBNAILS.includes(extension)) {
        console.error(
            `Requested resource by path ${resource.relativePath} extension ${extension} is not supported for thumbnails`
        );
        return null;
    }

    const absoluteResourcePath = getAbsoluteResourcePath(projectPath, resource.relativePath);
    const absoluteThumbnailPath = getAbsoluteThumbnailPath(projectPath, resource.id, 1);
    const relativeThumbnailPath = getRelativeThumbnailPath(resource.id, 1);

    try {
        const metadata = await getMetadata(absoluteResourcePath);
        if (await fileExists(absoluteThumbnailPath)) {
            const updatedResourceParts = {
                thumbnails: [relativeThumbnailPath],
                ...metadata,
            };
            return updatedResourceParts;
        }
        if (
            await generateThumbnail(
                absoluteResourcePath,
                absoluteThumbnailPath,
                metadata.duration
            )
        ) {
            const updatedResourceParts = {
                thumbnails: [relativeThumbnailPath],
                ...metadata,
            };
            return updatedResourceParts;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
    }
}

const fileExists = async (filePath: string) =>
    !!(await fs.stat(filePath).catch((e) => false));

const getAbsoluteResourcePath = (projectPath: string, resourceRelativePath: string) => path.join(
    projectPath,
    resourceRelativePath
)

const getAbsoluteThumbnailPath = (projectPath: string, resourceId: string, num: number) => path.join(
    projectPath,
    Project.PROJECT_DATA_FOLDER,
    Project.THUMBNAILS_FOLDER,
    resourceId,
    `${num}.jpg`
)

const getRelativeThumbnailPath = (resourceId: string, num: number) => path.join(
    Project.PROJECT_DATA_FOLDER,
    Project.THUMBNAILS_FOLDER,
    resourceId,
    `${num}.jpg`
)