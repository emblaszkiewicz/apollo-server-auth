import { shield, rule, and } from 'graphql-shield';
const isLogIn = rule()(async (parent, args, context) => {
    return context.session.isLogin;
});
const isAdmin = rule()(async (parent, args, context) => {
    return context.user.role === 'admin';
});
const permissions = shield({
    Query: {
        getUser: (isLogIn),
        filterBooks: (isLogIn)
    },
    Mutation: {
        addBook: (isLogIn),
        editUser: and(isLogIn, isAdmin),
        logout: (isLogIn)
    }
});
export default permissions;
