// Code 7.11 Article Routing
const { Router } = require('express');

const ctrl = require('./ctrl');
const { authRequired } = require('../auth/middleware');

const router = Router();
router.get('/:articleId(\\d+)', ctrl.readArticle);

router.get('/compose', authRequired, ctrl.writeArticleForm);
router.post('/compose', authRequired, ctrl.writeArticle);

router.get('/edit/:articleId(\\d+)', authRequired, ctrl.editArticleForm);
router.post('/edit/:articleId(\\d+)', authRequired, ctrl.editArticle);

router.get('/delete/:articleId(\\d+)', authRequired, ctrl.deleteArticle);

// authRequired 미들웨어를 거쳐서 다음 작업을 수행하도록 하는 인자 구성


module.exports = router;