import { ipcRenderer, contextBridge } from "electron";

contextBridge.exposeInMainWorld("api", {
  invoke(channel: string, message: any) {
    return ipcRenderer.invoke(channel, message);
  },
});