import { NodeInput } from 'gatsby'

export interface ModelNodeInput extends NodeInput {
  jiraId: string
}

export interface ModelInterface {
  id?: string
  fields?: string[]
  gatsbyId: string
}

export interface ModelContext {
  createNodeId(input: string): string
  createNode<TNode = Record<string, unknown>>(node: NodeInput & TNode, plugin?: { name: string }, options?: { [key: string]: unknown }): void
  createContentDigest(input: string | Record<string, unknown>): string
}

export interface ModelData {
  id: string
}

export interface Links<T = LinkValue | string> { [key: string]: T }
export type LinkValue = ModelInterface | ModelInterface[]

export interface StaticModel<T> { new (data: any, context: ModelContext): T }

export abstract class Model<D extends ModelData> implements ModelInterface {
  static map<T extends Model<any>>(this: StaticModel<T>, entries: any[], context: ModelContext): T[] {
    return entries.map<T>((data) => new this(data, context))
  }

  static link<T extends Model<any>>(this: StaticModel<T>, sources: T[], name: string, callback: (source: T) => LinkValue): void {
    for (const source of sources) {
      const value = callback(source)
      source.link(name, Array.isArray(value) ? value.filter((model) => model != null) : value)
    }
  }

  abstract get id(): string
  gatsbyId: string = this.context.createNodeId(`${this.constructor.name}:${this.data.id}`)
  abstract get fields(): string[]
  private links: Links<LinkValue> = {}

  constructor(protected data: D, private context: ModelContext) {}

  link(name: string, value: LinkValue) {
    this.links[name] = Array.isArray(value) ? value.filter((value) => value != null) : value
  }

  build() {
    const data = this.fields.reduce((obj, name) => { obj[name] = this[name]; return obj }, {})
    const links = Object.entries(this.links).reduce<Links<string | string[]>>((obj, [name, value]) => {
      obj[`${name}___NODE`] = Array.isArray(value) ? value.map((value) => value.gatsbyId) : value?.gatsbyId
      return obj
    }, {})
    const node = {
      id: this.gatsbyId,
      jiraId: this.id,
      ...data,
      ...links,
      parent: null,
      children: [],
      internal: { type: this.constructor.name, content: JSON.stringify(data), contentDigest: this.context.createContentDigest(data) }
    }
    this.context.createNode(node)
    return node
  }
}
