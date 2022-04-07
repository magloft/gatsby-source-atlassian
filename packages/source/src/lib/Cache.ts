import objectHash from 'object-hash'
import { CacheAdapter } from './CacheAdapter/CacheAdapter'

export type AroundCallback<T> = () => Promise<T>

export function cacheKey(id: string, object?: unknown) {
  return objectHash({ __id: id, ...object as Record<string, unknown> })
}

export class Cache {
  constructor(private adapter: CacheAdapter) {}

  async get<T>(key: string): Promise<T> {
    return this.adapter.get(key)
  }

  async set<T>(key: string, value: T): Promise<void> {
    return this.adapter.set(key, value)
  }

  async around<T>(id: string, object: unknown, callback: AroundCallback<T>): Promise<T> {
    const key = cacheKey(id, object)
    let result: T = await this.get(key)
    if (!result) {
      result = await callback()
      await this.set(key, result)
    }
    return result
  }
}
