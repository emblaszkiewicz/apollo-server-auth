const { google } = require('googleapis');
import { TAddEvent } from '../../types/types';
import loadClient from '../../settings/client';

export const calendarResolvers = {
    Calendar: {
        organizer: (calendar) => calendar.organizer.email,
        start: (calendar) => calendar.start.dateTime,
        end: (calendar) => calendar.end.dateTime,
    },
    Query: {
        async getCalendarEvents() {
            const client = await loadClient();
            const calendar = google.calendar({version: 'v3', auth: client});
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
        async addCalendarEvent<T>(parent: T, args: TAddEvent) {
            const { summary, organizer, start, end, status, hangoutLink } = args;
            const client = await loadClient();
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
            const calendar = google.calendar({version: 'v3', auth: client});
            calendar.events.insert({
                auth: client,
                calendarId: 'primary',
                resource: event
            });
            return event;
        }
    }
};