import React, { useState, useContext, ReactElement } from 'react';
import './createProjectPage.css';
import { AppStore } from '../../store/useAppStore';
import { AppStoreContext } from '../../store/AppStoreContextProvider';
import { setProject } from '../../store/appStoreActions';
import { addNewProject } from './api/addNewProject';
import { Box, TextField, Button } from '@mui/material';
import { openFolderDialog } from './api/openFolderDialog';

export const CreateProjectPage = (): ReactElement => {
  const [, dispatchAppState] = useContext<AppStore>(AppStoreContext);

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
    openFolderDialog().then((response) => {

      setWaitingForDialog(false);
      if (response) {
        const [projectPath, name] = response;
        setProjectFolderPath(projectPath);

        if (!projectName) {
          setProjectName(name);
        }

      }
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <Box className="create-project__wrapper">
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
        <TextField
          id="outlined-basic"
          label="Set project name"
          variant="outlined"
          value={projectName}
          onChange={(event) => setProjectName(event.target.value)}
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
