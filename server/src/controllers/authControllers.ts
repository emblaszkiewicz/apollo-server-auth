import passport from 'passport';
import {Request, Response} from "express";

const handleLogin = passport.authenticate('google', {
    scope: ['email', 'profile', 'https://www.googleapis.com/auth/calendar'],
    accessType: 'offline',
    prompt: "consent"
});
const handleCallback = passport.authenticate('google', {
    //successRedirect: '/graphql',
    //successRedirect: 'http://localhost:3000/',
    successRedirect: 'http://localhost:5173/',
    failureRedirect: '/auth/failure',
});
const handleLogout = async (req: Request, res: Response) => {
    req.logout(function (err) {
        if (err) {
            return (err);
        }
        //res.redirect('/auth/google');
        // res.redirect('http://localhost:3000/');
        res.redirect('http://localhost:5173/');
    });
};

const handleFailure = async (req: Request, res: Response) => {
    res.send('Login failed!');
};

const handleUser = async (req: Request, res: Response) => {
    // if (req.user) {
    //     res.status(200).json({
    //         success: true,
    //         user: req.user,
    //         cookies: req.cookies
    //     });
    // }
    res.send({user: req.user});
};

export default {handleLogin, handleCallback, handleLogout, handleFailure, handleUser};