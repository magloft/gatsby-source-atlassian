import { SourceNodesArgs } from 'gatsby'

export type AroundCallback<T> = () => Promise<T>

export abstract class CacheAdapter {
  constructor(protected args: SourceNodesArgs) {}
  abstract get<T>(key: string): Promise<T>
  abstract set<T>(key: string, value: T)
}
