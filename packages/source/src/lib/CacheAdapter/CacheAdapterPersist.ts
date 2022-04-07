import { existsSync, mkdirpSync, readFileSync, writeFileSync } from 'fs-extra'
import { SourceNodesArgs } from 'gatsby'
import { CacheAdapter } from './CacheAdapter'

export class CacheAdapterPersist extends CacheAdapter {
  private data: any

  constructor(args: SourceNodesArgs) {
    super(args)
    if (!existsSync('.atlassian-cache/')) { mkdirpSync('.atlassian-cache/') }
    if (!existsSync('.atlassian-cache/data.json')) { writeFileSync('.atlassian-cache/data.json', '{}', 'utf8') }
    this.data = JSON.parse(readFileSync('.atlassian-cache/data.json', 'utf-8'))
  }

  async get<T>(key: string): Promise<T> {
    return this.data[key]
  }

  async set<T>(key: string, value: T): Promise<void> {
    this.data[key] = value
    writeFileSync('.atlassian-cache/data.json', JSON.stringify(this.data), 'utf8')
  }
}
