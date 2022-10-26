export const logged = (req, res) => {
    res.send(`Hello ${req.user.displayName}!`);
};
export const permission = (req, res) => {
    res.send(`Hello ${req.user.displayName}!`);
}

export default { logged, permission };