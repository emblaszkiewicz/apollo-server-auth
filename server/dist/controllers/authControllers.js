"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const login = passport_1.default.authenticate('google', { scope: ['email', 'profile', 'https://www.googleapis.com/auth/calendar'], accessType: 'offline' });
const callback = passport_1.default.authenticate('google', {
    successRedirect: '/user/logged',
    failureRedirect: '/user/no-permission',
});
const logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return (err);
        }
        res.redirect('/auth/google');
    });
};
exports.default = { login, callback, logout };
