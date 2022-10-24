import { booksResolvers } from './books/books';
import { usersResolvers } from './users/users';

export const resolvers = [booksResolvers, usersResolvers];