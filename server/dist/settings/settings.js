"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.schemaSettings = void 0;
const graphql_middleware_1 = require("graphql-middleware");
const schema_1 = require("@graphql-tools/schema");
const index_1 = require("../typeDefs/index");
const index_2 = require("../resolvers/index");
const permissions_1 = __importDefault(require("../utils/permissions"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.schemaSettings = (0, graphql_middleware_1.applyMiddleware)((0, schema_1.makeExecutableSchema)({
    typeDefs: index_1.typeDefs,
    resolvers: index_2.resolvers
}), permissions_1.default);
const connectDB = () => {
    return mongoose_1.default.connect(process.env.DB_URI)
        .then(() => console.log('Connected to the database!'));
};
exports.connectDB = connectDB;
