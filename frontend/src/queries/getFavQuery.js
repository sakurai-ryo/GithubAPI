import gql from 'graphql-tag'
export const getFavQuery = gql `
query{
  favorites{
    id
    name
    openGraphImageUrl
    stargazers 
    url
  }
}
`