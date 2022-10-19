import Book from '../../models/Book.js';
import { TBook, TPagination } from '../../types/types.js';
import { GraphQLError } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const booksResolvers = {
    Query: {
        async getAllBooks() {
            return Book.find();
        },
        async pagination<T>(parent: T, args: TPagination) {
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
        async addBook<T>(parent: T, args: TBook) {
            try {
                const { bookAuthor, bookTitle, bookDesc } = args;
                const newBook = new Book({ bookAuthor, bookTitle, bookDesc });
                await newBook.save();
                await pubsub.publish('BOOK_CREATED', { bookAdded: newBook });
                return newBook;
            } catch (err) {
                throw new GraphQLError(`Error: ${err}`);
            }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_CREATED']),
        }
    }
};