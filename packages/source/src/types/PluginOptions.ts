import { PluginOptions as BasePluginOptions } from 'gatsby'

export type CacheAdapterType = 'gatsby' | 'persist'

export interface PluginOptions extends BasePluginOptions {
  host: string
  email: string
  apiToken: string
  projectId: string
  cacheAdapter: CacheAdapterType
}
