import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const typeDefs = `#graphql

  type Player {
    name: String!
    level: Int!
  }

  type Query {
    players: [Player]
  }
`;

const resolvers = {
  Query: {
    players: async () => {
      const result = await db.query("select * from players");
      return result.rows;
    },
  },
};

interface MyContext {
  token?: String;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000 }, resolve),
);
console.log(`🚀 Server ready at http://localhost:4000/graphql`);
