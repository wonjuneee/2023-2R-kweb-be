// Code 7.8 Index Routing
// Code 7.12 Index Routing (Added)

const { Router } = require('express');

const ctrl = require('./ctrl');
//
const article = require('./article');
//
const auth = require('./auth');

const router = Router();

router.get('/', ctrl.indexPage);
//
router.get('/articles/page/:page(\\d+)', ctrl.listArticles);
router.get('/articles', ctrl.latestArticles);

router.use('/article', article);
//
router.use('/auth', auth);
// auth에 대한 경로가 온다면 일단 auth 미들웨어로 이동시킴. -> 구조화

module.exports = router;
