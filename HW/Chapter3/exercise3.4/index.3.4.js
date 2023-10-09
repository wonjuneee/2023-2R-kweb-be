const express = require('express');
const port = 3000;
const app = express();

app.use(express.urlencoded( {extended: true}));
app.set('views', './views');
app.set('view engine', 'pug');


app.get('/', (req, res) =>{
    res.render('idx.pug');
});

app.post('/login', (req, res) =>{
    const obj = req.body;
    res.send(Object.keys(obj).map(k => `${k}: ${obj[k]}`).join('\n'));
});

app.listen(port, () => console.log(`Server listening on port ${port}`));