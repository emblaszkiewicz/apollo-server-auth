"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeCalendar = void 0;
exports.typeCalendar = `#graphql
    type Calendar {
        summary: String
        organizer: String
        start: String
        end: String
        status: String
        hangoutLink: String
    }
    type Query {
        getCalendarEvents: [Calendar]
    }
    type Mutation {
        addCalendarEvent(summary: String, organizer: String, start: String, end: String, status: String, hangoutLink: String): Calendar
    }
`;
