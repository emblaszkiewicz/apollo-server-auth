"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.booksResolvers = void 0;
const Book_1 = __importDefault(require("../../models/Book"));
const types_1 = require("../../types/types");
const graphql_1 = require("graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
exports.booksResolvers = {
    Query: {
        async filterBooks(parent, args, context) {
            console.log(context.session);
            const { limitPerPage, page, bookAuthor, bookTitle, bookDesc, genre, sort } = args;
            const filters = {
                bookAuthor: { $regex: bookAuthor || '', $options: 'i' },
                bookTitle: { $regex: bookTitle || '', $options: 'i' },
                bookDesc: { $regex: bookDesc || '', $options: 'i' },
                genre: { $regex: genre || '', $options: 'i' },
            };
            const books = await Book_1.default.find(filters)
                .sort(sort)
                .limit(limitPerPage)
                .skip((page - 1) * limitPerPage);
            const count = await Book_1.default.countDocuments(filters);
            return {
                books,
                page,
                totalPages: Math.ceil(count / limitPerPage)
            };
        },
        async findBookByID(parent, { _id }) {
            return Book_1.default.findById((_id));
        }
    },
    Mutation: {
        async addBook(parent, args) {
            try {
                const { bookAuthor, bookTitle, bookDesc, genre } = args;
                const newBook = new Book_1.default({ bookAuthor, bookTitle, bookDesc, genre });
                await newBook.save();
                await pubsub.publish('BOOK_CREATED', { bookAdded: newBook });
                await pubsub.publish('FILTER_BOOK_CREATED', { filterBookAdded: newBook });
                return newBook;
            }
            catch (err) {
                throw new graphql_1.GraphQLError(`Error: ${err}`);
            }
        },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_CREATED']),
        },
        filterBookAdded: {
            subscribe: (0, graphql_subscriptions_1.withFilter)(() => pubsub.asyncIterator(['FILTER_BOOK_CREATED']), (payload, args) => {
                return payload.filterBookAdded.genre === args.genre;
            }),
        }
    },
    TGenres: {
        Fiction: types_1.TGenres.Fiction,
        Thriller: types_1.TGenres.Thriller,
        Drama: types_1.TGenres.Drama
    },
    TSort: {
        AuthorAlphabetically: { bookAuthor: types_1.TSort.AuthorAlphabetically },
        TitleAlphabetically: { bookTitle: types_1.TSort.TitleAlphabetically }
    }
};
