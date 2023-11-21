// Code 6.8 Session Configuration in Express.js

const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000;

app.use(
    session({ // express-session 내의 메서드드
        secret: '!@#$%^&*()', // secret 값은 매우 길게, 주로 config 파일로 저장하여 import
        resave: false,
        saveUninitialized: true,
    })); // 

// Code 6.9 Create Session(Derived from Code 6.8)
app.get('/set/:id', (req, res) => {
    const { id } = req.params;
    req.session.requester = {
        id: parseInt(id, 10),
        name: `user#${id}`,
        level: Math.floor(Math.random() * 10) + 1,
    };
    return res.send(`Completed /set/${id}`);
});
// Code 6.9 실행 후 Insomnia의 preview에서 Set-Cookie 값 확인 후
// Code 6.10을 통해 설정된 쿠키값을 보내서 그 값에 해당하는 데이터를 반환받을 수 있음


// Code 6.10 Access Session(Derived from Code 6.8)
app.get('/get', (req, res) => {
    const { requester } = req.session;
    if (!requester) return res.sendStatus(401);
    const { id, name, level } = requester;
    return res.send(`id: ${id} / name: ${name} / level: ${level}`);
}); // 세션 ID가 있으면 이에 대한 객체에 접근하여 값을 반환
// Code 6.9에서 얻은 쿠키값을 쿼리로 넘겨주면 그 값에 해당하는 데이터를 반환받을 수 있음
// 이때 query name의 경우 아무렇게나 설정해도 가능함

// Code 6.11 Destroy Session(Derived from Code 6.8)
app.get('/destroy', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.sendStatus(500);
        else return res.send('Destroy Completed');
    });
});
// 크롬 브라우저 작업관리자에서 확인했을 때, 브라우저 내에는 쿠키값이 남아있지만,
// 서버에서는 쿠키값이 지워진 상태이므로 get 요청 시 unauthorized 값이 반환됨.


app.listen(port, () => console.log(`Server listening on port ${port}!`));