import { APITypes } from "./types";
import { useEffect, useMemo, useState } from "react";

type RetrieveResponse<T> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
  refetch: () => void;
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

const cache = new Map<string, { data: unknown | null; timestamp: number }>();

const useFetchData = <Result>({
  route,
}: {
  route: string;
}): RetrieveResponse<Result> => {
  const [data, setData] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [forceRefetch, setForceRefetch] = useState(false);
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
      const cacheKey = route;
      const cachedResponse = cache.get(cacheKey);
      const now = Date.now();

      if (
        cachedResponse &&
        now - cachedResponse.timestamp < 60000 &&
        !forceRefetch
      ) {
        setData(cachedResponse.data as Result);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const BASE_URL =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${BASE_URL}/${route}`, payload);
        const data = await response.json();
        cache.set(cacheKey, { data, timestamp: now });
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
  }, [payload, route, forceRefetch]);

  const refetch = () => setForceRefetch(true);

  return { data, error, loading, refetch };
};

export { useFetchData, modifyData };
