import Settings from '../../models/Settings';
const { google } = require('googleapis');

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
        async addCalendarEvent(parent, args) {
            // const event = {
            //     'summary': 'This is the summary',
            //     'description': 'This is the description',
            //     'start': {
            //         'dateTime': '2022-10-28T12:00:00-07:00',
            //         'timeZone': 'Asia/Kolkata',
            //     },
            //     'end': {
            //         'dateTime': '2022-10-28T13:00:00-07:00',
            //         'timeZone': 'Asia/Kolkata',
            //     },
            // };
        }
    }
};