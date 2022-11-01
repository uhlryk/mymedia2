export default async function fetch<T>(
  channel: string,
  message?: any
): Promise<T> {
  const response: T = await (window as any).api.fetch(channel, message);
  console.log(response);
  return response;
}
