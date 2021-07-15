import { SourceNodesArgs } from 'gatsby'
import { Cache } from '~/lib/Cache'
import { CacheAdapterGatsby } from '~/lib/CacheAdapter/CacheAdapterGatsby'
import { CacheAdapterPersist } from '~/lib/CacheAdapter/CacheAdapterPersist'
import { JiraClient } from '~/lib/JiraClient'
import { JiraIssue } from '~/Models/JiraIssue'
import { JiraIssueType } from '~/Models/JiraIssueType'
import { JiraPriority } from '~/Models/JiraPriority'
import { JiraStatus } from '~/Models/JiraStatus'
import { JiraUser } from '~/Models/JiraUser'
import { JiraVersion } from '~/Models/JiraVersion'
import { ModelContext } from '~/Models/Model'
import { PluginOptions } from '~/types/PluginOptions'

export const CacheAdapterMap = {
  'gatsby': CacheAdapterGatsby,
  'persist': CacheAdapterPersist
}

export async function sourceNodes(args: SourceNodesArgs, { host, email, apiToken, projectId, cacheAdapter }: PluginOptions): Promise<void> {
  const CacheAdapter = CacheAdapterMap[cacheAdapter]
  const adapter = new CacheAdapter(args)
  const cache = new Cache(adapter)
  const client = await JiraClient.create({ host, email, apiToken, projectId, cache })
  const context: ModelContext = { createNodeId: args.createNodeId, createNode: args.actions.createNode, createContentDigest: args.createContentDigest }

  // Retrieve Data
  const issueTypes = JiraIssueType.map(await client.getIssueTypes(), context)
  const statusList = JiraStatus.map(await client.getStatusList(), context)
  const priorities = JiraPriority.map(await client.getPriorities(), context)
  const versions = JiraVersion.map(await client.getVersions(), context)
  const issues = JiraIssue.map(await client.getIssues(), context)
  const users = JiraUser.map(await client.getUsers(), context)

  // Links from Issues
  JiraIssue.link(issues, 'versions', (issue) => versions.filter((version) => issue.versionIds.includes(version.id)))
  JiraIssue.link(issues, 'assignee', (issue) => users.find((user) => user.id === issue.assigneeId))
  JiraIssue.link(issues, 'status', (issue) => statusList.find((status) => status.id === issue.statusId))
  JiraIssue.link(issues, 'priority', (issue) => priorities.find((priority) => priority.id === issue.priorityId))
  JiraIssue.link(issues, 'issueType', (issue) => issueTypes.find((issueType) => issueType.id === issue.issueTypeId))

  // Links to Issues
  JiraVersion.link(versions, 'issues', (version) => issues.filter((issue) => issue.versionIds.includes(version.id)))
  JiraUser.link(users, 'issues', (user) => issues.filter((issue) => issue.assigneeId === user.id))
  JiraStatus.link(statusList, 'issues', (status) => issues.filter((issue) => issue.statusId === status.id))
  JiraPriority.link(priorities, 'issues', (priority) => issues.filter((issue) => issue.priorityId === priority.id))
  JiraIssueType.link(issueTypes, 'issues', (issueType) => issues.filter((issue) => issue.issueTypeId === issueType.id))

  // Build Nodes
  for (const model of [...issueTypes, ...priorities, ...statusList, ...versions, ...issues, ...users]) {
    model.build()
  }
}
