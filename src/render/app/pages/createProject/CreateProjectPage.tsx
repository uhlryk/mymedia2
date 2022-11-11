import React, { useState, useContext, ReactElement } from 'react';
import './createProjectPage.css';
import { AppStore } from '../../store/useAppStore';
import { AppStateContext } from '../../store/AppStoreContextProvider';
import { setProject } from '../../store/appStoreActions';
import { addNewProject } from './api/addNewProject';
import { Box, TextField, Button } from '@mui/material';
import { openFolderDialog } from './api/openFolderDialog';

export const CreateProjectPage = (): ReactElement => {
  const [, dispatchAppState] = useContext<AppStore>(AppStateContext);

  const [isSubmitting, setSubmitting] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectFolderPath, setProjectFolderPath] = useState<string>('');
  const [, setWaitingForDialog] = useState<boolean>(false);
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setSubmitting(true);
    addNewProject(projectName, projectFolderPath).then((project) => {
      console.log(`[CreateProject] status of set/new-project ${project}`);
      setSubmitting(false);
      dispatchAppState(setProject(project));
    });
  };

  const onProjectPathClick: React.MouseEventHandler<HTMLInputElement> = () => {
    setWaitingForDialog(true);
    openFolderDialog().then((projectPath) => {
      setWaitingForDialog(false);
      if (projectPath) {
        setProjectFolderPath(projectPath);
      }
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <Box className="create-project__wrapper">
        <TextField
          id="outlined-basic"
          label="Set project name"
          variant="outlined"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Project path"
          variant="outlined"
          onClick={onProjectPathClick}
          value={projectFolderPath}
          InputProps={{
            readOnly: true,
          }}
        />

        <Button
          type="submit"
          disabled={!(projectFolderPath && projectName) || isSubmitting}
          variant="contained"
          color="primary"
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};
