import { APITypes } from "./types";

const getApiData: {
  <Params, Result>(route: string, type: APITypes, params?: Params): Promise<Result>;
} = async <Params, Result>(route: string, type: APITypes = 'GET', params?: Params): Promise<Result> => {
  // Build default payload
  const payload = {
    method: type,
    headers: {
      'Content-Type': 'application/json',
    },
  } as RequestInit;

  // Only allow body on POST and PUT
  if (type === 'POST' || type === 'PUT') {
    payload.body = JSON.stringify(params);
  }
  // Utility Function
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${BASE_URL}/${route}`, payload);
  const data = await response.json();
  return data;
};

export { getApiData };
