interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

const store = new Map<string, CacheEntry<unknown>>();

export function cacheGet<T>(key: string): T | null {
  const entry = store.get(key) as CacheEntry<T> | undefined;
  if (!entry) return null;
  if (Date.now() - entry.timestamp > entry.ttl) {
    store.delete(key);
    return null;
  }
  return entry.data;
}

export function cacheSet<T>(key: string, data: T, ttlMs: number): void {
  store.set(key, { data, timestamp: Date.now(), ttl: ttlMs });
}

export function cacheInvalidate(key: string): void {
  store.delete(key);
}
