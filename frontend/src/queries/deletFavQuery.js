import gql from 'graphql-tag'
export const deleteFavQuery = gql `
mutation($id: ID!) {
    deleteFav(
      id: $id
    ) {
      id
      name
      openGraphImageUrl
      stargazers
      url
    }
  }
`