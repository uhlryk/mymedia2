import React, { useState, useContext, ReactElement } from 'react';
import { AppStore } from '../../store/useAppStore';
import { AppStateContext } from '../../store/AppStoreContextProvider';
import { IProject } from '../../../../shared/IProject';
import fetch from '../../../utils/fetch';
import { setProject } from '../../store/appStoreActions';

export const CreateProjectPage = (): ReactElement => {
  const [appState, dispatchAppState] = useContext<AppStore>(AppStateContext);

  const [submitting, setSubmitting] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectFolderPath, setProjectFolderPath] = useState<string>('');
  const [waitingForDialog, setWaitingForDialog] = useState<boolean>(false);
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setSubmitting(true);
    fetch<IProject>('set/new-project', {
      name: projectName,
      folderPath: projectFolderPath,
    }).then((result) => {
      console.log(`[CreateProject] status of set/new-project ${result}`);
      setSubmitting(false);
      dispatchAppState(setProject(result));
    });
  };

  const onProjectPathClick: React.MouseEventHandler<HTMLInputElement> = () => {
    setWaitingForDialog(true);
    fetch<string | null>('get/new-project-folder').then((projectPath) => {
      setWaitingForDialog(false);
      setProjectFolderPath(projectPath);
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
        />

        <input value={projectFolderPath} readOnly />

        <button
          onClick={onProjectPathClick}
          disabled={waitingForDialog || submitting}
        >
          Select Folder
        </button>
        <button
          type="submit"
          disabled={!(projectFolderPath && projectName) || submitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
