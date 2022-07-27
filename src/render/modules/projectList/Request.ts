const { ipcRenderer } = (<any>window).electron;
console.log(window.Electron);
export default class Request {
    static async send<IT, RT>(
        channel: string,
        data: IT
    ): Promise<RT> {
        return await new Promise(resolve => {
            ipcRenderer.once(channel, (event: any, response: RT) => {
                resolve(response);
            });

            ipcRenderer.send(channel, data);
        });
    }
}
