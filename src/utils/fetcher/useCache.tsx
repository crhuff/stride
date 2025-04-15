import { createContext, useContext } from "react";

export type ContextType = {
  getCache: <T>(key: string) => T | undefined;
  setCache: <T>(key: string, value: T, ttl?: number) => void;
  clearCache: () => void;
  deleteCache: (key: string) => void;
};

export function useCache() {
  return useContext(CacheContext) as ContextType;
}

export const CacheContext = createContext<ContextType | null>(null);
