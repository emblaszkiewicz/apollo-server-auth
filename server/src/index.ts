import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express, { Request, Response, NextFunction } from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import User from './models/User';
import { schemaSettings, connectDB } from './settings/settings';
import './settings/strategy';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/authRoutes';
import { isLoggedIn } from './utils/isLoggedIn';
import bodyParser from "body-parser";
import cors from 'cors';

async function startApolloServer() {
    await connectDB();      //<-- connect database
    const app = express();      //<--- run express server
    const httpServer = http.createServer(app);
    const wsServer = new WebSocketServer({      //<-- create WebSocket server
        server: httpServer,
        path: '/graphql',
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
    app.use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/auth', authRoutes);
    app.get('/graphql', isLoggedIn, (req: Request, res: Response, next: NextFunction) => {
        next();
    });
    app.use(        //<-- set middleware
        '/graphql',
        cors<cors.CorsRequest>(),
        bodyParser.json(),
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
