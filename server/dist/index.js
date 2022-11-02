"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_1 = require("@apollo/server");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express4_1 = require("@apollo/server/express4");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const User_1 = __importDefault(require("./models/User"));
const settings_1 = require("./settings/settings");
require("./settings/strategy");
const passport_1 = __importDefault(require("passport"));
const express_session_1 = __importDefault(require("express-session"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
async function startApolloServer() {
    await (0, settings_1.connectDB)(); //<-- connect database
    const app = (0, express_1.default)(); //<--- run express server
    const httpServer = http_1.default.createServer(app);
    const wsServer = new ws_1.WebSocketServer({
        server: httpServer,
        path: '/graphql',
    });
    const serverCleanup = (0, ws_2.useServer)({ schema: settings_1.schemaSettings }, wsServer);
    const server = new server_1.ApolloServer({
        schema: settings_1.schemaSettings,
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
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
    await server.start(); //<-- start server
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    app.use((0, express_session_1.default)({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    }));
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use('/auth', authRoutes_1.default);
    // app.use('/graphql', isLoggedIn, (req: Request, res: Response, next: NextFunction) => {
    //     expressMiddleware(server, {
    //         context: async ({ req }) => ({
    //             session: req.session
    //         })
    //     });
    // });
    app.use(//<-- set middleware
    '/graphql', 
    //cors<cors.CorsRequest>(),
    //bodyParser.json(),
    (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => ({
            session: req.session,
            user: await User_1.default.findOne({ userName: req.session.userName })
        }),
    }));
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
}
startApolloServer().then(() => console.log(`Server ready at http://localhost:4000/`));
