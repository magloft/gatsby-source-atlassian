# gatsby-source-atlassian

Source plugin for pulling issues, issue types, users and versions into Gatsby from
Atlassian Jira projects. This plugin uses the Atlassian REST API V3 to import content
and creates links between all types and assets to be be queried in Gatsby using GraphQL.

An example site for using this plugin hosted here:
https://magloft.github.io/gatsby-source-atlassian/

## Installation

```shell
npm install gatsby-source-atlassian
# OR
yarn add gatsby-source-atlassian
```

## How to use

Configure Plugin Options:
```js
{
  resolve: 'gatsby-source-atlassian',
  options: {
    host: 'name.atlassian.net',       // Your Jira Cloud Host Name
    email: 'your@email.com',          // Your Jira Cloud Email Address
    apiToken: 'ATLASSIAN_API_TOKEN',  // Your Jira Cloud API Token
    projectId: 'GSA',                 // Your Jira Project ID
    cacheAdapter: 'gatsby'            // Cache Adapter, either `gatsby` or `persist`
  }
}
```
