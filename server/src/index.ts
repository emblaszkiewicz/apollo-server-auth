import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import User from './models/User.js';
import { schemaSettings, connectDB } from './settings/settings.js';
import middlewares from './middlewares/middlewares.js';

async function startApolloServer() {
    await connectDB();      //<-- connect database
    const app = express();      //<--- run express server
    const httpServer = http.createServer(app);
    const wsServer = new WebSocketServer({      //<-- create WebSocket server
        server: httpServer,
        path: '/',
    });
    const serverCleanup = useServer({ schema: schemaSettings }, wsServer);
    const server = new ApolloServer({       //<-- new ApolloServer instance
        schema: schemaSettings,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });
    await server.start();       //<-- start server
    app.use(        //<-- set middleware
        ...middlewares,
        expressMiddleware(server, {     //<-- add to apollo context
            context: async({ req }) => (
                {
                    session: req.session,
                    user: await User.findOne({ userName: req.session.userName })
                }),
        }),
    );
    await new Promise<void>((resolve) =>
        httpServer.listen({ port: 4000 }, resolve),
    );
}

startApolloServer().then(() => console.log(`Server ready at http://localhost:4000/`));
