"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarResolvers = void 0;
const Settings_1 = __importDefault(require("../../models/Settings"));
const { google } = require('googleapis');
exports.calendarResolvers = {
    Query: {
        async getCalendar() {
            const token = await Settings_1.default.find();
            const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
            oauth2Client.credentials = {
                refresh_token: token[0].refreshToken
            };
            const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
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
