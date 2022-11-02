"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const handleLogin = passport_1.default.authenticate('google', { scope: ['email', 'profile', 'https://www.googleapis.com/auth/calendar'], accessType: 'offline', prompt: "consent" });
const handleCallback = passport_1.default.authenticate('google', {
    successRedirect: '/graphql',
    //successRedirect: 'http://localhost:3000/',
    failureRedirect: '/auth/failure',
});
const handleLogout = async (req, res) => {
    req.logout(function (err) {
        if (err) {
            return (err);
        }
        res.redirect('/auth/google');
        //res.redirect('http://localhost:3000/');
    });
};
const handleFailure = async (req, res) => {
    res.send('Login failed!');
};
const handleUser = async (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            user: req.user,
            cookies: req.cookies
        });
    }
};
exports.default = { handleLogin, handleCallback, handleLogout, handleFailure, handleUser };
