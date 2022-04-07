import { CreateSchemaCustomizationArgs } from 'gatsby'

export function createSchemaCustomization({ actions: { createTypes } }: CreateSchemaCustomizationArgs) {
  createTypes(`
    type JiraIssueType implements Node { id: ID!, icon: File @link(from: "iconId") }
    type JiraPriority implements Node { id: ID!, icon: File @link(from: "iconId") }
    type JiraStatus implements Node { id: ID!, icon: File @link(from: "iconId") }
    type JiraUser implements Node { id: ID!, avatar: File @link(from: "avatarId") }
  `)
}
