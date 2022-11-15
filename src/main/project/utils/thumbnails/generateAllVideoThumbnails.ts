import path from 'path';
import fs from 'fs/promises';
import Project from '../../Project';
import generateThumbnail from './generateThumbnail';
import { getVideoPosition } from './getVideoPosition';

const getAbsoluteThumbnailPath = (
    projectPath: string,
    resourceId: string,
    num: number
) =>
    path.join(
        projectPath,
        Project.PROJECT_DATA_FOLDER,
        Project.THUMBNAILS_FOLDER,
        resourceId,
        `${num}.jpg`
    );


const getRelativeThumbnailPath = (resourceId: string, num: number) =>
    path.join(
        Project.PROJECT_DATA_FOLDER,
        Project.THUMBNAILS_FOLDER,
        resourceId,
        `${num}.jpg`
    );
const fileExists = async (filePath: string) =>
    !!(await fs.stat(filePath).catch((e) => false));

type IInputGenerateAllVideoThumbnails = {
    projectPath: string;
    resourceId: string;
    absoluteResourcePath: string;
    duration: number;
}
const NUMBER_OF_THUMBNAILS = 4;
export const generateAllVideoThumbnails = async ({ projectPath, resourceId, absoluteResourcePath, duration }: IInputGenerateAllVideoThumbnails): Promise<string[]> => {
    const thumbnails: string[] = [];
    for (let i = 0; i < NUMBER_OF_THUMBNAILS; i++) {
        const absoluteThumbnailPath = getAbsoluteThumbnailPath(
            projectPath,
            resourceId,
            i
        );
        const relativeThumbnailPath = getRelativeThumbnailPath(resourceId, i);
        if (await fileExists(absoluteThumbnailPath)) {
            thumbnails[i] = relativeThumbnailPath;
            continue;
        }
        const videoPostion = getVideoPosition(i, duration, NUMBER_OF_THUMBNAILS);
        if (
            await generateThumbnail(
                absoluteResourcePath,
                absoluteThumbnailPath,
                videoPostion
            )
        ) {
            thumbnails[i] = relativeThumbnailPath;
        }
    }
    return thumbnails;
}

