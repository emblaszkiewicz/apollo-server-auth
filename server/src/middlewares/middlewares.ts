import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';

const middlewares = [
    '/graphql',
    cors<cors.CorsRequest>(),
    bodyParser.json(),
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
];

export default middlewares;