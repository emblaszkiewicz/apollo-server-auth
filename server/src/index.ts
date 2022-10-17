import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import { typeDefs } from './typeDefs/index.js';
import { resolvers } from './resolvers/index.js';
import mongoose from 'mongoose';
import { TMyContext } from './types/types';

async function startApolloServer() {
    mongoose.connect(process.env.DB_URI)
        .then(() => console.log('Connected to the database!'));
    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer<TMyContext>({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    app.use(
        '/',
        cors<cors.CorsRequest>(),
        bodyParser.json(),
        session({
            secret: "secret",
            resave: false,
            saveUninitialized: true,
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
            },
        }),
        expressMiddleware(server, {
            context: async ({ req }: any) => (
                {
                    session: req.session,
            }),
        }),
    );
    await new Promise<void>((resolve) =>
        httpServer.listen({ port: 4000 }, resolve),
    );
}

startApolloServer().then(() => console.log(`Server ready at http://localhost:4000/`));
