import { JiraVersionData } from '~/lib/JiraClient'
import { Model } from './Model'

export class JiraVersion extends Model<JiraVersionData> {
  get id() { return this.data.id }
  get fields() { return ['name', 'description', 'startDate', 'releaseDate', 'released', 'overdue', 'archived', 'self'] }

  get name() { return this.data.name }
  get description() { return this.data.description }
  get startDate() { return this.data.startDate ? new Date(this.data.startDate) : undefined }
  get releaseDate() { return this.data.releaseDate ? new Date(this.data.releaseDate) : undefined }
  get released() { return this.data.released }
  get overdue() { return this.data.overdue }
  get archived() { return this.data.archived }
  get self() { return this.data.self }
}
