export const typeBooks = `#graphql
type Book {
    bookAuthor: String
    bookTitle: String
    bookDesc: String
    genre: String
}
type FilterBooks {
    books: [Book]
    page: Int
    totalPages: Int
}
input BookInput {
    bookAuthor: String
    bookTitle: String
    bookDesc: String
    genre: TGenres
}
type Query {
    findBookByID(_id: ID!): Book
    filterBooks(bookAuthor: String, bookTitle: String, bookDesc: String, genre: TGenres, limitPerPage: Int, page: Int): FilterBooks
}
type Mutation {
    addBook(bookAuthor: String, bookTitle: String, bookDesc: String, genre: TGenres): Book
}
type Subscription {
    bookAdded: Book
    filterBookAdded(genre: TGenres): Book
}
enum TGenres {
    Fiction
    Thriller
    Drama
}
`;
