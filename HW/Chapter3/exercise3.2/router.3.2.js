const { Router } = require('express');
const router = Router();

router.get('/page/:page', (req, res) =>{
    const page = req.params.page;
    res.send(`This is page #${page}`);
}); // Query 파트

module.exports = router;