export const typeDefs = `#graphql
type Book {
  bookAuthor: String
  bookTitle: String
  bookDesc: String
}
type User {
  userName: String
  email: String
  password: String
  role: String
  token: String
}
type Query {
  getAllBooks: [Book]
  getUser(id: ID!): User
}
type Mutation {
  addBook(bookAuthor: String, bookTitle: String, bookDesc: String): Book
  registerUser(userName: String, email: String, password: String): User
  loginUser(email: String, password: String): User
  editUser(id: ID, userName: String): User
}
`;