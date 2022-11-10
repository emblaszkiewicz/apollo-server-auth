import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDefs } from '../typeDefs/index';
import { resolvers } from '../resolvers/index';
import permissions from '../utils/permissions';
import mongoose from 'mongoose';

export const schemaSettings = applyMiddleware(
    makeExecutableSchema({
        typeDefs,
        resolvers
    }),
    permissions
)

export const connectDB = () => {
    return mongoose.connect(process.env.DB_URI)
        .then(() => console.log('Connected to the database!'));
};