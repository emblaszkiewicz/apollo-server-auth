const home = async (req, res) => {
    res.send('<a href="/auth/google">Login with Google!</a>');
};

export default { home };