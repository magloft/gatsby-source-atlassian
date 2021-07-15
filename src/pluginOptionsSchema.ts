import { PluginOptionsSchemaArgs } from 'gatsby'

export function pluginOptionsSchema({ Joi }: PluginOptionsSchemaArgs) {
  return Joi.object({
    host: Joi.string().domain().description('Atlassian Host Domain'),
    email: Joi.string().email().required().description('Atlassian User Email Address'),
    apiToken: Joi.string().required().description('Atlassian API Token'),
    projectId: Joi.string().required().description('Jira Project Id'),
    cacheAdapter: Joi.string().required().allow('gatsby', 'persist').default('gatsby').description('Cache Adapter (gatsby, persist)')
  })
}
