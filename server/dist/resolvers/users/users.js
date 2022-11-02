"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersResolvers = void 0;
const User_1 = __importDefault(require("../../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const graphql_1 = require("graphql");
exports.usersResolvers = {
    Query: {
        async getUser(parent, args) {
            return User_1.default.findById(args.id);
        }
    },
    Mutation: {
        async registerUser(parent, args) {
            try {
                const { userName, email, password } = args;
                if (!email || !email.toLowerCase().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i) || !password || password.length < 6) {
                    return new graphql_1.GraphQLError('Invalid email or password');
                }
                const codedPassword = await bcryptjs_1.default.hash(password, 10);
                const newUser = new User_1.default({ userName, email, password: codedPassword });
                await newUser.save();
                return newUser;
            }
            catch (err) {
                throw new graphql_1.GraphQLError(`Error: ${err}`);
            }
        },
        async loginUser(parent, args, context) {
            try {
                const { email, password } = args;
                const user = await User_1.default.findOne({ email });
                if (user && await bcryptjs_1.default.compare(password, user.password)) {
                    context.session.userName = user.userName;
                    context.session.isLogin = true;
                    return user;
                }
                return new graphql_1.GraphQLError('Incorrect email or password!');
            }
            catch (err) {
                throw new graphql_1.GraphQLError(`Error: ${err}`);
            }
        },
        async editUser(parent, args) {
            try {
                const { id, userName } = args;
                await User_1.default.updateOne({ _id: id }, { $set: { userName } });
                return User_1.default.findById(id);
            }
            catch (err) {
                throw new graphql_1.GraphQLError(`Error: ${err}`);
            }
        },
        async logout(parent, args, context) {
            context.session.destroy();
            return true;
        }
    },
};
