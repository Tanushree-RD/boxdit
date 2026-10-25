import type { CacheStore } from "./types";

interface MemoryEntry<T> {
  value: T;
  /** Epoch ms after which the entry is evicted from memory. */
  evictAt: number;
}

/**
 * Simple in-process cache store backed by a `Map`.
 *
 * Stores are registered on `globalThis` so they survive Next.js dev-mode hot
 * reloads (module re-evaluation would otherwise wipe the cache on every edit).
 *
 * Swap this for a Redis-backed `CacheStore` in production by changing the
 * factory in `lib/cache/config.ts`.
 */
export class MemoryCacheStore<T> implements CacheStore<T> {
  private readonly entries: Map<string, MemoryEntry<T>>;

  constructor(private readonly maxEntries: number = Infinity) {
    this.entries = new Map();
  }

  private readEntry(key: string): T | null {
    const entry = this.entries.get(key);
    if (!entry) return null;
    if (Date.now() >= entry.evictAt) {
      this.entries.delete(key);
      return null;
    }
    return entry.value;
  }

  private writeEntry(key: string, value: T, ttlMs: number): void {
    // Re-insert to keep Map insertion order roughly LRU-ish for eviction.
    this.entries.delete(key);
    this.entries.set(key, { value, evictAt: Date.now() + ttlMs });

    while (this.entries.size > this.maxEntries) {
      const oldestKey = this.entries.keys().next().value;
      if (oldestKey === undefined) break;
      this.entries.delete(oldestKey);
    }
  }

  async get(key: string): Promise<T | null> {
    return this.readEntry(key);
  }

  async getMany(keys: string[]): Promise<Map<string, T>> {
    const result = new Map<string, T>();
    for (const key of keys) {
      const value = this.readEntry(key);
      if (value !== null) result.set(key, value);
    }
    return result;
  }

  async set(key: string, value: T, ttlMs: number): Promise<void> {
    this.writeEntry(key, value, ttlMs);
  }

  async setMany(entries: Array<[string, T]>, ttlMs: number): Promise<void> {
    for (const [key, value] of entries) {
      this.writeEntry(key, value, ttlMs);
    }
  }

  async delete(key: string): Promise<void> {
    this.entries.delete(key);
  }

  async clear(): Promise<void> {
    this.entries.clear();
  }
}

type GlobalWithStores = typeof globalThis & {
  __boxditCacheStores?: Map<string, CacheStore<unknown>>;
};

/**
 * Returns a process-wide singleton memory store for the given namespace.
 */
export function getGlobalMemoryStore<T>(
  namespace: string,
  maxEntries?: number
): CacheStore<T> {
  const g = globalThis as GlobalWithStores;
  if (!g.__boxditCacheStores) {
    g.__boxditCacheStores = new Map();
  }
  let store = g.__boxditCacheStores.get(namespace);
  if (!store) {
    store = new MemoryCacheStore<unknown>(maxEntries);
    g.__boxditCacheStores.set(namespace, store);
  }
  return store as CacheStore<T>;
}
