import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import User from './models/User';
import { schemaSettings, connectDB } from './settings/settings';
import middlewares from './middlewares/middlewares';
import loginRoutes from './routes/loginRoutes';
import './settings/strategy';
import passport from 'passport';
import session from 'express-session';

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
    function isLoggedIn(req, res, next) {
        req.user ? next() : res.sendStatus(401);
    };
    app.use(session({ secret: "secret", resave: false, saveUninitialized: true, }));
    //app.use(passport.initialize());
    app.use(passport.session());
    app.use('/login', loginRoutes);
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['email', 'profile'] })
    );
    app.get('/google/callback',
        passport.authenticate('google', {
            successRedirect: '/protected',
            failureRedirect: '/auth/failure',
        })
    );
    app.get('/protected', isLoggedIn, (req: any, res) => {
        res.send(`Hello ${req.user.displayName}! <br> <a href="/logout">Log out!</a>`);
        console.log(req.user);
    });
    app.get('/auth/failure', (req, res) => {
        res.send('Login failed!');
    });
    app.get('/logout', (req: any, res) => {
        req.session.destroy();
        res.send('Goodbye!');
    });
    await new Promise<void>((resolve) =>
        httpServer.listen({ port: 4000 }, resolve),
    );
}

startApolloServer().then(() => console.log(`Server ready at http://localhost:4000/`));
