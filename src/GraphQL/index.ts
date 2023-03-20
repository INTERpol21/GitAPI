import { gql } from '@apollo/client'

export const TOP_REPOS = gql`
  query GetTopRepos {
    search(query: "stars:>50000", type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          id
          name
          url
          stargazers {
            totalCount
          }
          defaultBranchRef {
            target {
              ... on Commit {
                committedDate
              }
            }
          }
        }
      }
    }
  }
`

export const GET_REPOS = gql`
  query GetRepos($getQuery: String!) {
    search(query: $getQuery, type: REPOSITORY, first: 100) {
      repositoryCount
      nodes {
        ... on Repository {
          id
          name
          url
          stargazers {
            totalCount
          }
          defaultBranchRef {
            target {
              ... on Commit {
                committedDate
              }
            }
          }
        }
      }
    }
  }
`

export const GET_INFO = gql`
  query GetRepoInfo($getId: ID!) {
    node(id: $getId) {
      ... on Repository {
        name
        stargazers {
          totalCount
        }
        defaultBranchRef {
          target {
            ... on Commit {
              committedDate
            }
          }
        }
        owner {
          avatarUrl
          login
          url
        }
        languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
          nodes {
            name
          }
        }
        description
        url
      }
    }
  }
`
