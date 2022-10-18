import Book from '../../models/Book.js';
import { GraphQLError } from 'graphql';
export const booksResolvers = {
    Query: {
        async getAllBooks() {
            return Book.find();
        },
        async pagination(parent, args) {
            const { limitPerPage, page } = args;
            const books = await Book.find()
                .limit(limitPerPage)
                .skip((page - 1) * limitPerPage);
            const count = await Book.countDocuments();
            return {
                books,
                page,
                totalPages: Math.ceil(count / limitPerPage)
            };
        }
    },
    Mutation: {
        async addBook(parent, args) {
            try {
                const { bookAuthor, bookTitle, bookDesc } = args;
                const newBook = new Book({ bookAuthor, bookTitle, bookDesc });
                await newBook.save();
                return newBook;
            }
            catch (err) {
                throw new GraphQLError(`Error: ${err}`);
            }
        },
    }
};
