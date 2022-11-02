"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { google } = require('googleapis');
const Settings_1 = __importDefault(require("../models/Settings"));
const loadClient = async () => {
    const token = await Settings_1.default.find();
    const client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URL);
    client.credentials = {
        refresh_token: token[0].refreshToken
    };
    return client;
};
exports.default = loadClient;
