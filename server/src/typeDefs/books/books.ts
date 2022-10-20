export const typeBooks = `#graphql
type Book {
    bookAuthor: String
    bookTitle: String
    bookDesc: String
    genre: String
}
type Pagination {
    books: [Book]
    page: Int
    totalPages: Int
}
type Query {
    getAllBooks: [Book]
    pagination(limitPerPage: Int, page: Int): Pagination
    filterBooks(bookAuthor: String, bookTitle: String, bookDesc: String, genre: String): [Book]
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