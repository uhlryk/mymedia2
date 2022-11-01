import { IProject } from "../../shared/IProject";
import ElectronStore from "electron-store";
import { v4 as uuidv4 } from "uuid";
export default class Store {
  static PROJECTS_COLLECTION = "projects";
  private _store;

  constructor() {
    this._store = new ElectronStore({
      schema: {
        [Store.PROJECTS_COLLECTION]: {
          type: "array"
        }
      }
    });
  }

  getProject(id: string): IProject {
    return this.getProjectList().find(project => project.id === id);
  }

  getProjectList(): Array<IProject> {
    const projectList: Array<IProject> | unknown = this._store.get(Store.PROJECTS_COLLECTION, []);
    if (!projectList) {
      throw new Error("Project List doesn't exist");
    }
    return projectList as Array<IProject>;
  }

  addProject(project: Omit<IProject, "id">): IProject {
    const projectWithId: IProject = {
      ...project,
      id: uuidv4()
    };
    const projectList: Array<IProject> = this._store.get(Store.PROJECTS_COLLECTION, []) as Array<IProject>;

    projectList.push(projectWithId);
    this._store.set(Store.PROJECTS_COLLECTION, projectList);

    return projectWithId;
  }

  removeProject(projectId: string): void {
    let projectList: Array<IProject> = this._store.get(Store.PROJECTS_COLLECTION, []) as Array<IProject>;
    projectList = projectList.filter(project => project.id !== projectId);
    this._store.set(Store.PROJECTS_COLLECTION, projectList);
  }
}
