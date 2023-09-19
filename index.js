const http = require('http');

const hostname = '127.0.0.1';

const port = 3300; // 포트 넘버

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n'); // 내부 컨텐츠
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});