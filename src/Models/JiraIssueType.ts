import { JiraIssueTypeData } from '../lib/JiraClient'
import { Model, ModelInterface } from './Model'

export class JiraIssueType extends Model<JiraIssueTypeData> implements ModelInterface {
  get id() { return this.data.id }
  get fields() { return ['name', 'description', 'avatarId', 'hierarchyLevel', 'iconUrl', 'subtask', 'projectId', 'self'] }

  get name() { return this.data.name }
  get description() { return this.data.description }
  get avatarId() { return this.data.avatarId }
  get hierarchyLevel() { return this.data.hierarchyLevel }
  get iconUrl() { return this.data.iconUrl }
  get subtask() { return this.data.subtask }
  get projectId() { return this.data.scope?.project?.id }
  get self() { return this.data.self }
}
