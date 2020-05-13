const {
  gql
} = require('apollo-server-express');

const typeDefs = gql `
type setFavorite {
  name: String!
  openGraphImageUrl: String!
  stargazers: Int! 
  url: String!
}
type returnFavorite{
  id: ID!
  name: String!
  openGraphImageUrl: String!
  stargazers: Int! 
  url: String!
}
type Query {
  favorites: [returnFavorite!]!
}
type Mutation {
  # 登録
  createFav(
    name: String!
    openGraphImageUrl: String!
    stargazers: Int!
    url: String!
  ): setFavorite!
    
  # 削除
  deleteFav(
    id: ID!
  ): returnFavorite!
}
type Subscription {
    favCreated: returnFavorite!
    favDeleted: returnFavorite!
}
`
module.exports = typeDefs;