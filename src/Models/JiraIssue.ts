import { JiraIssueData } from '../lib/JiraClient'
import { Model, ModelInterface } from './Model'

export class JiraIssue extends Model<JiraIssueData> implements ModelInterface {
  get id() { return this.data.id }
  get fields() { return ['summary', 'created', 'updated', 'labels', 'progress', 'votes', 'description', 'self'] }

  get summary() { return this.data.fields.summary }
  get created() { return new Date(this.data.fields.created) }
  get updated() { return new Date(this.data.fields.updated) }
  get labels() { return this.data.fields.labels }
  get progress() { return this.data.fields.progress }
  get votes() { return this.data.fields.votes.votes }
  get description() { return this.data.renderedFields.description }
  get self() { return this.data.self }

  get versionIds() { return this.data.fields.fixVersions.map(({ id }) => id) ?? [] }
  get assigneeId() { return this.data.fields.assignee?.accountId }
  get statusId() { return this.data.fields.status?.id }
  get priorityId() { return this.data.fields.priority?.id }
  get issueTypeId() { return this.data.fields.issuetype?.id }
}
