import { ReactNode } from "react";
import { CacheContext } from "./useCache";

export type cacheBody<T> = {
  expiry: Date;
  data: T;
};

export default function CacheProvider({ children }: { children: ReactNode }) {
  const map = new Map<string, cacheBody<unknown>>();

  function getCache<T>(key: string): T | undefined {
    const cacheValue = map.get(key) as cacheBody<T> | undefined;
    if (!cacheValue) return undefined;
    if (new Date().getTime() > cacheValue.expiry.getTime()) {
      map.delete(key);
      return undefined;
    }
    return cacheValue.data;
  }

  function setCache<T>(key: string, value: T, ttl: number = 10) {
    const t = new Date();
    t.setSeconds(t.getSeconds() + ttl);
    map.set(key, {
      expiry: t,
      data: value,
    });
  }

  function clearCache() {
    map.clear();
  }

  function deleteCache(key: string) {
    map.delete(key);
  }

  const contextValue = {
    getCache,
    setCache,
    clearCache,
    deleteCache,
  };

  return (
    <CacheContext.Provider value={contextValue}>
      {children}
    </CacheContext.Provider>
  );
}
