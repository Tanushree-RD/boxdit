/**
 * Storage-agnostic cache contract.
 *
 * Every cache in Boxdit talks to a `CacheStore`. The current implementation is
 * an in-memory store, but anything that satisfies this interface (Redis,
 * Upstash, a database table, ...) can replace it without touching callers.
 *
 * All methods are async on purpose so that network-backed stores fit the
 * same shape. Values must be JSON-serializable.
 */
export interface CacheStore<T> {
  /** Returns the stored value, or `null` if missing / already evicted. */
  get(key: string): Promise<T | null>;
  /** Returns stored values for many keys at once (missing keys are omitted). */
  getMany(keys: string[]): Promise<Map<string, T>>;
  /** Stores a value. `ttlMs` lets the backing store evict it automatically. */
  set(key: string, value: T, ttlMs: number): Promise<void>;
  /** Stores many values at once with the same TTL. */
  setMany(entries: Array<[string, T]>, ttlMs: number): Promise<void>;
  /** Removes a single entry. */
  delete(key: string): Promise<void>;
  /** Removes every entry in this store. */
  clear(): Promise<void>;
}

/** Common timestamps attached to every cached object. */
export interface CacheTimestamps {
  /** ISO timestamp of when the data was generated. */
  generatedAt: string;
  /** ISO timestamp after which the data is considered stale. */
  expiresAt: string;
}
