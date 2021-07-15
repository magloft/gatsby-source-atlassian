const { createSchemaCustomization } = require('./dist/createSchemaCustomization')
const { onCreateNode } = require('./dist/onCreateNode')
const { pluginOptionsSchema } = require('./dist/pluginOptionsSchema')
const { sourceNodes } = require('./dist/sourceNodes')

module.exports = { createSchemaCustomization, onCreateNode, pluginOptionsSchema, sourceNodes }
