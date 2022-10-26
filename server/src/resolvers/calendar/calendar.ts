import Settings from '../../models/Settings';
const { google } = require('googleapis');

export const calendarResolvers = {
    Query: {
        async getCalendar() {
            const token = await Settings.find();
            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
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
            console.log(response.data.items);
        }
    }
};