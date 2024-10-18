import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql

  type Player {
    name: String!
    level: Int!
  }

  type Query {
    players: [Player]
  }
`;

const players = [
  {
    name: "sung jinwoo",
    level: 10,
  },
  {
    name: "ling ce",
    level: 120,
  },
];

const resolvers = {
  Query: {
    players: () => players,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
