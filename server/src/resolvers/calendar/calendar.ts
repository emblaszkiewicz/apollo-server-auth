import Settings from '../../models/Settings';
const { google } = require('googleapis');
import { TAddEvent } from '../../types/types';

export const calendarResolvers = {
    Calendar: {
        organizer: (calendar) => calendar.organizer.email,
        start: (calendar) => calendar.start.dateTime,
        end: (calendar) => calendar.end.dateTime,
    },
    Query: {
        async getCalendarEvents() {
            const token = await Settings.find();
            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                process.env.GOOGLE_REDIRECT_URL
            );
            oauth2Client.credentials = {
                refresh_token: token[0].refreshToken
            };
            const calendar = google.calendar({version: 'v3', auth: oauth2Client});
            const response = await calendar.events.list({
                calendarId: 'primary',
                timeMin: new Date().toISOString(),
                maxResults: 10,
                singleEvents: true,
                orderBy: 'startTime',
            });
            const events = response.data.items;
            console.log(events);
            return events;
        }
    },
    Mutation: {
        async addCalendarEvent<T>(parent: T, args: TAddEvent) {
            console.log(args);
            const { summary, organizer, start, end, status, hangoutLink } = args;
            const token = await Settings.find();
            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                process.env.GOOGLE_REDIRECT_URL
            );
            oauth2Client.credentials = {
                refresh_token: token[0].refreshToken
            };
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
            const calendar = google.calendar({version: 'v3', auth: oauth2Client});
            calendar.events.insert({
                auth: oauth2Client,
                calendarId: 'primary',
                resource: event
            });
            return event;
        }
    }
};