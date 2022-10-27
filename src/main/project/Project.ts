import { ipcMain } from "electron";
import { IResource } from "../../shared/IResource";
import createDiffResourceHashes from "./helpers/createDiffResourceHashes";
import createFolderStructure from "./helpers/createFolderStructure";
import createResourceHash from "./helpers/createResourceHash";
import readDirectory from "./helpers/readAllFsFiles";
import Store from "./Store";

export default class Project {
    static PROJECT_DATA_FOLDER = "mymedia";
    static THUMBNAILS_FOLDER = "thumbnails";
    private store: Store;
    private projectPath: string;
    private cachedResources: IResource[];

    constructor() {
        ipcMain.handle('set/project-data', async (event, projectPath: string) => {
            if (this.projectPath !== projectPath) {
                console.log('change project');

                this.projectPath = projectPath;
                createFolderStructure(this.projectPath, Project.PROJECT_DATA_FOLDER, Project.THUMBNAILS_FOLDER);
                this.store = new Store(this.projectPath, Project.PROJECT_DATA_FOLDER);

                const resourceList = this.store.getResourceList();
                const allFilesFromFs = await readDirectory(projectPath);
                const resourceHash = createResourceHash(allFilesFromFs, projectPath);
                const diffResourceHashes = createDiffResourceHashes(resourceHash, resourceList);
                const updatedResourceList = this.store.setResourceList(Object.values({ ...diffResourceHashes.exisitingFiles, ...diffResourceHashes.newFiles }))
                this.cachedResources = updatedResourceList;
                return updatedResourceList;
            } else {
                return this.cachedResources;
            }
        })

        ipcMain.handle('set/resource-thumbnail', async (event, { projectPath, resourcePath }: { projectPath: string, resourcePath: string }) => {
            if (projectPath !== this.projectPath) {
                console.error(`Requested path ${projectPath} is different than current project path ${this.projectPath}`);
                return null;
            }
            const resource = this.cachedResources.find(cachedResource => cachedResource.relativePath === resourcePath);
            if (!resource) {
                console.error(`Requested resolurce by path ${resourcePath} not found`);
                return null;
            }

            // TODO: calculate resource

            await new Promise(resolve => setTimeout(resolve, 2000));

            return resource;


        });
    }

}