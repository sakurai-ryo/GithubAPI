export const searchQuery = `
query($repoName: String!) {
  search(query: $repoName, type: REPOSITORY, first: 50) {
    edges {
      node {
        ... on Repository {
          name
          openGraphImageUrl
          stargazers{
            totalCount
          }
          url
        }
      }
    }
  }
}
`