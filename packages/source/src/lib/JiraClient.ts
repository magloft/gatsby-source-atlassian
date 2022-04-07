import { Version3Client } from 'jira.js'
import { IssueBean, IssueTypeDetails, Priority, Project, Scope, SearchResults, StatusDetails, User, UserDetails, Version, Votes } from 'jira.js/out/version3/models'
import { Cache } from './Cache'

export interface JiraClientOptions {
  host: string
  email: string
  apiToken: string
  projectId: string
  cache: Cache
}

export interface JiraStatusData extends StatusDetails {
  id: string
  scope?: Scope
}

export interface JiraPriorityData extends Priority {
  id: string
}

export interface JiraVersionData extends Version {
  id: string
}

export interface JiraUserData extends User {
  id: string
}

export interface JiraIssueTypeData extends IssueTypeDetails {
  id: string
}

export interface JiraIssueData extends Omit<IssueBean, 'fields' | 'renderedFields'> {
  fields: {
    summary: string
    created: string
    updated: string
    labels: string[]
    progress: { progress: number; total: number }
    votes: Votes
    fixVersions: { id: string }[]
    assignee: UserDetails
    status: JiraStatusData
    priority: JiraPriorityData
    issuetype: JiraIssueTypeData
  }
  renderedFields: {
    description?: string
  }
}

export interface IssueSearchResults extends Omit<SearchResults, 'issues'> {
  issues?: JiraIssueData[]
}

export class JiraClient {
  public project: Project
  private client: Version3Client

  static async create(options: JiraClientOptions): Promise<JiraClient> {
    const client = new JiraClient(options)
    await client.init()
    return client
  }

  constructor(private options: JiraClientOptions) {
    this.client = new Version3Client({ host: `https://${options.host}`, authentication: { basic: { email: options.email, apiToken: options.apiToken } } })
  }

  async init() {
    this.project = await this.options.cache.around('getProject', this.cacheParams, () => this.client.projects.getProject({ projectIdOrKey: this.options.projectId }))
  }

  getVersions(): Promise<JiraVersionData[]> {
    return this.options.cache.around('getVersions', this.cacheParams, () => this.client.projectVersions.getProjectVersions<JiraVersionData[]>({ projectIdOrKey: this.project.id }))
  }

  getUsers(): Promise<JiraUserData[]> {
    return this.options.cache.around('getUsers', this.cacheParams, async () => {
      const allUsers = await this.client.users.getAllUsers<JiraUserData[]>()
      const atlassianUsers = allUsers.filter((user) => user.accountType === 'atlassian')
      return atlassianUsers.map((user) => ({ ...user, id: user.accountId }))
    })
  }

  getPriorities(): Promise<JiraPriorityData[]> {
    return this.options.cache.around('getPriorities', this.cacheParams, async () => {
      return this.client.issuePriorities.getPriorities<JiraPriorityData[]>()
    })
  }

  getStatusList(): Promise<JiraStatusData[]> {
    return this.options.cache.around('getStatusList', this.cacheParams, async () => {
      const statusList = await this.client.workflowStatuses.getStatuses<JiraStatusData[]>()
      return statusList.filter(({ scope }) => scope?.project?.id === this.project.id)
    })
  }

  getIssueTypes(): Promise<JiraIssueTypeData[]> {
    return this.options.cache.around('getIssueTypes', this.cacheParams, async () => {
      return this.client.issueTypes.getIssueTypesForProject({ projectId: +this.project.id })
    })
  }

  getIssues(): Promise<JiraIssueData[]> {
    return this.options.cache.around('getIssues', this.cacheParams, async () => {
      const issues: JiraIssueData[] = []
      let hasMore = true
      let startAt = 0
      while (hasMore) {
        const result = await this.client.issueSearch.searchForIssuesUsingJql<IssueSearchResults>({
          jql: `project = ${this.project.key}`,
          fields: ['summary', 'description', 'labels', 'priority', 'progress', 'status', 'votes', 'assignee', 'updated', 'created', 'fixVersions', 'issuetype'],
          expand: 'names,renderedFields',
          fieldsByKeys: true,
          maxResults: 100,
          startAt
        })
        if (!result.issues) { return issues }
        issues.push(...result.issues)
        startAt = result.startAt + result.issues.length
        if (startAt >= result.total) { hasMore = false }
      }
      return issues
    })
  }

  private get cacheParams() {
    return { projectId: this.options.projectId }
  }
}
