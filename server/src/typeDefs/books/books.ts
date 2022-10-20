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
type Query {
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