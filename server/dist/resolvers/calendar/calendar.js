"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarResolvers = void 0;
const { google } = require('googleapis');
const client_1 = __importDefault(require("../../settings/client"));
exports.calendarResolvers = {
    Calendar: {
        organizer: (calendar) => calendar.organizer.email,
        start: (calendar) => calendar.start.dateTime,
        end: (calendar) => calendar.end.dateTime,
    },
    Query: {
        async getCalendarEvents() {
            const client = await (0, client_1.default)();
            const calendar = google.calendar({ version: 'v3', auth: client });
            const response = await calendar.events.list({
                calendarId: 'primary',
                timeMin: new Date().toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: 'startTime',
            });
            return response.data.items;
        }
    },
    Mutation: {
        async addCalendarEvent(parent, args) {
            const { summary, organizer, start, end, status, hangoutLink } = args;
            const client = await (0, client_1.default)();
            const event = {
                'summary': summary,
                'organizer': {
                    'email': organizer
                },
                'start': {
                    'dateTime': start,
                    'timeZone': 'Europe/Warsaw',
                },
                'end': {
                    'dateTime': end,
                    'timeZone': 'Europe/Warsaw',
                },
                'status': status,
                'hangoutLink': hangoutLink
            };
            const calendar = google.calendar({ version: 'v3', auth: client });
            calendar.events.insert({
                auth: client,
                calendarId: 'primary',
                resource: event
            });
            return event;
        }
    }
};
