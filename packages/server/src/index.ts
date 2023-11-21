import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import gql from 'graphql-tag';
import http from 'node:http';
import 'reflect-metadata';

import DataServices from './containers/data-services.js';
import container from './containers/inversify.config.js';

dotenv.config();

const { myClass } = new DataServices(container);

const typeDefs = gql.default`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => myClass.myValue,
  },
};

const { json } = bodyParser;

const app = express();
app.use(cors());
app.use(express.json());
const httpServer = http.createServer(app);

const server = new ApolloServer({
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  resolvers,
  typeDefs,
});

await server.start();

app.get('/', (_, response) => {
  response.status(301).redirect('/graphql');
});

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  json(),
  expressMiddleware(server),
);

export default httpServer;
