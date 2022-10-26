import passport from 'passport';

const login = passport.authenticate('google', { scope: ['email', 'profile'] });
const callback = passport.authenticate('google', {
    successRedirect: '/user/logged',
    failureRedirect: '/user/no-permission',
});
const logout = (req, res) => {
    req.logout(function (err) {
        if(err) { return (err); }
        res.redirect('/auth/google');
    });
};

export default { login, callback, logout };