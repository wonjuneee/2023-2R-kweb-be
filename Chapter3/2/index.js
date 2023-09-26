// Code 3.6 pug Example Application - index.js

const express = require('express');

const port = 3000;
const app = express();

app.set('views', `${__dirname}/views`); // 같은 디렉토리의 views 폴더에 pug 파일이 있음.
app.set('view engine', 'pug');

app.get('/', (req, res) => res.render('index.pug')); // 컨트롤러 함수에 index.pug 파일 render를 응답시킬 수 있음
app.get('/page', (req, res) => {
    const {page, author} = req.query;
    res.render("board.pug", {page, author})
});
app.get('/posts', (req, res) => {
    const {until} = req.query;
    const untilParsed = parseInt(until, 10);
    
    const posts = [];
    if (!isNaN(untilParsed)){
        for(let i = 0; i < untilParsed; i++){
            posts.push(`Post ${i + 1}`);
        }
    }
    res.render("posts.pug", {posts});
});

app.listen(port, () => console.log(`Server listening on port ${port}!`));
