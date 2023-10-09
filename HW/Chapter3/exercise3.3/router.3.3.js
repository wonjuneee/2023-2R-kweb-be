const { Router } = require('express');
const router = Router();

router.get('/', (req, res) =>{
    const { number } = req.query;
    res.redirect(`./factorial/${number}`);
});

router.get('/:number', (req, res) =>{
    const { number } = req.params;
    let result = 1;
    for(let i = 1; i <= number; i++){
        result *= i;
    }
    res.send(`${result}`);
})

module.exports = router;