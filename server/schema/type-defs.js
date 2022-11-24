const { gql } = require("apollo-server");

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    house: House
    friends: [User]
    courses: [Course]
  }
  type Course {
    id: ID!
    name: String!
    professor: String!
    courseType: String!
    currentlyOffered: Boolean!
  }
  type Query {
    users: [User!]!
    user(id: ID!): User!
    courses: [Course!]!
    course(name: String!): Course!
  }
  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    house: House!
  }
  input UpdateUsernameInput {
    id: ID!
    newUsername: String!
  }
  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(id: ID!): User
  }
  enum House {
    GRYFFINDOR
    HUFFLEPUFF
    RAVENCLAW
    SLYTHERIN
  }
`;

module.exports = { typeDefs };
