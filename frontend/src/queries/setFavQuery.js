import gql from 'graphql-tag'
export const setFavQuery = gql `
mutation($name: String!, $openGraphImageUrl: String!, $stargazers: Int!, $url: String!) {
  createFav(
    name: $name
    openGraphImageUrl:$openGraphImageUrl 
    stargazers: $stargazers 
    url: $url
  ) {
    name
    openGraphImageUrl
    stargazers 
    url
  }
}
`