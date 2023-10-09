const express = require('express');
const router = require('./router.3.2');
const port = 3000;

const app = express();

app.use('/board', router); // Path 파트

app.listen(port, () => console.log(`Server listening on port ${port}`));