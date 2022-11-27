import path from 'path';
import fs from 'fs/promises';
import Project from '../../Project';
import generateAllThumbnails from './generateAllThumbnails';
import { getFramePerSec } from './getFramePerSec';

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

const getTemplateForAbsolutePath = (projectPath: string,
    resourceId: string,) => path.join(
        projectPath,
        Project.PROJECT_DATA_FOLDER,
        Project.THUMBNAILS_FOLDER,
        resourceId,
        '%04d.jpg'
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
export const generateAllVideoThumbnails = async ({ projectPath, resourceId, absoluteResourcePath, duration }: IInputGenerateAllVideoThumbnails): Promise<string[]> => {
    try {
        const templateForThumbanailAbsolutePath = getTemplateForAbsolutePath(projectPath, resourceId);

        console.log(`[generateAllVideoThumbnails] templateForAbsolutePath ${templateForThumbanailAbsolutePath} duration ${duration}`);

        const thumbnailAbsoluteFolderPath: string = path.dirname(templateForThumbanailAbsolutePath);
        await fs.rmdir(thumbnailAbsoluteFolderPath, { recursive: true });
        await fs.mkdir(thumbnailAbsoluteFolderPath, { recursive: true });

        const framePerSec = getFramePerSec(duration);;
        console.time('generateAllThumbnails')
        await generateAllThumbnails(absoluteResourcePath, templateForThumbanailAbsolutePath, framePerSec);
        console.timeEnd('generateAllThumbnails')
        const fileNames = await fs.readdir(thumbnailAbsoluteFolderPath);
        const thumbnails = fileNames.map(fileName => path.join(Project.PROJECT_DATA_FOLDER, Project.THUMBNAILS_FOLDER, resourceId, fileName));

        console.log(`[generateAllVideoThumbnails] created thumbnails ${thumbnails.length}`);
        return thumbnails;
    } catch (err) {
        console.log(`[generateAllVideoThumbnails] error ${err}`);
    }
}

