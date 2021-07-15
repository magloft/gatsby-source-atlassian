import { CacheAdapter } from './CacheAdapter'

export class CacheAdapterGatsby extends CacheAdapter {
  async get<T>(key: string): Promise<T> {
    return this.args.cache.get(key)
  }

  async set<T>(key: string, value: T): Promise<void> {
    return this.args.cache.set(key, value)
  }
}
