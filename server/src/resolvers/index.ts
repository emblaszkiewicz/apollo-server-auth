import { booksResolvers } from './books/books';
import { usersResolvers } from './users/users';
import { calendarResolvers } from './calendar/calendar';

export const resolvers = [booksResolvers, usersResolvers, calendarResolvers];