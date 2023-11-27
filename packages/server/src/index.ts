import 'reflect-metadata';

import dotenv from 'dotenv';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${__dirname}/../../.env` });

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import bodyParser from 'body-parser';
import cors from 'cors';

import express from 'express';
import DataServices from 'library/src/containers/data-services.js';
import container from 'library/src/containers/inversify.config.js';
import http from 'node:http';

import { resolvers, typeDefs } from './graphql/index.js';
import { GraphQLContext } from './graphql/types.js';

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
  expressMiddleware(server, {
    context: async (): Promise<GraphQLContext> => {
      const services = new DataServices(container);
      return services;
    },
  }),
);

export default httpServer;
