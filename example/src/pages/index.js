import '@picocss/pico/css/pico.css'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import * as React from 'react'
import './index.scss'

export const query = graphql`
  query {
    allJiraVersion(
      filter: { archived: { eq: false }, issues: { elemMatch: { issueType: { name: { eq: "Story" } } } } }
      sort: { fields: releaseDate, order: DESC }
    ) {
      nodes {
        name
        description
        released
        startDate(formatString: "MM/DD//YYYY")
        releaseDate(formatString: "MM/DD//YYYY")
        issues {
          key
          issueType { name, icon { url } }
          summary
          status { name, jiraId }
          assignee { displayName, avatar { childImageSharp { gatsbyImageData(height: 24, width: 24) } } }
        }
      }
    }
  }`

const IndexPage = (params) => {
  const versions = params.data.allJiraVersion.nodes
  return (
    <React.Fragment>
      <nav className="container-fluid">
        <ul><li><strong>gatsby-source-atlassian</strong></li></ul>
        <ul><li><a href="https://github.com/magloft/gatsby-source-atlassian/" target="_blank" rel="noreferrer">Github</a></li></ul>
      </nav>
      <main className="container">
        <article>
          <header>Releases</header>
          {versions.map((version, index) => {
            const completedTasks = version.issues.filter((issue) => issue.status.jiraId === '10038').length
            const progress = Math.floor((completedTasks / version.issues.length) * 100)
            return (
              <details key={index} open={index === 0}>
                <summary className="version-header">
                  <div className="version-name">{version.name}</div>
                  <div className="version-progress"><progress value={progress} max="100"></progress></div>
                  <div className="version-status"><mark className={version.released ? 'released' : 'unreleased'}>{version.released ? 'released' : 'unreleased'}</mark></div>
                </summary>
                {version.issues.map((issue, index) => (
                  <div key={index} className="task">
                    <div className="task-icon"><img src={issue.issueType.icon.url} alt={issue.issueType.name} /></div>
                    <div className="task-key">{issue.key}</div>
                    <div className="task-summary">{issue.summary}</div>
                    <div className="task-status"><mark className={`status-${issue.status.jiraId}`}>{issue.status.name}</mark></div>
                    <div className="task-assignee">
                      {issue.assignee && <GatsbyImage image={issue.assignee.avatar.childImageSharp.gatsbyImageData} alt={issue.assignee.displayName} />}
                    </div>
                  </div>
                ))}
              </details>
            )
          })}
        </article>
      </main>
    </React.Fragment>
  )
}

export default IndexPage
