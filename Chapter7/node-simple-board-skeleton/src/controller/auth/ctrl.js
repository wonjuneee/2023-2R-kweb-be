const { getByUsername } = require("../../DAO/user");
const { UserDAO, ArticleDAO } = require("../../DAO");
const { generatePassword, verifyPassword } = require("../../lib/authentication");

// GET /auth/sign_in
const signInForm = async (req, res, next) => {
    try {
        // Controller function
        const { user } = req.session;
        if (user == undefined) {
            return res.render("auth/sign-in.pug", { user });
        }
        else {
            return res.redirect("/"); // 기본 주소(root 주소)
        }
    } catch (err) {
        return next(err); // 다음 미들웨어에 err를 넘겨준다.
    }
};

const signIn = async (req, res, next) => {
    try {
        // Controller function
        const { username, password } = req.body;
        if (!username || !password) throw new Error("BAD_REQUEST");

        const user = await UserDAO.getByUsername(username);
        if (!user) throw new Error("UNAUTHORIZED");

        // if(user.password == password) user의 pw는 암호화 / 입력받은 pw는 비암호화
        const isTrue = await verifyPassword(password, user.password); //(pw, hashedpw)
        if (!isTrue) throw new Error("UNAUTHORIZED");

        req.session.user = {
            id: user.id,
            username: username,
            displayName: user.displayName,
            isActive: user.isActive,
            isStaff: user.isStaff,
        };

        return res.redirect("/");
    } catch (err) {
        return next(err);
    }
};

const signUpForm = async (req, res, next) => {
    try {
        // Controller function
        const { user } = req.session;
        return res.render("auth/sign-up.pug", { user });
    } catch (err) {
        return next(err);
    }
};

const signUp = async (req, res, next) => {
    try {
        // Controller function
        const { username, password, displayName } = req.body;
        if (!username || !password || !displayName) throw new Error("BAD_REQUEST");
        if (username.length > 16 || displayName.length > 32) throw new Error("BAD_REQUEST");
        /* 일반적으로 password는 길이를 자동으로 조절해주는 알고리즘이 적용되므로 (hashing)
        이 경우에는 따로 제한할 필요가 없다. */

        const hasedPW = await generatePassword(password);
        await UserDAO.create(username, hasedPW , displayName);
        
        return res.redirect("/auth/sign_in");
    } catch (err) {
        return next(err);
    }
};

const signOut = async (req, res, next) => {
    try {
        // Controller function
        req.session.destroy((err) =>{
            if (err) throw err;
            else return res.redirect("/");
        })

    } catch (err) {
        return next(err);
    }
};


module.exports = { signInForm, signIn, signUpForm, signUp, signOut };