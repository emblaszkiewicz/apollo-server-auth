/*
import { shield, rule } from 'graphql-shield';

const isLogIn = rule()(async (parent, args, context) => {
    if(context.user) return context.session.isLoggin;
});

const permissions =  shield({
    Query: {
        getAllBooks: (isLogIn),
        getUser: (isLogIn)
    },
    Mutation: {
        addBook: (isLogIn),
        editUser: (isLogIn),
        logout: (isLogIn)
    }
});

export default permissions;*/
