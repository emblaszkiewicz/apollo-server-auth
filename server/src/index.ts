import 'dotenv/config';
import {ApolloServer} from '@apollo/server';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import {expressMiddleware} from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import {WebSocketServer} from 'ws';
import {useServer} from 'graphql-ws/lib/use/ws';
import {schemaSettings, connectDB} from './settings/settings';
import './settings/strategy';
import passport from 'passport';
import session from 'express-session';
import authRoutes from './routes/authRoutes';
import bodyParser from "body-parser";
import cors from 'cors';
import expressPlayground from 'graphql-playground-middleware-express';

async function startApolloServer() {
    await connectDB();      //<-- connect database
    const app = express();      //<--- run express server
    const httpServer = http.createServer(app);
    const wsServer = new WebSocketServer({      //<-- create WebSocket server
        server: httpServer,
        path: '/graphql',
    });
    const serverCleanup = useServer({
            schema: schemaSettings,
            context: async (ctx, msg, args) => {
                return ctx.connectionParams;
            }
        },
        wsServer
    );
    const server = new ApolloServer({       //<-- new ApolloServer instance
        schema: schemaSettings,
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer}),
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
    app.use(cors({
        //origin: "http://localhost:3000",
        origin: "http://localhost:5173",
        methods: "GET, POST, PUT, DELETE",
        credentials: true
    }));
    app.use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    }));
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/auth', authRoutes);
    app.get("/playground", expressPlayground({endpoint: "/graphql"}));
    app.use(        //<-- set middleware
        '/graphql',
        expressMiddleware(server, {     //<-- add to apollo context
            context: async ({req}) => (
                {
                    session: req.session,
                }),
        }),
    );
    await new Promise<void>((resolve) =>
        httpServer.listen({port: 4000}, resolve),
    );
}

startApolloServer().then(() => console.log(`Server ready at http://localhost:4000/`));