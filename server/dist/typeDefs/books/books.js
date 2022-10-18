export const typeBooks = `#graphql
type Book {
    bookAuthor: String
    bookTitle: String
    bookDesc: String
}
type Pagination {
    books: [Book]
    page: Int
    totalPages: Int
}
type Query {
    getAllBooks: [Book]
    pagination(limitPerPage: Int, page: Int): Pagination
}
type Mutation {
    addBook(bookAuthor: String, bookTitle: String, bookDesc: String): Book
}
`;
