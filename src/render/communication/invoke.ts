export default async function invoke<T>(channel: string, message:any): Promise<T> {
    const response: T = await (window as any).api.invoke(channel, message);
    console.log(response);
    return response;
}