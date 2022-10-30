import { ipcMain } from "electron";
import { IResource } from "../../shared/IResource";
import createDiffResourceHashes from "./helpers/createDiffResourceHashes";
import createFolderStructure from "./helpers/createFolderStructure";
import createFileDetailsHash from "./helpers/createFileDetailsHash";
import readDirectory from "./helpers/readAllFsFiles";
import Store from "./Store";
import * as path from "path";
import generateThumbnail from "./helpers/generateThumbnail";
import getMetadata from "./helpers/getMetadata";

const EXTENSIONS_FOR_THUMBNAILS = ['.mp4', '.wmv', '.mov', '.avi'];
export default class Project {
    static PROJECT_DATA_FOLDER = "mymedia";
    static THUMBNAILS_FOLDER = "thumbnails";
    private store: Store;
    private projectPath: string;
    private cachedResources: IResource[];

    constructor() {
        ipcMain.handle('set/project-data', async (event, projectPath: string): Promise<IResource[]> => {
            if (this.projectPath !== projectPath) {
                console.log('change project');

                this.projectPath = projectPath;
                createFolderStructure(this.projectPath, Project.PROJECT_DATA_FOLDER, Project.THUMBNAILS_FOLDER);
                this.store = new Store(this.projectPath, Project.PROJECT_DATA_FOLDER);

                const resourceList = this.store.getResourceList();
                const allFilesFromFs = await readDirectory({
                    directory: projectPath,
                    excludeDirectoriesHash: new Map([[Project.PROJECT_DATA_FOLDER, true]]),
                    acceptedFileExtensionsHash: new Map(EXTENSIONS_FOR_THUMBNAILS.map(extension => [extension, true]))
                });
                const fileDetailsHash = createFileDetailsHash(allFilesFromFs, projectPath);
                const diffResourceHashes = createDiffResourceHashes(fileDetailsHash, resourceList);
                const updatedResourceList = this.store.setResourceList(Object.values({ ...diffResourceHashes.exisitingFiles, ...diffResourceHashes.newFiles }))
                this.cachedResources = updatedResourceList;

                return updatedResourceList.map(resource => ({
                    ...resource,
                    thumbnails: resource.thumbnails?.map(thumbnail => path.join(projectPath, thumbnail))
                }));
            } else {
                return this.cachedResources;
            }
        })

        ipcMain.handle('set/resource-extra', async (event, { projectPath, resourcePath }: { projectPath: string, resourcePath: string }) => {
            if (projectPath !== this.projectPath) {
                console.error(`Requested path ${projectPath} is different than current project path ${this.projectPath}`);
                return null;
            }
            const resourceIndex = this.cachedResources.findIndex(cachedResource => cachedResource.relativePath === resourcePath);

            if (resourceIndex === -1) {
                console.error(`Requested resource by path ${resourcePath} not found`);
                return null;
            }
            const resource = this.cachedResources[resourceIndex];

            const extension = resource.extension;

            if (!EXTENSIONS_FOR_THUMBNAILS.includes(extension)) {
                console.error(`Requested resource by path ${resourcePath} extension ${extension} is not supported for thumbnails`);
                return null;
            }

            const absoluteResourcePath = path.join(projectPath, resource.relativePath);
            const absoluteSpecificThumbnailPath = path.join(projectPath, Project.PROJECT_DATA_FOLDER, Project.THUMBNAILS_FOLDER, resource.id, "1.jpg");
            const relativeSpecificThumbnailPath = path.join(Project.PROJECT_DATA_FOLDER, Project.THUMBNAILS_FOLDER, resource.id, "1.jpg");
            try {
                const metadata = await getMetadata(absoluteResourcePath);
                if (await generateThumbnail(absoluteResourcePath, absoluteSpecificThumbnailPath, metadata.duration)) {
                    const updatedResource = {
                        ...resource,
                        thumbnails: [relativeSpecificThumbnailPath],
                        // ...metadata
                    }
                    this.cachedResources[resourceIndex] = updatedResource
                    this.store.setResourceList(this.cachedResources)
                    return ({ ...updatedResource, thumbnails: [absoluteSpecificThumbnailPath] });
                } else {
                    return null;
                }
            } catch (err) {
                console.log(err);
            }
        });
    }

}