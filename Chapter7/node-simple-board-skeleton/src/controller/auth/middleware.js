// Code 7.10 Auth Middleware

const authRequired = async (req, res, next) => {
    try {
        if (req.session.user) return next(); // session 내에 user가 있다면 next
        else return res.redirect('/auth/sign_in'); // 없다면 로그인 페이지로 리다이렉트
    } catch (err) {
        return next(err);
    }
};

module.exports = { authRequired };