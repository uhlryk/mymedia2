import React, {
  useEffect,
  useState,
  useContext,
  KeyboardEvent,
  MouseEvent
} from "react";
import { IResource } from "../../../../shared/IResource";
import fetch from "../../../utils/fetch";
import { IProject } from "../../../../shared/IProject";
import ResourceList from "./components/ResourceList";
import { AppContext, AppContextType, ActionType } from "../../store/store";
import { SwipeableDrawer, Box } from "@mui/material";

export default function ResourcePage(): JSX.Element {
  const {
    appState: { project },
    appDispatch
  } = useContext<AppContextType>(AppContext);
  const [resourceList, setResourceList] = useState<IResource[]>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch<IResource[]>("set/project-data", project.folderPath).then(
      resourceList => {
        setResourceList(resourceList);
        setLoading(false);
        console.log(resourceList);
      }
    );
  }, []);

  useEffect(() => {
    let stopProcess = false;
    if (!isLoading) {
      const requestThumbnails = async () => {
        for (const resource of resourceList) {
          if (stopProcess) break;
          if (!resource.thumbnails) {
            // TODO: check if there is specified number of thumbnails e.g. 4 if less then we also need create missing thumbnails
            await fetch<IResource>("set/resource-extra", {
              projectPath: project.folderPath,
              resourcePath: resource.relativePath
            }).then(updatedResource => {
              if (stopProcess) {
                return;
              }
              if (!updatedResource) {
                return;
              }
              const resourceIndex = resourceList.findIndex(
                resource =>
                  resource.relativePath === updatedResource.relativePath
              );
              if (resourceIndex !== -1) {
                resourceList[resourceIndex].thumbnails =
                  updatedResource.thumbnails;
              }
              setResourceList(resourceList.slice());
            });
          }
        }
      };
      requestThumbnails();
    }
    return () => {
      stopProcess = true;
    };
  }, [isLoading]);
  const toggleLeftMenu = (open: boolean) => (
    event: KeyboardEvent | MouseEvent
  ) => {
    console.log(open);
  };
  return (
    <>
      <SwipeableDrawer
        anchor={"right"}
        open={false}
        onClose={toggleLeftMenu(false)}
        onOpen={toggleLeftMenu(true)}
      >
        <h1>test</h1>
      </SwipeableDrawer>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box sx={{ display: "flex", flexBasis: "300px", flexGrow: 1 }}>
          <div style={{ width: "300px" }}>
            {"hello world".concat("" + Math.floor(Math.random() * 100))}
          </div>
        </Box>
        <Box sx={{ display: "flex", flexBasis: "auto", flexGrow: 1 }}>
          <ResourceList list={resourceList}></ResourceList>
        </Box>
      </Box>
    </>
  );
}
