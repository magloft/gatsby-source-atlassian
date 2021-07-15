import { CreateSchemaCustomizationArgs } from 'gatsby'

export function createSchemaCustomization({ actions: { createTypes } }: CreateSchemaCustomizationArgs) {
  createTypes(`
    type JiraIssueType implements Node { id: ID!, icon: File @link }
    type JiraPriority implements Node { id: ID!, icon: File @link }
    type JiraStatus implements Node { id: ID!, icon: File @link }
    type JiraUser implements Node { id: ID!, avatar: File @link }
  `)
}
