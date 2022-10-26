"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeCalendar = void 0;
exports.typeCalendar = `#graphql
    type Calendar {
        refreshToken: String
    }
    type Query {
        getCalendar: Calendar
    }
`;
