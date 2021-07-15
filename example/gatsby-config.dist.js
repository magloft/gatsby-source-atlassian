module.exports = {
  pathPrefix: '/gatsby-source-atlassian',
  siteMetadata: { siteUrl: 'https://magloft.github.io/gatsby-source-atlassian/', title: 'gatsby-source-atlassian' },
  plugins: [
    {
      resolve: 'gatsby-source-atlassian',
      options: { host: 'HOST', email: 'EMAIL', apiToken: 'API_TOKEN', projectId: 'PROJECT_ID', cacheAdapter: 'persist' }
    },
    { resolve: 'gatsby-source-filesystem', options: { name: 'images', path: `${__dirname}/src/images` } },
    { resolve: 'gatsby-plugin-sass' },
    { resolve: 'gatsby-plugin-image' },
    { resolve: 'gatsby-plugin-sharp' },
    { resolve: 'gatsby-transformer-sharp' }
  ]
}
