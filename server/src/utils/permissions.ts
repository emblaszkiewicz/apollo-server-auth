import { shield, rule, and } from 'graphql-shield';
import { TContext, TUser } from '../types/types';

const isLogIn = rule()(async<T> (parent: T, args: T, context: TContext<TUser>) => {
    return context.session.isLogin || context.session.passport.user;
});

const isAdmin = rule()(async<T> (parent: T, args: T, context: TContext<TUser>) => {
    return context.user.role === 'admin';
});

const permissions = shield({
    Query: {
        getUser: (isLogIn),
        filterBooks: (isLogIn),
        findBookByID: (isLogIn),
        //getCalendarEvents: (isLogIn)
    },
    Mutation: {
        addBook: (isLogIn),
        editUser: and(isLogIn, isAdmin),
        logout: (isLogIn)
    },
    Subscription: {
        bookAdded: (isLogIn),
        filterBookAdded: (isLogIn)
    }
});

export default permissions;