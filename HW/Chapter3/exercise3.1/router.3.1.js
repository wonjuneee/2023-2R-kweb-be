const { Router } = require('express');
const router = Router();

router.get('/', (req, res) =>{
    const obj = req.query;
    res.send(Object.keys(obj).map(k => `${k}: ${obj[k]}`).join('\n'));
});

router.post('/', (req, res) =>{
    const obj = req.body;
    res.send(Object.keys(obj).map(k => `${k}: ${obj[k]}`).join('\n'))
});

router.put('/', (req, res) =>{
    const obj = req.body;
    res.send(Object.keys(obj).map(k => `${k}: ${obj[k]}`).join('\n'));
});

router.delete('/', (req, res) =>{
    const obj = req.body;
    res.send(Object.keys(obj).map(k => `${k}: ${obj[k]}`).join('\n'));
});

module.exports = router;