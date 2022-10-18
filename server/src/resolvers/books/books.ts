import Book from '../../models/Book.js';
import { TBook } from '../../types/types.js';
import { GraphQLError } from 'graphql';

export const booksResolvers = {
    Query: {
        async getAllBooks() {
            return Book.find();
        }
    },
    Mutation: {
        async addBook<T>(parent: T, args: TBook, context: any) {
            try {
                if(!context.user) {
                    console.log(context);
                    return new GraphQLError('You must log in!');
                }
                const { bookAuthor, bookTitle, bookDesc } = args;
                const newBook = new Book({ bookAuthor, bookTitle, bookDesc });
                await newBook.save();
                console.log(context);
                return newBook;
            } catch (err) {
                throw new GraphQLError(`Error: ${err}`);
            }
        },
    }
};