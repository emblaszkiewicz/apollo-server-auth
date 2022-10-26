const { google, oauth2Client } = require('googleapis');

export const logged = (req, res) => {
    res.send(`Hello ${req.user.displayName}!`);
};
export const permission = async (req, res) => {
    res.send(`Hello ${req.user.displayName}!`);
}

export default { logged, permission };