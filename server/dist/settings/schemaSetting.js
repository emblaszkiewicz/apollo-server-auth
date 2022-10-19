import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '../typeDefs/index.js';
import { resolvers } from '../resolvers/index.js';
import permissions from '../utils/permissions.js';
export const schemaSetting = applyMiddleware(makeExecutableSchema({
    typeDefs,
    resolvers
}), permissions);
