import { ipcRenderer, contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
  fetch(channel: string, message?: any) {
    return ipcRenderer.invoke(channel, message);
  },
});
