"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permission = exports.logged = void 0;
const { google, oauth2Client } = require('googleapis');
const logged = (req, res) => {
    res.send(`Hello ${req.user.displayName}!`);
};
exports.logged = logged;
const permission = async (req, res) => {
    res.send(`Hello ${req.user.displayName}!`);
};
exports.permission = permission;
exports.default = { logged: exports.logged, permission: exports.permission };
