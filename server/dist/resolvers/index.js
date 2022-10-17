import Book from '../models/Book.js';
import User from '../models/User.js';
import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const resolvers = {
    Query: {
        async getAllBooks() {
            return Book.find();
        },
        async getUser(parent, args) {
            return User.findById(args.id);
        }
    },
    Mutation: {
        async addBook(parent, args) {
            const { bookAuthor, bookTitle, bookDesc } = args;
            const newBook = new Book({ bookAuthor, bookTitle, bookDesc });
            await newBook.save();
            return newBook;
        },
        async registerUser(parent, args) {
            try {
                const { userName, email, password } = args;
                if (!email || !email.toLowerCase().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) || !password || password.length < 6) {
                    return new GraphQLError('Invalid email or password');
                }
                const codedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ userName, email, password: codedPassword });
                const token = jwt.sign({
                    id: newUser._id,
                    email: newUser.email
                }, process.env.JWT_SECRET || '', {
                    expiresIn: '1d'
                });
                newUser.token = token;
                await newUser.save();
                return newUser;
            }
            catch (err) {
                throw new GraphQLError(`Error: ${err}`);
            }
        },
        async loginUser(parent, args) {
            try {
                const { email, password } = args;
                const user = await User.findOne({ email });
                if (user && await bcrypt.compare(password, user.password)) {
                    const token = jwt.sign({
                        id: user._id,
                        email: user.email
                    }, process.env.JWT_SECRET || '', {
                        expiresIn: '1d'
                    });
                    user.token = token;
                    return { user };
                }
                return new GraphQLError('Incorrect email or password!');
            }
            catch (err) {
                throw new GraphQLError(`Error: ${err}`);
            }
        },
        async editUser(parent, args, context) {
            try {
                if (context.role !== 'admin') {
                    return new GraphQLError('You have no permission!');
                }
                const { id, userName } = args;
                await User.updateOne({ _id: id }, { $set: { userName } });
                return User.findById(id);
            }
            catch (err) {
                throw new GraphQLError(`Error: ${err}`);
            }
        }
    }
};
