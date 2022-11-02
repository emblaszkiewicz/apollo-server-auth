const { google } = require('googleapis');
import Settings from '../models/Settings';

const loadClient = async () => {
    const token = await Settings.find();
    const client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URL,
    );
    client.credentials = {
        refresh_token: token[0].refreshToken
    };
    return client;
};

export default loadClient;