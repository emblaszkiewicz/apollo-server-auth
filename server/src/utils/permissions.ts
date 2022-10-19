import { shield, rule } from 'graphql-shield';
import { TContext, TUser } from '../types/types';

const isLogIn = rule()(async<T> (parent: T, args: T, context: TContext<TUser>) => {
    return context.session.isLogin;
});

const permissions = shield({
    Query: {
        getAllBooks: (isLogIn),
        getUser: (isLogIn),
        pagination: (isLogIn)
    },
    Mutation: {
        addBook: (isLogIn),
        editUser: (isLogIn),
        logout: (isLogIn)
    }
});

export default permissions;