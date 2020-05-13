import gql from 'graphql-tag'

export const subscriptionFavCreate = gql `
subscription {
  favCreated {
    name
    openGraphImageUrl
    stargazers
    url
  }
}
`

export const subscriptionFavDelete = gql `
subscription {
  favDeleted {
    name
    openGraphImageUrl
    stargazers
    url
  }
}
`