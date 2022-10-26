"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeUsers = void 0;
exports.typeUsers = `#graphql
type User {
    userName: String
    email: String
    password: String
    role: String
}
type Query {
    getUser(id: ID!): User
}
type Mutation {
    registerUser(userName: String, email: String, password: String): User!
    loginUser(email: String, password: String): User!
    editUser(id: ID, userName: String): User
    logout: Boolean
}
`;
