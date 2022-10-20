import Book from '../../models/Book.js';
import { TBook, TGenres, TPagination } from '../../types/types.js';
import { GraphQLError, subscribe } from 'graphql';
import { PubSub, withFilter } from 'graphql-subscriptions';

const pubsub = new PubSub();

export const booksResolvers = {
    Query: {
        async filterBooks<T>(parent: T, { filterInput: { bookAuthor, bookTitle, bookDesc, genre }, pagination: { limitPerPage, page } }) {
            const filters = {
                bookAuthor: {$regex: bookAuthor || '', $options: 'i'},
                bookTitle: {$regex: bookTitle || '', $options: 'i'},
                bookDesc: {$regex: bookDesc || '', $options: 'i'},
                genre: {$regex: genre || '', $options: 'i'},
            };
            const books = await Book.find(filters).limit(limitPerPage).skip((page -1 ) * limitPerPage);
            const count = await Book.countDocuments(filters);
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
                const { bookAuthor, bookTitle, bookDesc, genre } = args;
                const newBook = new Book({ bookAuthor, bookTitle, bookDesc, genre });
                await newBook.save();
                await pubsub.publish('BOOK_CREATED', { bookAdded: newBook });
                await pubsub.publish('FILTER_BOOK_CREATED', { filterBookAdded: newBook });
                return newBook;
            } catch (err) {
                throw new GraphQLError(`Error: ${err}`);
            }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_CREATED']),
        },
        filterBookAdded: {
            subscribe: withFilter(
                () => pubsub.asyncIterator(['FILTER_BOOK_CREATED']),
                (payload, args) => {
                    return payload.filterBookAdded.genre === args.genre;
                },
            ),
        }
    },
    TGenres: {
        Fiction: TGenres.Fiction,
        Thriller: TGenres.Thriller,
        Drama: TGenres.Drama
    },
};