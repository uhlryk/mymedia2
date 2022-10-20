import { IProjectListElement } from "./IProjectList";
import ElectronStore from "electron-store";

export default class Store {
    static COLLECTION = "projects";
    private _store;

    constructor() {
        this._store = new ElectronStore({
            schema: {
                [Store.COLLECTION]: {
                    type: "array"
                }
            }
        });
    }

    getProject(id: string): IProjectListElement {
        return this.getProjectList().find(project => project.id === id);
    }

    getProjectList(): Array<IProjectListElement> {
        const projectList: Array<IProjectListElement> | unknown = this._store.get(Store.COLLECTION, []);
        if(!projectList) {
            throw new Error("Project List doesn't exist");
        }
        return projectList as Array<IProjectListElement>;
    }

    addProject(project: IProjectListElement): void {
        const projectList: Array<IProjectListElement> = this._store.get(Store.COLLECTION, []) as Array<IProjectListElement>;

        projectList.push(project);
        this._store.set(Store.COLLECTION, projectList);
    }

    removeProject(projectId: string): void {
        let projectList: Array<IProjectListElement> = this._store.get(Store.COLLECTION, []) as Array<IProjectListElement>;
        projectList = projectList.filter(project => project.id !== projectId);
        this._store.set(Store.COLLECTION, projectList);
    }
}
