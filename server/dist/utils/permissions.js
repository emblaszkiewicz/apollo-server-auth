"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_shield_1 = require("graphql-shield");
const isLogIn = (0, graphql_shield_1.rule)()(async (parent, args, context) => {
    return context.session.isLogin;
});
const isAdmin = (0, graphql_shield_1.rule)()(async (parent, args, context) => {
    return context.user.role === 'admin';
});
const permissions = (0, graphql_shield_1.shield)({
    Query: {
    //getUser: (isLogIn),
    //filterBooks: (isLogIn),
    //findBookByID: (isLogIn),
    //getCalendarEvents: (isLogIn)
    },
    Mutation: {
    //addBook: (isLogIn),
    //editUser: and(isLogIn, isAdmin),
    //logout: (isLogIn),
    //addCalendarEvent: (isLogIn)
    },
    Subscription: {
    //bookAdded: (isLogIn),
    //filterBookAdded: (isLogIn)
    }
});
exports.default = permissions;
