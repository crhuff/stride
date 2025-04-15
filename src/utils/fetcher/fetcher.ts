import { APITypes } from "./types";
import { useEffect, useMemo, useState } from "react";
import { useCache } from "./useCache";

type RetrieveResponse<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => void;
  status?: number;
};
type ModifyResponse<T> = {
  data: T | null;
  error: Error | null;
};

const modifyData = async <Params, Result>({
  route,
  type = "POST",
  params,
}: {
  route: string;
  type?: APITypes;
  params?: Params;
}): Promise<ModifyResponse<Result>> => {
  // Build default payload
  const payload = {
    method: type,
    headers: {
      "Content-Type": "application/json",
    },
  } as RequestInit;

  payload.body = JSON.stringify(params);
  // Utility Function
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
  let error: Error | null = null;
  let data = null;
  try {
    const response = await fetch(`${BASE_URL}/${route}`, payload);
    data = await response.json();
  } catch (err) {
    error = err as Error;
  }
  return { error, data };
};

export type Options = {
  fetchOnMount?: boolean;
};
const useFetchData = <Result>({
  route,
  options = {},
}: {
  route: string;
  options?: Options;
}): RetrieveResponse<Result> => {
  const [data, setData] = useState<Result | null>(null);
  const [responseMetaData, setResponseMetaData] = useState<Response>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [forceRefetch, setForceRefetch] = useState(false);
  const { getCache, setCache, deleteCache } = useCache();

  // Build default payload
  const payload = useMemo(
    () =>
      ({
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }) as RequestInit,
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (forceRefetch) {
        deleteCache(route);
        setData(null);
      }
      if (getCache<Result>(route) && !forceRefetch) {
        setData(getCache<Result>(route) ?? null);
        setError(null);
        return;
      }
      setLoading(true);
      try {
        const BASE_URL =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${BASE_URL}/${route}`, payload);
        setResponseMetaData(response);
        if (!response.ok || response.status >= 400) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setCache<Result>(route, data, 60);
        setLoading(false);
        setData(data);
      } catch (err) {
        setLoading(false);
        setError(err as Error);
      } finally {
        setForceRefetch(false);
      }
    };
    fetchData();
  }, [
    payload,
    route,
    forceRefetch,
    options.fetchOnMount,
    getCache,
    setCache,
    deleteCache,
  ]);

  const refetch = () => setForceRefetch(true);

  return { data, error, loading, refetch, status: responseMetaData?.status };
};

export { useFetchData, modifyData };
