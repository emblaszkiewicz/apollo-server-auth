import Book from '../models/Book.js';
import User from '../models/User.js';
import { TBook, TUser, TGetUser, TEditUser } from '../types/types.js';
import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';

export const resolvers = {
    Query: {
        async getAllBooks() {
            return Book.find();
        },
        async getUser<T>(parent: T, args: TGetUser) {
            return User.findById(args.id);
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
        async registerUser<T>(parent: T, args: TUser) {
            try {
                const { userName, email, password } = args;
                if (!email || !email.toLowerCase().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) || !password || password.length < 6) {
                    return new GraphQLError('Invalid email or password');
                }
                const codedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ userName, email, password: codedPassword });
                await newUser.save();
                return newUser;
            } catch (err) {
                throw new GraphQLError(`Error: ${err}`);
            }
        },
        async loginUser<T>(parent: T, args: TUser, context: any) {
            try {
                const { email, password } = args;
                const user = await User.findOne({ email });
                if (user && await bcrypt.compare(password, user.password)) {
                    context.session.userName = user.userName;
                    console.log(context);
                    return user;
                }
                return new GraphQLError('Incorrect email or password!');
            } catch (err) {
                throw new GraphQLError(`Error: ${err}`);
            }
        },
        async editUser<T>(parent: T, args: TEditUser) {
            try {
                const { id, userName } = args;
                await User.updateOne(
                    { _id: id },
                    { $set: { userName } }
                );
                return User.findById(id);
            } catch (err) {
                throw new GraphQLError(`Error: ${err}`);
            }
        },
        async logout(parent: any, args: any, context: any) {
            context.session.destroy();
            console.log(context);
        }
    }
};