import { CreateNodeArgs } from 'gatsby'
import { createRemoteFileNode } from 'gatsby-source-filesystem'

async function createImageNode({ node, cache, store, reporter, actions: { createNode }, createNodeId }: CreateNodeArgs, url: unknown): Promise<string | null> {
  const fileNode = await createRemoteFileNode({ url: url as string, name: node.id, cache, store, reporter, createNode, createNodeId, parentNodeId: node.id })
  if (!fileNode) { return null }
  return fileNode.id
}

export async function onCreateNode(args: CreateNodeArgs) {
  // const { node } = args
  // switch (node.internal.type) {
  // case 'JiraIssueType': { node.icon = await createImageNode(args, node.iconUrl); break }
  // case 'JiraPriority': { node.icon = await createImageNode(args, node.iconUrl); break }
  // case 'JiraStatus': { node.icon = await createImageNode(args, node.iconUrl); break }
  // case 'JiraUser': { node.avatar = await createImageNode(args, node.avatarUrl); break }
  // default: { break }
  // }
}
