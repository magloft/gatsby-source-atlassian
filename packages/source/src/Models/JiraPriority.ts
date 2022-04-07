import { JiraPriorityData } from '~/lib/JiraClient'
import { Model } from './Model'

export class JiraPriority extends Model<JiraPriorityData> {
  get id() { return this.data.id }
  get fields() { return ['name', 'description', 'statusColor', 'iconUrl', 'iconId', 'self'] }

  get name() { return this.data.name }
  get description() { return this.data.description }
  get statusColor() { return this.data.statusColor }
  get iconUrl() { return this.data.iconUrl }
  get self() { return this.data.self }

  iconId?: string
}
