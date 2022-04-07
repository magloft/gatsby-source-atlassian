import { JiraStatusData } from '~/lib/JiraClient'
import { Model, ModelInterface } from './Model'

export class JiraStatus extends Model<JiraStatusData> implements ModelInterface {
  get id() { return this.data.id }
  get fields() { return ['name', 'description', 'iconUrl', 'iconId', 'projectId', 'self'] }

  get name() { return this.data.name }
  get description() { return this.data.description }
  get iconUrl() { return this.data.iconUrl }
  get projectId() { return this.data.scope?.project?.id }
  get self() { return this.data.self }

  get statusCategoryId() { return this.data.statusCategory }

  iconId?: string
}
