import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './typeDefs/index.js';
import { resolvers } from './resolvers/index.js';
import 'dotenv/config';
import mongoose from 'mongoose';
import { GraphQLError } from 'graphql';
import User from './models/User.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connected to the database!'));

const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
        const token = req.headers.token || '';
        const user = await User.findOne({ token });
        if(!user) throw new GraphQLError('User is not authenticated!');
        return user;
    },
    listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);
