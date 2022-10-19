import { shield, rule } from 'graphql-shield';

const isLogIn = rule()(async (parent, args, context) => {
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