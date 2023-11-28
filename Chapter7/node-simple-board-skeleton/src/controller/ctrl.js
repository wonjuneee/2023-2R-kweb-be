const { ArticleDAO } = require("../DAO");

const indexPage = async (req, res, next) => {
    try {
        // Controller function
        const { user } = req.session;
        return res.render("index.pug", { user });
    } catch (err) {
        return next(err); // 다음 미들웨어에 err를 넘겨준다.
    }
};

const listArticles = async (req, res, next) => {
    try {
        const { page } = req.params;
        if (page <= 0) throw new Error("BAD_REQEUST");
        const articles = await ArticleDAO.getList((page - 1) * 10, 10);
        const { user } = req.session;
        const hasPrev = (page > 1) ? true : false;
        const hasNext = (page * 10 < await ArticleDAO.getTotalCount) ? true : false

        return res.render("articles/index.pug", { user, articles, page, hasPrev, hasNext });

    } catch (err) {
        return next(err);
    }
};

const latestArticles = async (req, res, next) => {
    try {
        return res.redirect("/articles/page/1");

    } catch (err) {
        return next(err);
    }
};

module.exports = { indexPage, listArticles, latestArticles };