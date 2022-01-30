export async function getFromApi<T>(endpointURL: string): Promise<T> {
  const apiURL = "/api";
  const fullURL = endpointURL.startsWith("/")
    ? `${apiURL}${endpointURL}`
    : `${apiURL}/${endpointURL}`;
  const resp = await fetch(fullURL);
  if (resp.status !== 200) {
    throw new ApiHTTPError(
      `Got ${resp.status} response from ${fullURL}`,
      resp.status
    );
  }
  return await resp.json();
}

export class ApiHTTPError extends Error {
  code: number;
  constructor(message: string, code: number) {
    super(message);
    this.name = "ApiHTTPError";
    this.code = code;
  }
}
