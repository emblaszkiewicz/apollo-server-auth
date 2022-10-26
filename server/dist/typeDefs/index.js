"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const books_1 = require("./books/books");
const users_1 = require("./users/users");
const calendar_1 = require("./calendar/calendar");
exports.typeDefs = [books_1.typeBooks, users_1.typeUsers, calendar_1.typeCalendar];
