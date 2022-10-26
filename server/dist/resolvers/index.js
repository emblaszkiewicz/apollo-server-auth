"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const books_1 = require("./books/books");
const users_1 = require("./users/users");
const calendar_1 = require("./calendar/calendar");
exports.resolvers = [books_1.booksResolvers, users_1.usersResolvers, calendar_1.calendarResolvers];
