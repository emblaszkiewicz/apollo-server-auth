import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
export const middlewares = [
    '/',
    cors(),
    bodyParser.json(),
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
    }),
];
