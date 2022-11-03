import {
  List,
  ListItemButton,
  ListItemText,
  Stack,
  ListItemIcon,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import React, { ReactElement, useContext } from 'react';
import { AppContext, AppContextType } from '../../store/store';
import { setProject } from '../../store/actions';
import { useProjectList } from './hooks/useProjectList';

export const ProjectPage = (): ReactElement => {
  console.log(`[SelectProject] start `);
  const { appDispatch } = useContext<AppContextType>(AppContext);

  const [projectList, isLoading] = useProjectList();

  const onSelectProject = (id: string) => {
    const project = projectList.find((project) => project.id === id);
    appDispatch(setProject(project));
  };

  const list = projectList.map((project) => (
    <ListItemButton
      key={project.id}
      onClick={() => onSelectProject(project.id)}
    >
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary={project.name} secondary={project.folderPath} />
    </ListItemButton>
  ));

  return (
    <Stack alignItems="left">
      <List
        sx={{
          width: '100%',
          maxWidth: 560,
          margin: '0 200px',
        }}
      >
        {list}
      </List>
    </Stack>
  );
}
