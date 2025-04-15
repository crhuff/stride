import { APITypes } from "./types";
import { useEffect, useMemo, useState } from "react";

type Response<T> = {
  data: T | null;
  error: Error | null;
  loading?: boolean;
};

const modifyData = async <Params, Result>({
  route,
  type = "POST",
  params,
}: {
  route: string;
  type?: APITypes;
  params?: Params;
}): Promise<Response<Result>> => {
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

const useFetchData = <Result>({
  route,
}: {
  route: string;
}): Response<Result> => {
  const [data, setData] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
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
      setLoading(true);
      try {
        const BASE_URL =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
        const response = await fetch(`${BASE_URL}/${route}`, payload);
        const data = await response.json();
        setLoading(false);
        setData(data);
      } catch (err) {
        setLoading(false);
        setError(err as Error);
      }
    };
    fetchData();
  }, [payload, route]);

  return { data, error, loading };
};

export { useFetchData, modifyData };
