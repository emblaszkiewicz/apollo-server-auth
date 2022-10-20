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
    genre: String
}
input PaginationInput {
    limitPerPage: Int
    page: Int
}
type Query {
    filterBooks(filterInput: BookInput, pagination: PaginationInput): FilterBooks
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
