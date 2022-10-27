import passport from 'passport';
import { Request, Response } from "express";

const handleLogin = passport.authenticate('google', { scope: ['email', 'profile', 'https://www.googleapis.com/auth/calendar'], accessType: 'offline', prompt: "consent"});
const handleCallback = passport.authenticate('google', {
    successRedirect: '/graphql',
    failureRedirect: '/auth/failure',
});
const handleLogout = async (req: Request, res: Response) => {
    req.logout(function (err) {
        if(err) { return (err); }
        res.redirect('/auth/google');
    });
};

const handleFailure = async (req: Request, res: Response) => {
    res.send('Login failed!');
};

export default { handleLogin, handleCallback, handleLogout, handleFailure };