
import { JiraUserData } from '~/lib/JiraClient'
import { Model } from './Model'

export class JiraUser extends Model<JiraUserData> {
  get id() { return this.data.id }
  get fields() { return ['accountType', 'accountId', 'emailAddress', 'displayName', 'avatarUrl', 'active', 'locale', 'timeZone', 'self'] }

  get accountType() { return this.data.accountType }
  get accountId() { return this.data.accountId }
  get emailAddress() { return this.data.emailAddress }
  get displayName() { return this.data.displayName }
  get avatarUrl() { return this.data.avatarUrls ? this.data.avatarUrls['48x48'] : undefined }
  get active() { return this.data.active }
  get locale() { return this.data.locale }
  get timeZone() { return this.data.timeZone }
  get self() { return this.data.self }
}
