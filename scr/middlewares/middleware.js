const auth = (req, res, next) => {
    const { password } = req.query;
    if (password !== 'rheynogtg') {
        return res.send('Anda salah memasukan password'); 
    }
    next();
};

module.exports = auth;