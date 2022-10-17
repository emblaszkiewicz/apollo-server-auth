import Book from '../models/Book.js';
import User from '../models/User.js';
import { GraphQLError } from 'graphql';
import bcrypt from 'bcryptjs';
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
        async registerUser(parent, args) {
            try {
                const { userName, email, password } = args;
                if (!email || !email.toLowerCase().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) || !password || password.length < 6) {
                    return new GraphQLError('Invalid email or password');
                }
                const codedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ userName, email, password: codedPassword });
                await newUser.save();
                return { ...newUser._doc };
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
                    console.log(user);
                    return { ...user._doc };
                }
                return new GraphQLError('Incorrect email or password!');
            }
            catch (err) {
                throw new GraphQLError(`Error: ${err}`);
            }
        },
        async editUser(parent, args) {
            try {
                const { id, userName } = args;
                await User.updateOne({ _id: id }, { $set: { userName } });
                return User.findById(id);
            }
            catch (err) {
                throw new GraphQLError(`Error: ${err}`);
            }
        },
        async logout(parent, args, context) {
            console.log(context);
        }
    }
};
